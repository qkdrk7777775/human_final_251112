import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getQnaDetail, deleteQna } from "../../api/Qna";

export default function QnaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qna, setQna] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getQnaDetail(id);
        setQna(res.data);
      } catch (err) {
        console.error(err);
        alert("상세 불러오기 실패");
      }
    };
    fetchDetail();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제할까요?")) return;

    try {
      await deleteQna(id);
      alert("삭제 완료");
      navigate("/qna");
    } catch (err) {
      console.error(err);
      alert("삭제 실패");
    }
  };

  // const handleEdit = () => {
  //   navigate(`/qna/write?id=${id}`, { state: qna });
  // };
  const handleEdit = () => {
    navigate(`/qna/edit/${id}?from=profile`);
  };

  if (!qna) return <div>로딩중...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{qna.title}</h2>
      <p>{qna.contents}</p>

      <button onClick={handleEdit} style={{ marginRight: "10px" }}>
        수정
      </button>

      <button onClick={handleDelete} style={{ color: "red" }}>
        삭제
      </button>
    </div>
  );
}
