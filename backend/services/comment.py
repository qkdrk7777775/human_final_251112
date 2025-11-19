
from models import comment

# 댓글 생성
def create_comment(post_id: str, user_id: str, comments: int):
    post_id = comment.insert_comment(post_id, user_id, comments)
    return post_id

# 댓글 조회
def get_comment_by_post_id(post_id: int):
    post_data = comment.get_comments_by_post_id(post_id)
    return post_data

# 댓글 수정
def update_comment_by_id(comment_id: int, comments: str):
    updated = comment.update_comment_by_id(comment_id, comments)
    return updated

# 댓글 삭제
def delete_comment_by_id(comment_id: int):
    deleted = comment.delete_comment_by_id(comment_id)
    return deleted