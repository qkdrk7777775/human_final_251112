
from models import reactions

# 게시글 반응 생성
def create_post_reaction(post_id: str, user_id: str, reaction_type: int):
    post_id = reactions.insert_post_reactions(post_id, user_id, reaction_type)
    return post_id

# 해당 게시글의 반응 조회
def read_post_reactions(post_id: str):
    posts = reactions.get_post_reactions_by_post_id(post_id)
    return posts

# 특정 반응 수정
def update_post_reaction(post_id: str, user_id:str, reaction_type:str):
    posts = reactions.update_reaction_by_id(post_id, user_id, reaction_type)
    return posts

# 특정 반응 삭제
def delete_post_reaction(post_id: str, user_id:str):
    deleted = reactions.delete_reaction_by_id(post_id, user_id)
    return deleted
