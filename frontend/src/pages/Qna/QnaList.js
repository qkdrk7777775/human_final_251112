import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DynamicTable from "../../components/DynamicTable";
import { getQnaList } from "../../api/Qna";

const QnaList = () => {
  const [qnaList, setQnaList] = useState();
  const [selectedData, setSelectedData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQna = async () => {
      try {
        const data = await getQnaList();
        setQnaList(data.data);
      } catch (error) {
        console.error(error);
        alert("QnA 목록 불러오기 실패");
      }
    };
    fetchQna();
  }, []);

  useEffect(() => {
    if (selectedData?.id) {
      navigate(`/qna/${selectedData.id}`);
    }
  }, [selectedData, navigate]);

  const handleWriteQna = () => {
    navigate("/qna/write");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Q&A</h2>

      <DynamicTable
        data={qnaList}
        setSelectedData={setSelectedData}
        rowsPerPage={10}
      />

      <button
        onClick={handleWriteQna}
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
        Q&A 작성하기
      </button>
    </div>
  );
};

export default QnaList;
