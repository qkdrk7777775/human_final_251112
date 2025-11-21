import { useState } from "react";

const UserInfo = ({ form, handleChange, handleSave }) => {
  // 로컬 유효성 상태
  const [errors, setErrors] = useState({
    age: "",
    height: "",
    weight: "",
  });

  // 범위 + 음수 + 소수점 검증 공통 함수
  const validateNumber = (name, value, min, max) => {
    if (value === "") {
      setErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    const num = Number(value);

    if (isNaN(num) || num < min || num > max) {
      setErrors((prev) => ({
        ...prev,
        [name]: `${min}~${max} 사이의 숫자를 입력하세요.`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section className="profile-section">
      <h3 className="section-title">개인정보 관리</h3>

      <form className="profile-form" onSubmit={handleSave}>
        {/* 이메일 */}
        <div className="form-row">
          <label className="form-label">이메일</label>
          <input
            name="email"
            type="email"
            value={form.email}
            className="form-input"
            disabled
          />
        </div>

        {/* 이름 */}
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

        {/* 성별 */}
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

        {/* 나이 */}
        <div className="form-row">
          <label className="form-label">나이</label>
          <input
            type="number"
            name="age"
            value={form.age}
            className="form-input"
            placeholder="나이를 입력하세요"
            min="1"
            max="100"
            onChange={(e) => {
              handleChange(e);
              validateNumber("age", e.target.value, 1, 100);
            }}
          />
          {errors.age && <span className="error-text">{errors.age}</span>}
        </div>

        {/* 키 */}
        <div className="form-row">
          <label className="form-label">키 (cm)</label>
          <input
            type="number"
            name="height"
            value={form.height}
            className="form-input"
            placeholder="키를 입력하세요"
            min="100"
            max="230"
            onChange={(e) => {
              handleChange(e);
              validateNumber("height", e.target.value, 100, 230);
            }}
          />
          {errors.height && <span className="error-text">{errors.height}</span>}
        </div>

        {/* 몸무게 */}
        <div className="form-row">
          <label className="form-label">몸무게 (kg)</label>
          <input
            type="number"
            name="weight"
            value={form.weight}
            className="form-input"
            placeholder="몸무게 입력하세요"
            min="20"
            max="200"
            onChange={(e) => {
              handleChange(e);
              validateNumber("weight", e.target.value, 20, 200);
            }}
          />
          {errors.weight && <span className="error-text">{errors.weight}</span>}
        </div>

        <div className="profile-actions">
          <button type="submit" className="btn-primary">
            저장하기
          </button>
        </div>
      </form>
    </section>
  );
};

export default UserInfo;
