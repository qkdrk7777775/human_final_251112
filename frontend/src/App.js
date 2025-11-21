import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import URL from "./constants/url";

import "./css/index.css";
import "./css/global.css";
import "./css/signup.css";
import "./css/login.css";
import "./css/admin.css";

import Exercise from "./pages/Exercise";
import Community from "./pages/Community";
import CommunityWrite from "./pages/Community/Write";
import CommunityRead from "./pages/Community/Read";

import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";

import Admin from "./pages/Admin";
import AdminExercise from "./pages/Admin/Exercise";
import AdminMeal from "./pages/Admin/Meal";
import AdminUser from "./pages/Admin/User";
import AdminPostList from "./pages/Admin/PostList";

import Qna from "./pages/Qna";
import QnaWrite from "./pages/Qna/QnaWrite";
import QnaDetail from "./pages/Qna/QnaDetail";

function App() {
  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
    } else {
      // 테스트용
      const sampleUser = {
        id: 1,
        username: "testuser",
        email: "testuser@example.com",
        role: "admin",
      };
      setUserInfo(sampleUser);
      localStorage.setItem("userInfo", JSON.stringify(sampleUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(undefined);
  };

  return (
    <BrowserRouter>
      <Header userInfo={userInfo} onLogout={handleLogout} />
      <main>
        <Routes>
          {/* 기본 페이지 */}
          <Route path={URL.HOME} element={<Home />} />
          <Route path={URL.EXERCISE_URL} element={<Exercise />} />
          <Route path={URL.COMMUNITY_URL} element={<Community />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* 커뮤니티 */}
          <Route
            path={`${URL.COMMUNITY_URL}/read/:id`}
            element={<CommunityRead />}
          />
          <Route
            path={`${URL.COMMUNITY_URL}/write`}
            element={
              <PrivateRoute userInfo={userInfo}>
                <CommunityWrite />
              </PrivateRoute>
            }
          />
          <Route
            path={`${URL.COMMUNITY_URL}/write/:id`}
            element={
              <PrivateRoute userInfo={userInfo}>
                <CommunityWrite />
              </PrivateRoute>
            }
          />

          {/* 프로필 */}
          <Route
            path={URL.PROFILE_URL}
            element={
              <PrivateRoute userInfo={userInfo}>
                <Profile userInfo={userInfo} />
              </PrivateRoute>
            }
          />

          {/* Auth */}
          <Route
            path={URL.LOGIN_URL}
            element={<Login setUserInfo={setUserInfo} />}
          />
          <Route path="/signup" element={<SignUp />} />

          {/* 관리자 */}
          <Route
            path="/admin"
            element={
              <PrivateRoute userInfo={userInfo} requireAdmin={true}>
                <Admin userInfo={userInfo} />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/ex"
            element={
              <PrivateRoute userInfo={userInfo} requireAdmin={true}>
                <AdminExercise />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/meal"
            element={
              <PrivateRoute userInfo={userInfo} requireAdmin={true}>
                <AdminMeal />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/user"
            element={
              <PrivateRoute userInfo={userInfo} requireAdmin={true}>
                <AdminUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/post"
            element={
              <PrivateRoute userInfo={userInfo} requireAdmin={true}>
                <AdminPostList />
              </PrivateRoute>
            }
          />

          {/* 🔥 QNA ROUTES */}
          <Route path="/qna" element={<Qna />} />
          <Route
            path="/qna/write"
            element={
              <PrivateRoute userInfo={userInfo}>
                <QnaWrite />
              </PrivateRoute>
            }
          />
          <Route path="/qna/:id" element={<QnaDetail />} />

          {/* 기타 */}
          <Route path="/*" element={<Navigate to={URL.HOME} replace />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
