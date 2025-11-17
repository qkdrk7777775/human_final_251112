from fastapi import status, Body, Path
from fastapi.responses import JSONResponse

from services import community

async def create_post(body: dict = Body(...)):
    try:
        post_id = await community.create_post(
            title=body.get("title"),
            content=body.get("content"),
            author_id=body.get("author_id")
        )
        return JSONResponse({"message": "게시글 생성 완료", "post_id": post_id}, status_code=status.HTTP_201_CREATED)
    except Exception:
        return JSONResponse({"message": "게시글 생성 실패"}, status_code=status.HTTP_400_BAD_REQUEST)

# 게시글 모두 조회
async def read_posts():
    try:
        posts = await community.get_posts()
        return JSONResponse(
            {
                "message":"게시글 조회 성공",
                "data": posts
            }, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "게시글 조회 실패", "error":str(e)}, 
            status_code=status.HTTP_404_NOT_FOUND
            )
        
# 게시글 상세 조회
async def read_post(post_id: int = Path(...)):
    try:
        post = await community.get_post(post_id)
        if not post:
            return JSONResponse(
                {"message": "게시글 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND)
        return JSONResponse(
            {
                "message":"게시글 조회 성공",
                "data": post
            }, 
            status_code=status.HTTP_200_OK)
    except Exception:
        return JSONResponse(
            {"message": "게시글 조회 실패"}, 
            status_code=status.HTTP_404_NOT_FOUND)

# 게시글 수정
async def update_post(
    post_id: int = Path(...), 
    body: dict = Body(...)
):
    try:
        title = body.get("title")
        content = body.get("content")

        updated = await community.update_post(post_id, title, content)

        if not updated:
            return JSONResponse(
                {"message": "게시글 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND
            )

        return JSONResponse(
            {"message": "게시글 수정 성공"},
            status_code=status.HTTP_200_OK
        )
    except Exception:
        return JSONResponse(
            {"message": "게시글 수정 실패"}, 
            status_code=status.HTTP_400_BAD_REQUEST
        )

async def delete_post(post_id: int = Path(...)):
    try:
        deleted = await community.delete_post(post_id)
        if not deleted:
            return JSONResponse(
                {"message": "게시글 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND)
        return JSONResponse(
            {"message": "게시글 삭제 완료"}, 
            status_code=status.HTTP_200_OK)
    except Exception:
        return JSONResponse(
            {"message": "게시글 삭제 실패"}, 
            status_code=status.HTTP_400_BAD_REQUEST)