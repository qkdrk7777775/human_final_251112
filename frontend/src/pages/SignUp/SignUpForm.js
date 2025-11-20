const SignUpForm = ({
  form,
  handleChange,
  agreeTerms,
  setAgreeTerms,
  handleSubmit,
}) => {
  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      {/* 1. 계정 정보 */}
      <section className="signup-section">
        <h3 className="section-title">계정 정보</h3>

        <div className="form-row">
          <label className="form-label">이메일</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className="form-input"
            required
          />
        </div>

        <div className="form-row">
          <label className="form-label">비밀번호</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="8자 이상 입력"
            className="form-input"
            required
          />
        </div>
      </section>

      {/* 2. 기본 정보 */}
      <section className="signup-section">
        <h3 className="section-title">기본 정보</h3>

        <div className="form-row">
          <label className="form-label">이름</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="예: 홍길동"
            className="form-input"
            required
          />
        </div>

        <div className="form-row">
          <label className="form-label">성별</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">선택하세요</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>

        {/* 나이 */}
        <div className="form-row">
          <label className="form-label">나이</label>
          <select
            name="age"
            value={form.age}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">선택하세요</option>
            {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* 키 */}
        <div className="form-row">
          <label className="form-label">키 (cm)</label>
          <select
            name="height"
            value={form.height}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">선택하세요</option>
            {Array.from({ length: 131 }, (_, i) => i + 100).map((num) => (
              <option key={num} value={num}>
                {num} cm
              </option>
            ))}
          </select>
        </div>

        {/* 몸무게 */}
        <div className="form-row">
          <label className="form-label">몸무게 (kg)</label>
          <select
            name="weight"
            value={form.weight}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">선택하세요</option>
            {Array.from({ length: 181 }, (_, i) => i + 20).map((num) => (
              <option key={num} value={num}>
                {num} kg
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* 3. 약관 동의 */}
      <section className="signup-section">
        <h3 className="section-title">약관 동의</h3>
        <div className="form-row checkbox-row">
          <input
            id="agreeTerms"
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          <label htmlFor="agreeTerms">
            [필수] 서비스 이용약관 및 개인정보 수집·이용에 동의합니다.
          </label>
        </div>
      </section>

      <div className="signup-actions">
        <button type="submit" className="btn-primary">
          가입하기
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
