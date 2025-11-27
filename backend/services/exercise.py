
from models import exercise

# 기본 운동 생성
def create_exercise(name:str, type:str, link:str):
    post_id = exercise.insert_exercise(name, type, link)
    return post_id

# 기본 운동 조회
def get_exercies():
    post_data = exercise.get_exercies()
    return post_data

def get_exercies_by_ex_id(ex_id: int):
    post_data = exercise.get_exercies_by_ex_id(ex_id)
    return post_data

# 기본 운동 수정
def update_exercise_by_ex_id(ex_id: int, name: str, type:str, link:str):
    updated = exercise.update_exercise_by_ex_id(ex_id, name, type, link)
    return updated

# 기본 운동 삭제
def delete_exercise_by_ex_id(ex_id: int):
    deleted = exercise.delete_exercise_by_ex_id(ex_id)
    return deleted