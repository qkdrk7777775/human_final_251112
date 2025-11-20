const UserInfo = ({ form, handleChange, handleSave }) => {
  return (
    <>
      <section className="profile-section">
        <h3 className="section-title">개인정보 관리</h3>

        <form className="profile-form" onSubmit={handleSave}>
          <div className="form-row">
            <label className="form-label">이메일</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="form-input"
              disabled // 이메일은 보통 수정 불가
            />
          </div>

          <div className="form-row">
            <label className="form-label">이름</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-row">
            <label className="form-label">성별</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">선택하세요</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </div>

          <div className="form-row">
            <label className="form-label">나이</label>
            <select
              name="age"
              value={form.age}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">선택하세요</option>
              {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label className="form-label">키 (cm)</label>
            <select
              name="height"
              value={form.height}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">선택하세요</option>
              {Array.from({ length: 131 }, (_, i) => i + 100).map((num) => (
                <option key={num} value={num}>
                  {num} cm
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label className="form-label">몸무게 (kg)</label>
            <select
              name="weight"
              value={form.weight}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">선택하세요</option>
              {Array.from({ length: 181 }, (_, i) => i + 20).map((num) => (
                <option key={num} value={num}>
                  {num} kg
                </option>
              ))}
            </select>
          </div>

          <div className="profile-actions">
            <button type="submit" className="btn-primary">
              저장하기
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default UserInfo;
