import { useState } from "react";
import { useNavigate } from "react-router-dom";
import URL from "../../constants/url";
import SignUpForm from "./SignUpForm";
// import { api } from "../api/axios"; // ⬅️ 백엔드 연결 시 다시 살릴 예정
const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert("필수 약관에 동의해야 회원가입이 가능합니다.");
      return;
    }

    console.log("회원가입 데이터:", form);
    alert("회원가입 완료(가정). 로그인 페이지로 이동합니다.");
    navigate(URL.LOGIN_URL);

    // ===============================
    //
    // ① 현재: 백엔드 없이 프론트만 테스트
    //
    // ===============================
    // console.log("회원가입 폼 데이터(가짜로 출력만):", form);
    // alert( "백엔드 없이 회원가입이 완료되었다고 가정하고\n로그인 페이지로 이동합니다." );
    // navigate(URL.LOGIN_URL);
    //
    // ==========================================
    //
    // ② 백엔드 연결후 주석풀기
    //
    // ==========================================
    //
    /* try { const payload = {
   email: form.email, 
   password: form.password, 
   name: form.name, 
   gender: form.gender, 
   age: Number(form.age), 
   height: Number(form.height), 
   weight: Number(form.weight), 
   };

   await api.post("/auth/signup", payload); 
   
   alert("회원가입이 완료되었습니다!"); 
   navigate(URL.LOGIN_URL); 
   } catch (error) { 
    console.error("회원가입 실패:", error); 
    alert("회원가입에 실패했습니다. 다시 시도해주세요."); 
    } 
    */
  };
  return (
    <div className="signup-page">
      <h2 className="signup-title">회원가입</h2>

      <SignUpForm
        form={form}
        handleChange={handleChange}
        agreeTerms={agreeTerms}
        setAgreeTerms={setAgreeTerms}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default SignUp;
