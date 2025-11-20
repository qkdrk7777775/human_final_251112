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


# 개별 출석 조회
def get_attendance_by_user_id(user_id: int):
    query = text("SELECT * FROM attendance  WHERE user_id = :user_id")
    with engine.connect() as conn:
        df = pd.read_sql(query, conn, params={"user_id": user_id})
    return df.to_dict(orient="records")

