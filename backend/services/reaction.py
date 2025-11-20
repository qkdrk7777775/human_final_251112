
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
    posts = reactions.get_post_reactions_by_post_id_user_id(post_id, user_id)
    if len(posts):
        saved_reaction = posts[0]["reaction_type"]
        if saved_reaction == reaction_type:
            # 같은 리엑션 클릭 시 삭제
            posts = reactions.delete_reaction_by_id(post_id, user_id)
        else:
            # 다른 리엑션 클릭 시 변경
            posts = reactions.update_reaction_by_id(post_id, user_id, reaction_type)
    else:
        # 리엑션이 없으면 생성
        reactions.insert_post_reactions(post_id, user_id, reaction_type)
        posts = 1
    return posts

# 특정 반응 삭제
def delete_post_reaction(post_id: str, user_id:str):
    deleted = reactions.delete_reaction_by_id(post_id, user_id)
    return deleted
