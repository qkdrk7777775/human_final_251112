import { useEffect, useRef } from "react";

function Webcam({ videoRef }) {
  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    }
    setupCamera();
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      style={{
        width: "100%",
        height: "100%",
        transform: "scaleX(-1)",
        objectFit: "cover",
      }} // 셀카모드 미러링
    />
  );
}

export default Webcam;
