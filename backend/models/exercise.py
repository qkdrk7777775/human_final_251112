import pandas as pd
from sqlalchemy import text

from db.pool import engine

# 기본 운동 생성
def insert_exercise(name: str, type: str, link: str):
    query = text("""
    INSERT INTO base_exercises (name, type, link)
    VALUES (:name, :type, :link)
    """)
    with engine.connect() as conn:
        result = conn.execute(query, {
            "name": name, "type": type, "link": link})
        conn.commit()
    return result.lastrowid

# 기본 운동 조회
def get_exercies():
    query = text("SELECT * FROM base_exercises")
    with engine.connect() as conn:
        df = pd.read_sql(query, conn)
    return df.to_dict(orient="records")

def get_exercies_by_ex_id(ex_id: int):
    query = text("SELECT * FROM base_exercises WHERE id = :ex_id")
    with engine.connect() as conn:
        df = pd.read_sql(query, conn, params={"ex_id": ex_id})
    return df.to_dict(orient="records")


# 기본 운동 수정
def update_exercise_by_ex_id(ex_id: int, name: str, type: str, link: str):
    query = text("UPDATE base_exercises SET name = :name, type = :type, link = :link WHERE id = :ex_id")
    with engine.connect() as conn:
        result = conn.execute(query, {"name": name, "type": type, "link": link, "ex_id": ex_id})
        conn.commit()
    return result.rowcount

# 기본 운동 삭제
def delete_exercise_by_ex_id(ex_id: int):
    query = text("DELETE FROM base_exercises WHERE id = :ex_id ")
    with engine.connect() as conn:
        result = conn.execute(query, {"ex_id": ex_id})
        conn.commit()
    return result.rowcount