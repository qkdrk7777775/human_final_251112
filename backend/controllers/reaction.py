from fastapi import status, Body, Path
from fastapi.responses import JSONResponse

from services import reaction

# 게시글 반응 생성
async def create_post_reaction(body: dict = Body(...)):
    try:
        response = reaction.create_post_reaction(
            post_id=body.get("post_id"),
            user_id=body.get("user_id"),
            reaction_type=body.get("reaction_type")
        )
        return JSONResponse({"message": "게시글 반응 완료", "post_id": response}, status_code=status.HTTP_201_CREATED)
    except Exception as e:
        return JSONResponse({"message": "게시글 반응 실패", "error":str(e)}, status_code=status.HTTP_400_BAD_REQUEST)


# 게시글 반응 모두 조회(Not used)
async def read_post_reactions(post_id: int = Path(...)):
    try:
        posts = reaction.read_post_reactions(post_id)
        return JSONResponse(
            {
                "message":"게시글 반응 조회 성공",
                "data": posts
            }, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "게시글 반응 조회 실패", "error":str(e)}, 
            status_code=status.HTTP_404_NOT_FOUND
            )


# 게시글 반응 수정
async def update_post_reaction(
    post_id: int = Path(...),
    body: dict = Body(...)):
    try:
        user_id = body.get("user_id")
        reaction_type = body.get("reaction_type")

        updated = reaction.update_post_reaction(post_id, user_id, reaction_type)

        if not updated:
            return JSONResponse(
                {"message": "게시글 반응 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND
            )

        return JSONResponse(
            {"message": "게시글 반응 수정 성공"},
            status_code=status.HTTP_200_OK
        )
    except Exception as e:
        return JSONResponse(
            {"message": "게시글 반응 수정 실패", "error":str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )

async def delete_post_reaction(
    post_id: int = Path(...),
    body: dict = Body(...)):
    user_id = body.get("user_id")

    try:
        deleted = reaction.delete_post_reaction(post_id, user_id)
        if not deleted:
            return JSONResponse(
                {"message": "게시글 반응 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND)
        return JSONResponse(
            {"message": "게시글 반응 삭제 완료"}, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "게시글 반응 삭제 실패", "error":str(e)},
            status_code=status.HTTP_400_BAD_REQUEST)
    
    
