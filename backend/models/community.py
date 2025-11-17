from sqlalchemy import text

from db.pool import engine

# 게시글 생성
def insert_post(title: str, content: str, author_id: int):
    query = text("INSERT INTO posts (title, content, author_id) VALUES (:title, :content, :author_id)")
    with engine.connect() as conn:
        result = conn.execute(query, {"title": title, "content": content, "author_id": author_id})
        conn.commit()
        return result.lastrowid

# 게시글 전체 조회
def fetch_all_posts():
    query = text("SELECT * FROM posts")
    with engine.connect() as conn:
        result = conn.execute(query)
        return [dict(row) for row in result.fetchall()]

# 게시글 상세 조회
def fetch_post_by_id(post_id: int):
    query = text("SELECT * FROM posts WHERE id=:post_id")
    with engine.connect() as conn:
        result = conn.execute(query, {"post_id": post_id})
        row = result.fetchone()
        return dict(row) if row else None

# 게시글 수정
def update_post_by_id(post_id: int, title: str, content: str):
    query = text("UPDATE posts SET title=:title, content=:content WHERE id=:post_id")
    with engine.connect() as conn:
        result = conn.execute(query, {"title": title, "content": content, "post_id": post_id})
        conn.commit()
        return result.rowcount > 0

# 게시글 삭제
def delete_post_by_id(post_id: int):
    query = text("DELETE FROM posts WHERE id=:post_id")
    with engine.connect() as conn:
        result = conn.execute(query, {"post_id": post_id})
        conn.commit()
        return result.rowcount > 0