import json
from pathlib import Path
from typing import Dict, Any, Optional

DATA_FILE = Path(__file__).resolve().parent.parent.parent / "data" / "demo_brand.json"

def get_demo_brand_data() -> Dict[str, Any]:
    """Load and parse the demo brand configuration."""
    if not DATA_FILE.exists():
        raise FileNotFoundError(f"Brand data file not found at {DATA_FILE}")
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def get_product_details(product_query: str) -> Optional[Dict[str, Any]]:
    """Retrieve product details matching a name or ID, defaulting to the first product."""
    data = get_demo_brand_data()
    products = data.get("products", [])
    if not products:
        return None
    
    # Try exact or partial match
    norm_query = product_query.strip().lower()
    for p in products:
        if norm_query in p.get("name", "").lower() or norm_query == p.get("id", "").lower():
            return p
            
    # Default to first product if query is generic
    return products[0]
