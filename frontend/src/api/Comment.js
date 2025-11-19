import { api, apiWithCookie } from "./axios";

export async function createComment(postId, contents, authorId) {
  try {
    const res = await apiWithCookie.post("/comments", {
      post_id: postId,
      user_id: authorId,
      contents,
    });

    return res.data;
  } catch (err) {
    console.error("게시글 작성 실패:", err);
    throw err;
  }
}

export async function getCommentsByPostId(postId) {
  try {
    const res = await api.get(`/comments/${postId}`);
    return res.data;
  } catch (err) {
    console.error("게시글 상세 불러오기 실패:", err);
    throw err;
  }
}

export async function updateComment(postId, contents) {
  try {
    const res = await apiWithCookie.put(`/comments/${postId}`, {
      contents,
    });
    return res.data;
  } catch (err) {
    console.error("게시글 수정 실패:", err);
    throw err;
  }
}
export async function deleteComment(postId) {
  console.log(postId);
  try {
    const res = await apiWithCookie.delete(`/comments/${postId}`);
    return res.data;
  } catch (err) {
    console.error("게시글 삭제 실패:", err);
    throw err;
  }
}
