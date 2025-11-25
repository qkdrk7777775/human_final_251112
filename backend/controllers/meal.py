import io
from PIL import Image
from fastapi import status, UploadFile, File
from fastapi.responses import JSONResponse

from services import meal

# 칼로리 모델 가중치 필요
async def get_calories(file: UploadFile = File(...)):
    try:
        content = await file.read()
        pil_img = Image.open(io.BytesIO(content)).convert("RGB")

        # import os,shutil,cv2
        # import numpy as np 
        # np_array = np.frombuffer(content, np.uint8)
        # img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
        det_res, response = meal.get_calories(pil_img)
        return JSONResponse(
            {"message": "칼로리 추정 완료", 
             "location":det_res,
             "data": response}, status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "칼로리 추정 실패", "error":str(e)}, 
            status_code=status.HTTP_400_BAD_REQUEST)
        