from models import qna

# 1) QnA 생성
def create_qna(user_id, title, contents):
    # 제목 중복 체크
    if qna.checked_title(title):
        return False, "이미 존재하는 제목입니다."

    # DB 저장
    qna_id = qna.insert_qna(user_id, title, contents)
    return True, qna_id


# 2) QnA 전체 조회
def fetch_all_qna():
    data = qna.get_all_qna()
    return data


# 3) 특정 QnA 상세 조회
def fetch_qna_detail(qna_id):
    data = qna.get_qna_by_id(qna_id)
    if len(data) == 0:
        return False, "해당 QnA가 존재하지 않습니다."
    return True, data[0]


# 4) QnA 수정
def modify_qna(qna_id, title, contents):
    rows = qna.update_qna(qna_id, title, contents)
    if rows == 0:
        return False, "수정할 QnA가 없습니다."
    return True, "수정 완료"


# 5) QnA 삭제
def remove_qna(qna_id):
    rows = qna.delete_qna(qna_id)
    if rows == 0:
        return False, "삭제할 QnA가 없습니다."
    return True, "삭제 완료"

# 6) 해당 유저의 QnA 목록 조회
def fetch_qna_by_user(user_id: int):
    return qna.get_qna_by_user_id(user_id)
