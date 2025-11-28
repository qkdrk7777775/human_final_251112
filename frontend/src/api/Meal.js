import { api } from "./axios";

export async function createBaseMeal(name, calories, link) {
  try {
    const res = await api.post("/meal", {
      name,
      calories,
      link,
    });

    return res.data;
  } catch (err) {
    console.error("기본 식단 생성 실패:", err);
    throw err;
  }
}

export async function getBaseMeal() {
  try {
    const res = await api.get(`/meal`);
    return res.data;
  } catch (err) {
    console.error("기본 식단 불러오기 실패:", err);
    throw err;
  }
}
export async function getBaseMealByMealId(meal_id) {
  try {
    const res = await api.get(`/meal/${meal_id}`);
    return res.data;
  } catch (err) {
    console.error("기본 식단 상세 불러오기 실패:", err);
    throw err;
  }
}

export async function updateBaseMealByMealId(meal_id, name, calories, link) {
  try {
    const res = await api.put(`/meal/${meal_id}`, {
      name,
      calories,
      link,
    });
    return res.data;
  } catch (err) {
    console.error("기본 식단 수정 실패:", err);
    throw err;
  }
}
export async function deleteBaseMealByMealId(meal_id) {
  try {
    const res = await api.delete(`/meal/${meal_id}`);
    return res.data;
  } catch (err) {
    console.error("기본 식단 삭제 실패:", err);
    throw err;
  }
}
