import os
from pathlib import Path
from typing import List
from dotenv import load_dotenv

# Explicitly load backend/.env as required
BACKEND_DIR = Path(__file__).resolve().parent.parent.parent
BACKEND_ENV = BACKEND_DIR / ".env"
ROOT_ENV = BACKEND_DIR.parent / ".env"

if BACKEND_ENV.exists():
    load_dotenv(dotenv_path=BACKEND_ENV, override=True)
elif ROOT_ENV.exists():
    load_dotenv(dotenv_path=ROOT_ENV, override=True)
else:
    load_dotenv(override=True)

class Settings:
    PROJECT_NAME: str = "TruVanta AI"
    TEAM_NAME: str = "WINFUTURE_27"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    PORT: int = int(os.getenv("PORT", "8000"))
    
    # CORS Origins
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    @property
    def GEMINI_API_KEY(self) -> str:
        # Re-check backend/.env in case it was edited dynamically
        if BACKEND_ENV.exists():
            load_dotenv(dotenv_path=BACKEND_ENV, override=True)
        return os.getenv("GEMINI_API_KEY", "").strip()

    @property
    def GEMINI_MODEL(self) -> str:
        return os.getenv("GEMINI_MODEL", "gemini-3.8-flash").strip()

settings = Settings()
