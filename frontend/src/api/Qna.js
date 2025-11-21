import { api, apiWithCookie } from "./axios";

// QnA 전체 조회
export async function getQnaList() {
  try {
    const res = await api.get("/qna");
    return res.data;
  } catch (err) {
    console.error("QnA 목록 불러오기 실패:", err);
    throw err;
  }
}

// QnA 상세 조회
export async function getQnaDetail(id) {
  try {
    const res = await api.get(`/qna/${id}`);
    return res.data;
  } catch (err) {
    console.error("QnA 상세 조회 실패:", err);
    throw err;
  }
}

// QnA 생성
export async function createQna(userId, { title, contents }) {
  try {
    const res = await apiWithCookie.post(`/qna/${userId}`, {
      title,
      contents,
    });
    return res.data;
  } catch (err) {
    console.error("QnA 등록 실패:", err);
    throw err;
  }
}

// QnA 수정
export async function updateQna(id, { title, contents }) {
  try {
    const res = await apiWithCookie.put(`/qna/${id}`, {
      title,
      contents,
    });
    return res.data;
  } catch (err) {
    console.error("QnA 수정 실패:", err);
    throw err;
  }
}

// QnA 삭제
export async function deleteQna(id) {
  try {
    const res = await apiWithCookie.delete(`/qna/${id}`);
    return res.data;
  } catch (err) {
    console.error("QnA 삭제 실패:", err);
    throw err;
  }
}
// 내가 작성한 QnA 조회
export const getMyQna = async (userId) => {
  return api.get(`/qna/user/${userId}`);
};
