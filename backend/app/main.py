from datetime import datetime, timezone
from typing import Optional
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from app.core.config import settings
from app.services.brand_service import get_demo_brand_data, get_product_details
from app.services.gemini_service import generate_brand_content
from app.services.verification_service import verify_content_compliance

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Autonomous Brand Governance & Compliance Platform - Team WINFUTURE_27",
    version=settings.VERSION,
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_origin_regex=r"https://.*\.vercel\.app|http://localhost:\d+|http://127\.0\.0\.1:\d+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    brand: Optional[str] = Field(default="Lumina Skincare", description="Brand name")
    product: str = Field(..., description="Product name or identifier")
    content_type: str = Field(..., description="Format e.g. Instagram Ad, Social Media Caption, Product Description, Promotional Email")
    audience: str = Field(..., description="Target audience description")
    tone: str = Field(..., description="Selected brand tone")

class GenerateResponse(BaseModel):
    generated_content: str
    model_used: str
    brand: str
    product: str
    content_type: str
    audience: str
    tone: str
    approved_facts_referenced: list[str]
    approved_benefits_referenced: list[str]
    restricted_claims_guarded: list[str]

@app.get("/", tags=["Root"])
def read_root():
    """Root endpoint providing service metadata."""
    return {
        "project": settings.PROJECT_NAME,
        "team": settings.TEAM_NAME,
        "version": settings.VERSION,
        "status": "online",
        "docs_url": "/docs",
    }

@app.get("/health", tags=["Health"])
def health_check():
    """Health check endpoint used by frontend and monitoring services."""
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "team": settings.TEAM_NAME,
        "version": settings.VERSION,
        "gemini_configured": bool(settings.GEMINI_API_KEY),
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }

@app.get("/brand", tags=["Brand Data"])
def get_brand_info():
    """Retrieve current approved demo brand information and guidelines."""
    try:
        return get_demo_brand_data()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to load brand data: {str(e)}",
        )

@app.post("/generate", response_model=GenerateResponse, tags=["AI Content Studio"])
def generate_content(request: GenerateRequest):
    """
    Generate brand-compliant marketing copy using Gemini API.
    Enforces strict grounding on approved brand facts and restricted claims.
    """
    # Validate required fields
    if not request.product.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Product selection is required.")
    if not request.content_type.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Content type selection is required.")
    if not request.audience.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Target audience description cannot be empty.")
    if not request.tone.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Tone selection cannot be empty.")

    try:
        result = generate_brand_content(
            product_name=request.product,
            content_type=request.content_type,
            audience=request.audience,
            tone=request.tone,
            brand_name=request.brand or "Lumina Skincare",
        )
        return result
    except ValueError as ve:
        # Configuration issues like missing GEMINI_API_KEY or missing product
        error_msg = str(ve)
        status_code = status.HTTP_503_SERVICE_UNAVAILABLE if "GEMINI_API_KEY" in error_msg else status.HTTP_400_BAD_REQUEST
        raise HTTPException(status_code=status_code, detail=error_msg)
    except Exception as e:
        error_msg = str(e)
        if "API_KEY_INVALID" in error_msg or "400" in error_msg and "key" in error_msg.lower():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Google Gemini API Key is invalid or expired: {error_msg}",
            )
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Gemini generation error: {error_msg}",
        )

class VerifyRequest(BaseModel):
    content: str = Field(..., description="Content payload to verify")
    product: Optional[str] = Field(default="Lumina Gentle Face Cleanser", description="Product evaluated")
    brand: Optional[str] = Field(default="Lumina Skincare", description="Brand name")

@app.post("/verify", tags=["Content Verification"])
def verify_content(request: VerifyRequest):
    """
    Verify draft content against brand guidelines, prohibited terms, and restricted claims.
    Returns real compliance scorecards and actionable findings.
    """
    if not request.content or not request.content.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Content payload cannot be empty."
        )

    try:
        results = verify_content_compliance(
            content=request.content.strip(),
            product_name=request.product or "Lumina Gentle Face Cleanser",
            brand_name=request.brand or "Lumina Skincare",
        )
        return results
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Verification failed: {str(e)}"
        )
