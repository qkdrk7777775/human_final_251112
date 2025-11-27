import shutil
from fastapi import status, File, UploadFile
from fastapi.responses import JSONResponse
from pathlib import Path

UPLOAD_DIR = Path("./uploaded_data")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# 파일 업로드 생성
async def upload(file:UploadFile = File(...)):
    try:
        file_location = f"{UPLOAD_DIR}/{file.filename}"
        with open(file_location, "wb") as f:
            shutil.copyfileobj(file.file, f)

        return JSONResponse(
            {"message": "파일 업로드 완료"}, 
            status_code=status.HTTP_201_CREATED)
    except Exception as e:
        return JSONResponse(
            {"message": "업로드 실패", "error":str(e)}, 
            status_code=status.HTTP_400_BAD_REQUEST)
        