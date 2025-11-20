
from models import attendance

# 개별 출석
def create_attendance(user_id: str):
    post_id = attendance.insert_attendance(user_id)
    return post_id

# 개별 출석 조회
def get_attendance_by_user_id(user_id: int):
    post_data = attendance.get_attendance_by_user_id(user_id)
    return post_data
