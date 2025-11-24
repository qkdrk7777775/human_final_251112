from fastapi import status, UploadFile, File
from fastapi.responses import JSONResponse

from services import comment

# 칼로리 모델 가중치 필요
async def get_calories(file: UploadFile = File(...)):
    try:
        content = await file.read()
        import os,shutil,cv2
        import numpy as np 
        np_array = np.frombuffer(content, np.uint8)
        img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
        response = comment.create_comment(content)
        return JSONResponse(
            {"message": "칼로리 추정 완료", 
             "response": response}, status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "칼로리 추정 실패", "error":str(e)}, 
            status_code=status.HTTP_400_BAD_REQUEST)
        