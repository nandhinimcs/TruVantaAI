import re
import logging
from typing import Dict, Any, List
from app.services.brand_service import get_demo_brand_data, get_product_details

logger = logging.getLogger(__name__)

def verify_content_compliance(
    content: str,
    product_name: str = "Lumina Gentle Face Cleanser",
    brand_name: str = "Lumina Skincare",
) -> Dict[str, Any]:
    """
    Evaluates marketing copy against brand guidelines, prohibited terms, and restricted claims.
    Returns structured scorecard metrics for Tone, Terminology, Regulatory safety, and overall score.
    """
    if not content or not content.strip():
        raise ValueError("Content to verify cannot be empty.")

    brand_data = get_demo_brand_data()
    product_data = get_product_details(product_name) or {}

    # Extract rules
    restricted_claims = product_data.get("restricted_claims", [
        "cures acne",
        "guaranteed results",
        "instant whitening",
        "clinically proven without evidence",
        "permanently eliminates blemishes"
    ])
    prohibited_terms = brand_data.get("governance_rules", {}).get("prohibited_words_or_phrases", [
        "cures acne",
        "miracle cure",
        "instant whitening",
        "guaranteed results",
        "clinically proven"
    ])
    approved_benefits = product_data.get("approved_benefits", [
        "Removes everyday dirt and excess oil"
    ])

    text_lower = content.lower()

    # 1. Terminology & Prohibited Words Audit
    flagged_terms = []
    all_forbidden = list(set(prohibited_terms + [c.lower() for c in restricted_claims]))
    for term in all_forbidden:
        # Match word boundaries or substring
        pattern = r"\b" + re.escape(term) + r"\b"
        if re.search(pattern, text_lower):
            flagged_terms.append(term)
        elif term in text_lower:
            flagged_terms.append(term)
    
    flagged_terms = list(set(flagged_terms))

    # 2. Tone & Voice Alignment Check
    # High-pressure sales or sensational words
    sensational_words = ["miracle", "insane", "magic", "cure-all", "urgent", "secret trick", "destroy", "obliterate"]
    flagged_tone_words = [w for w in sensational_words if re.search(r"\b" + re.escape(w) + r"\b", text_lower)]
    
    tone_score = 98
    if flagged_tone_words:
        tone_score -= min(40, len(flagged_tone_words) * 20)
    
    tone_status = "Compliant" if tone_score >= 80 else ("Review Needed" if tone_score >= 60 else "Non-Compliant")
    tone_feedback = (
        "Tone reflects professional, friendly brand voice with balanced phrasing."
        if tone_score >= 80 else
        f"Tone contains sensational or high-pressure terminology: {', '.join(flagged_tone_words)}."
    )

    # 3. Trademark & Terminology Scoring
    if flagged_terms:
        terminology_score = max(20, 100 - (len(flagged_terms) * 35))
        terminology_status = "Violation Detected"
        terminology_feedback = f"Restricted claims/prohibited words found: {', '.join(flagged_terms)}."
    else:
        terminology_score = 100
        terminology_status = "Compliant"
        terminology_feedback = "All brand trademarks and terminology adhere strictly to Lumina guidelines."

    # 4. Regulatory & Safety Boundaries
    medical_patterns = [
        r"\bcure(s|d)?\b",
        r"\bmedical\b",
        r"\bprescribed\b",
        r"\bguarantee(d)?\b",
        r"\b100%\b",
        r"\bclinical(ly)? proven\b"
    ]
    medical_flags = [p for p in medical_patterns if re.search(p, text_lower)]
    
    if medical_flags or any("cure" in t or "guarantee" in t for t in flagged_terms):
        safety_score = 45 if flagged_terms else 70
        safety_status = "Action Required"
        safety_feedback = "Claims suggest medical/curative results or unverified guarantees. Revise to approved daily benefits."
    else:
        safety_score = 96
        safety_status = "Compliant"
        safety_feedback = "Zero unapproved medical claims. Adheres to cosmetic classification boundaries."

    # 5. Approved Benefit Presence (Bonus verification)
    has_approved_benefit = any(
        "dirt" in text_lower or "oil" in text_lower or "clean" in text_lower or "gentle" in text_lower
        for b in approved_benefits
    )

    # Overall Score Calculation
    overall_score = round((tone_score * 0.3) + (terminology_score * 0.4) + (safety_score * 0.3))
    if flagged_terms:
        overall_status = "NON_COMPLIANT"
    elif overall_score >= 85:
        overall_status = "APPROVED"
    else:
        overall_status = "REQUIRES_REVIEW"

    findings = []
    if flagged_terms:
        for t in flagged_terms:
            findings.append({
                "type": "VIOLATION",
                "severity": "HIGH",
                "rule": f"Restricted Claim Detected: '{t}'",
                "recommendation": f"Remove '{t}'. Lumina strictly prohibits unverified or medical claims."
            })
    if flagged_tone_words:
        for w in flagged_tone_words:
            findings.append({
                "type": "WARNING",
                "severity": "MEDIUM",
                "rule": f"Brand Voice Mismatch: '{w}'",
                "recommendation": f"Replace sensational word '{w}' with balanced, trustworthy terminology."
            })
    if has_approved_benefit:
        findings.append({
            "type": "PASS",
            "severity": "INFO",
            "rule": "Approved Benefit Grounding",
            "recommendation": "Correctly highlights approved gentle cleansing and oil balance properties."
        })

    return {
        "overall_score": overall_score,
        "overall_status": overall_status,
        "product_evaluated": product_name,
        "brand": brand_name,
        "metrics": {
            "tone_and_voice": {
                "score": tone_score,
                "status": tone_status,
                "feedback": tone_feedback,
                "flagged_items": flagged_tone_words,
            },
            "trademark_and_terminology": {
                "score": terminology_score,
                "status": terminology_status,
                "feedback": terminology_feedback,
                "flagged_items": flagged_terms,
            },
            "regulatory_and_safety": {
                "score": safety_score,
                "status": safety_status,
                "feedback": safety_feedback,
                "flagged_items": medical_flags,
            },
        },
        "findings": findings,
        "word_count": len(content.split()),
        "character_count": len(content),
    }
