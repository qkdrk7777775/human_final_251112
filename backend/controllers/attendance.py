from fastapi import status, Body, Path
from fastapi.responses import JSONResponse

from services import attendance

# 개별 출석
async def create_attendance(user_id: int = Path(...)):
    try:
        post_id = attendance.create_attendance(user_id)
        return JSONResponse(
            {"message": "출석 완료", 
             "post_id": post_id}, status_code=status.HTTP_201_CREATED)
    except Exception as e:
        return JSONResponse(
            {"message": "출석 실패", "error":str(e)}, 
            status_code=status.HTTP_400_BAD_REQUEST)
        

# 개별 출석 조회
async def get_attendance_by_user_id(user_id: int = Path(...)):
    try:
        post = attendance.get_attendance_by_user_id(user_id)
        return JSONResponse(
            {
                "message":"출석 조회 성공",
                "data": post
            }, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "출석 조회 실패", "error":str(e)},
            status_code=status.HTTP_404_NOT_FOUND)
