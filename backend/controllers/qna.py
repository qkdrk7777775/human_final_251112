from fastapi import APIRouter, Body, Path, status
from fastapi.responses import JSONResponse

from services import qna as qna_service

router = APIRouter()


# 1) QnA 생성
async def create_qna(
    user_id: int = Path(...),
    body: dict = Body(...)
):
    try:
        ok, result = qna_service.create_qna(
            user_id=user_id,
            title=body.get("title"),
            contents=body.get("contents")
        )

        if not ok:
            return JSONResponse(
                {"message": result},
                status_code=status.HTTP_409_CONFLICT
            )

        return JSONResponse(
            {"message": "QnA 등록 완료", "qna_id": result},
            status_code=status.HTTP_201_CREATED
        )

    except Exception as e:
        return JSONResponse(
            {"message": "QnA 등록 실패", "error": str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )

# 2) QnA 전체 조회
async def get_all_qna():
    try:
        data = qna_service.fetch_all_qna()

        return JSONResponse(
            {"message": "전체 조회 성공", "data": data},
            status_code=status.HTTP_200_OK
        )
    except Exception as e:
        return JSONResponse(
            {"message": "QnA 조회 실패", "error": str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )

# 3) QnA 상세 조회
async def get_qna_detail(
    qna_id: int = Path(...)
):
    try:
        ok, result = qna_service.fetch_qna_detail(qna_id)

        if not ok:
            return JSONResponse(
                {"message": result},
                status_code=status.HTTP_404_NOT_FOUND
            )

        return JSONResponse(
            {"message": "상세조회 성공", "data": result},
            status_code=status.HTTP_200_OK
        )
    except Exception as e:
        return JSONResponse(
            {"message": "QnA 상세조회 실패", "error": str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )


# 4) QnA 수정
async def update_qna(
    qna_id: int = Path(...),
    body: dict = Body(...)
):  
    try:
        title = body.get("title")
        contents = body.get("contents")
        if (contents is None) | (title is None):
            return JSONResponse(
                {"message": "콘텐츠나 타이틀이 비어있습니다."},
                # 상태 코드 확인 필요
                status_code=status.HTTP_400_BAD_REQUEST
            )

        ok, result = qna_service.modify_qna(
            qna_id,title,contents
        )

        if not ok:
            return JSONResponse(
                {"message": result},
                status_code=status.HTTP_404_NOT_FOUND
            )

        return JSONResponse(
            {"message": "수정 완료"},
            status_code=status.HTTP_200_OK
        )
    except Exception as e:
        return JSONResponse(
            {"message": "QnA 수정 실패", "error": str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )


# 5) QnA 삭제
async def delete_qna(
    qna_id: int = Path(...)
):
    try:
        ok, result = qna_service.remove_qna(qna_id)

        if not ok:
            return JSONResponse(
                {"message": result},
                status_code=status.HTTP_404_NOT_FOUND
            )

        return JSONResponse(
            {"message": "삭제 완료"},
            status_code=status.HTTP_200_OK
        )
    except Exception as e:
        return JSONResponse(
            {"message": "QnA 삭제 실패", "error": str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )
# 6) 유저별 QnA 조회
async def get_user_qna(user_id: int = Path(...)):
    try:
        data = qna_service.fetch_qna_by_user(user_id)
        return JSONResponse(
            {"message": "유저 QnA 조회 성공", "data": data},
            status_code=status.HTTP_200_OK
        )
    except Exception as e:
        return JSONResponse(
            {"message": "유저 QnA 조회 실패", "error": str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )
