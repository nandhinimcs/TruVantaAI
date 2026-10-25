import logging
from typing import Dict, Any, List
from google import genai
from google.genai import types
from google.genai.errors import APIError
from app.core.config import settings
from app.services.brand_service import get_demo_brand_data, get_product_details

logger = logging.getLogger(__name__)

# Ordered list of supported Gemini models available to the current API key
CANDIDATE_MODELS = [
    "gemini-2.5-flash-lite",
    "gemini-3.8-flash",
    "gemini-flash-latest",
    settings.GEMINI_MODEL,
]

# Deduplicate preserving order
SUPPORTED_MODELS = []
for m in CANDIDATE_MODELS:
    if m and m not in SUPPORTED_MODELS:
        SUPPORTED_MODELS.append(m)

def generate_brand_content(
    product_name: str,
    content_type: str,
    audience: str,
    tone: str,
    brand_name: str = "Lumina Skincare",
) -> Dict[str, Any]:
    """
    Generate brand-governed marketing content using the official Google Gen AI SDK.
    Strictly grounds the generation on approved brand facts and restricted claims.
    """
    api_key = settings.GEMINI_API_KEY
    if not api_key:
        raise ValueError(
            "GEMINI_API_KEY is not configured in backend/.env. "
            "Please configure your Google Gemini API key in backend/.env to generate live content."
        )

    # Retrieve approved brand and product data
    brand_data = get_demo_brand_data()
    product_data = get_product_details(product_name)
    if not product_data:
        raise ValueError(f"Product '{product_name}' not found in approved brand database.")

    product_title = product_data.get("name", product_name)
    approved_facts = product_data.get("approved_facts", [])
    approved_benefits = product_data.get("approved_benefits", [])
    restricted_claims = product_data.get("restricted_claims", [])
    key_ingredients = product_data.get("approved_key_ingredients", [])

    system_instruction = f"""You are the official Brand AI Content Strategist for {brand_name}.
You produce marketing copy that is compelling, engaging, and compliant with enterprise brand governance guidelines.

CRITICAL GOVERNANCE RULES:
1. ONLY utilize the APPROVED FACTS and APPROVED BENEFITS listed below.
2. DO NOT invent unapproved medical claims, warranties, or clinical assertions.
3. STRICTLY AVOID the following RESTRICTED CLAIMS (or any variations of them):
{chr(10).join(f'   - {claim}' for claim in restricted_claims)}
4. Highlight approved benefits:
{chr(10).join(f'   - {b}' for b in approved_benefits)}
5. Tone must be: {tone}.
6. Audience focus: {audience}.
7. Content format required: {content_type}.
"""

    prompt = f"""Generate a high-converting, compliant {content_type} for '{product_title}'.

Target Audience: {audience}
Requested Tone: {tone}

Approved Product Facts:
{chr(10).join(f'- {f}' for f in approved_facts)}

Approved Product Benefits:
{chr(10).join(f'- {b}' for b in approved_benefits)}

Key Approved Ingredients:
{chr(10).join(f'- {i}' for i in key_ingredients)}

Produce only the final marketing copy tailored for {content_type}. Ensure all claims strictly match approved benefits and omit any medical promises or restricted phrases."""

    client = genai.Client(api_key=api_key)

    last_exception = None
    for model_name in SUPPORTED_MODELS:
        try:
            logger.info("Attempting generation with model %s", model_name)
            gen_config = types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.7,
                thinking_config=types.ThinkingConfig(thinking_budget=0),
            )
            response = client.models.generate_content(
                model=model_name,
                contents=prompt,
                config=gen_config,
            )
            
            if response and response.text:
                return {
                    "generated_content": response.text.strip(),
                    "model_used": model_name,
                    "brand": brand_name,
                    "product": product_title,
                    "content_type": content_type,
                    "audience": audience,
                    "tone": tone,
                    "approved_facts_referenced": approved_facts,
                    "approved_benefits_referenced": approved_benefits,
                    "restricted_claims_guarded": restricted_claims,
                }
        except APIError as e:
            logger.warning("Gemini APIError on model %s: %s", model_name, str(e))
            last_exception = e
            # Try next model if it's a model not found / unsupported error
            if "NOT_FOUND" in str(e) or "404" in str(e):
                continue
            raise e
        except Exception as e:
            logger.warning("Generation error on model %s: %s", model_name, str(e))
            last_exception = e
            continue

    if last_exception:
        raise last_exception

    raise RuntimeError("Failed to generate content: empty response from Gemini API.")
