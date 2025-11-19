import pandas as pd
from sqlalchemy import text

from db.pool import engine
# 출석
def insert_attendance(user_id: str):
    query = text("INSERT INTO comment (user_id) VALUES ()")
    with engine.connect() as conn:
        result = conn.execute(query, {"user_id": user_id})
    conn.commit()
    return result.lastrowid
