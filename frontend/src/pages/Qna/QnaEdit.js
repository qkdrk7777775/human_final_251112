import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getQnaDetail, updateQna } from "../../api/Qna";

export default function QnaEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = new URLSearchParams(location.search).get("from"); // from=profile 지원

  const [form, setForm] = useState({
    title: "",
    contents: "",
  });

  // 기존 글 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getQnaDetail(id);
        setForm({
          title: res.data.title,
          contents: res.data.contents,
        });
      } catch (err) {
        console.error(err);
        alert("Q&A 상세 불러오기 실패");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.contents) {
      alert("제목과 내용을 입력하세요.");
      return;
    }

    try {
      await updateQna(id, form);

      alert("Q&A 수정 완료");

      // 마이페이지에서 왔으면 다시 마이페이지로
      if (from === "profile") {
        navigate("/profile");
      } else {
        navigate(`/qna/${id}`);
      }
    } catch (err) {
      console.error(err);
      alert("수정 실패");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Q&A 수정하기</h2>

      <input
        type="text"
        name="title"
        placeholder="제목"
        value={form.title}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <textarea
        name="contents"
        placeholder="내용"
        rows="10"
        value={form.contents}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px" }}
      />

      <button
        onClick={handleSubmit}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        수정 완료
      </button>
    </div>
  );
}
