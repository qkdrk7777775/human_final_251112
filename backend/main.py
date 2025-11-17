import sys, uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.config import config, cors_config
from routes import auth, community, user, test

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    **config["CORS"]
)

app.include_router(auth, prefix="")
app.include_router(community, prefix="/posts")
app.include_router(user, prefix="")
app.include_router(test, prefix="")

if __name__ == "__main__":
    print("파이썬으로 직접 실행")
    try:
        uvicorn.run(
            "main:app", 
            host="0.0.0.0", port=config["BACKEND_PORT"], reload=True)
    except Exception as e:
        sys.exit(1)
