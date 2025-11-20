/* 
TODO
1. API 연결
1.1. 개인정보 저장
1.2. 회원 탈퇴
*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import URL from "../../constants/url";
import UserInfo from "./UserInfo";
import UserPostList from "./UserPostList";
import UserDelete from "./UserDelete";

import { deletePost } from "../../api/Community";

const Profile = ({ userInfo }) => {
  const navigate = useNavigate();

  // App에서 안 넘겨줘도 안터지게 방어
  const safeUser = userInfo || {};

  // 1) 개인정보 폼 상태
  const [form, setForm] = useState({
    email: safeUser.email || "",
    name: safeUser.name || safeUser.username || "",
    gender: safeUser.gender || "",
    age: safeUser.age || "",
    height: safeUser.height || "",
    weight: safeUser.weight || "",
  });

  // 2) 내가 작성한 게시글 – 지금은 가짜 데이터 + 수정/삭제 테스트용
  const [myPosts, setMyPosts] = useState([
    { id: 1, title: "첫 홈트 시작 후기", createdAt: "2025-11-10" },
    { id: 2, title: "스쿼트 자세 교정 팁", createdAt: "2025-11-12" },
  ]);

  // ✅ 인풋 변경 핸들러 (한 번만!)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ 개인정보 저장 (지금은 알림만)
  const handleSave = (e) => {
    e.preventDefault();
    // 나중에 실제 API 붙일 때:
    // await api.put("/users/me", form);

    console.log("수정된 개인정보:", form);
    alert("개인정보 저장(가짜). 나중에 서버랑 연동하면 실제로 저장됩니다.");
  };

  // ✅ 게시글 “수정하기”
  const handleEditPost = (postId) => {
    navigate(`${URL.COMMUNITY_URL}/write/${postId}`);
  };

  // ✅ 게시글 “삭제하기”
  const handleDeletePost = (postId) => {
    const ok = window.confirm("정말 이 게시글을 삭제하시겠습니까?");
    if (!ok) return;
    // 프론트에서만 목록에서 제거
    setMyPosts((prev) => prev.filter((post) => post.id !== postId));

    // 나중에:
    // await deletePost(postId)
    // 삭제 성공 후 setMyPosts로 다시 목록 반영
  };

  return (
    <div className="profile-page">
      <h2 className="profile-title">마이페이지</h2>

      {/* 1. 개인정보 관리 영역 */}
      <UserInfo
        form={form}
        handleChange={handleChange}
        handleSave={handleSave}
      />
      {/* 2. 내 게시글 관리 영역 */}
      <UserPostList
        myPosts={myPosts}
        handleEditPost={handleEditPost}
        handleDeletePost={handleDeletePost}
      />
      {/* 3. 회원 탈퇴 영역 */}
      <UserDelete />
    </div>
  );
};

export default Profile;
