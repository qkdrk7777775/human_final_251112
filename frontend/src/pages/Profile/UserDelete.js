const UserDelete = () => {
  // ✅ 회원 탈퇴 (지금은 알림만)
  const handleDeleteAccount = () => {
    const ok = window.confirm(
      "정말 회원 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다."
    );
    if (!ok) return;

    // 나중에 실제 API:
    // await api.delete("/users/me");
    // localStorage.removeItem("userInfo");
    // navigate("/");

    alert("회원 탈퇴 기능은 서버 연동 시 구현 예정입니다.");
  };

  return (
    <>
      <section className="profile-section danger">
        <h3 className="section-title">회원 탈퇴</h3>
        <p className="danger-text">
          탈퇴 시 데이터가 모두 삭제되며, 되돌릴 수 없습니다.
        </p>
        <button
          className="btn-outline danger-btn"
          onClick={handleDeleteAccount}
        >
          회원 탈퇴
        </button>
      </section>
    </>
  );
};

export default UserDelete;
