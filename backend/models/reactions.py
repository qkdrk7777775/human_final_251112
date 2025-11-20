import pandas as pd
from sqlalchemy import text

from db.pool import engine

# 게시글 반응 생성
def insert_post_reactions(post_id: str, user_id: str, reaction_type: str):
    query = text("""
    INSERT INTO post_reactions (post_id, user_id, reaction_type)
    VALUES (:post_id, :user_id, :reaction_type)
    """)
    with engine.connect() as conn:
        result = conn.execute(query, {
            "post_id": post_id, "user_id": user_id, "reaction_type": reaction_type})
        conn.commit()
    return result.lastrowid

# 해당 게시글의 반응 조회
def get_post_reactions_by_post_id(post_id: str):
    query = text("SELECT * FROM post_reactions WHERE post_id = :post_id")
    with engine.connect() as conn:
        df = pd.read_sql(query, conn, params={"post_id": post_id})
    return df.to_dict(orient="records")

def get_post_reactions_by_post_id_user_id(post_id: str, user_id:str):
    query = text("SELECT * FROM post_reactions WHERE post_id = :post_id AND user_id = :user_id")
    with engine.connect() as conn:
        df = pd.read_sql(query, conn, params={"post_id": post_id, "user_id":user_id})
    return df.to_dict(orient="records")

# 특정 반응 수정
def update_reaction_by_id(post_id: str, user_id: str, reaction_type:str):
    query = text("UPDATE post_reactions SET reaction_type = :reaction_type  WHERE post_id = :post_id and user_id = :user_id")
    with engine.connect() as conn:
        result = conn.execute(query, {"reaction_type": reaction_type, "post_id": post_id, "user_id":user_id})
        conn.commit()
    return result.rowcount

# 특정 반응 삭제
def delete_reaction_by_id(post_id: str, user_id:str):
    query = text("DELETE FROM post_reactions WHERE post_id = :post_id  AND user_id = :user_id")
    with engine.connect() as conn:
        result = conn.execute(query, {"post_id": post_id, "user_id":user_id})
        conn.commit()
    return result.rowcount