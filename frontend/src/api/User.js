import { api } from "./axios";

export async function getUserAll() {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post(
      `/user/all`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("유저 정보 불러오기 실패:", error);
    throw error;
  }
}
export async function updateUserActiveById(userId, is_active) {
  try {
    const token = localStorage.getItem("token");
    const response = await api.put(
      `/user/${userId}/active`,
      { is_active },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("유저 활성화 상태 변경 실패:", error);
    throw error;
  }
}

export async function deleteUserById(userId) {
  try {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("유저 삭제 실패:", error);
    throw error;
  }
}
