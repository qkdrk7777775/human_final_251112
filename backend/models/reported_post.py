import pandas as pd
from sqlalchemy import text

from db.pool import engine

def insert_reported_post(post_id: int, user_id: str, comments: str):
    query = text("""
    INSERT INTO reported_posts (post_id, user_id, comments)
    VALUES (:post_id, :user_id, :comments)
    """)
    with engine.connect() as conn:
        result = conn.execute(query, {"post_id": post_id, "user_id": user_id, "comments": comments})
        conn.commit()
    return result.lastrowid

def get_reported_posts():
    query = "SELECT * FROM reported_posts"
    with engine.connect() as conn:
        df = pd.read_sql(query, conn)
    df["reported_at"] = df["reported_at"].astype(str) 
    return df.to_dict(orient="records")
    
def get_reported_posts_by_id(post_id:int, user_id:str):
    query = text("SELECT 1 FROM reported_posts WHERE post_id = :post_id AND user_id = :user_id")
    with engine.connect() as conn:
        result = conn.execute(query, {"post_id": post_id, "user_id": user_id})
        row = result.fetchone()
    return row is not None
    

# def update_reported_post(report_id: int, reason: str):
#     query = text("UPDATE reported_posts SET reason = WHERE id = ")
#     with engine.connect() as conn:
#         result = conn.execute(query, {"reason": reason, "report_id": report_id})
#         conn.commit()
#     return result.rowcount

# def delete_reported_post(report_id: int):
#     query = text("DELETE FROM reported_posts WHERE id = ")
#     with engine.connect() as conn:
#         result = conn.execute(query, {"report_id": report_id})
#         conn.commit()
#     return result.rowcount