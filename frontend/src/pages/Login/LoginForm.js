import React from "react";

const LoginForm = ({ form, onChange, onSubmit }) => {
  return (
    <form className="login-form" onSubmit={onSubmit}>
      <div className="form-row">
        <label className="form-label">이메일</label>
        <input
          name="email"
          type="email"
          placeholder="이메일"
          value={form.email}
          onChange={onChange}
          required
          className="form-input"
        />
      </div>

      <div className="form-row">
        <label className="form-label">비밀번호</label>
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={onChange}
          required
          className="form-input"
        />
      </div>

      <button type="submit" className="btn-primary login-button">
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
