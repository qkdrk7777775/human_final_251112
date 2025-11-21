import { useEffect, useRef } from "react";
import * as posedetection from "@tensorflow-models/pose-detection";

const PoseCanvas3d = ({ videoRef, poses }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");

    // 캔버스 크기 설정 (비디오와 동일)
    if (
      canvas.width !== video.videoWidth ||
      canvas.height !== video.videoHeight
    ) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!poses || poses.length === 0) return;

    const keypoints = poses[0].keypoints3D?.length
      ? poses[0].keypoints3D
      : poses[0].keypoints;

    if (!keypoints) return;

    // 좌우 반전 (원하는 경우)
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-canvas.width, 0);

    // Draw keypoints
    keypoints.forEach((kp) => {
      if (kp.score > 0.3 && kp.x != null && kp.y != null) {
        ctx.beginPath();
        ctx.arc(kp.x, kp.y, 5, 0, 2 * Math.PI); // 원본 크기
        ctx.fillStyle = "red";
        ctx.fill();
      }
    });

    // BlazePose skeleton
    const adjacentPairs = posedetection.util.getAdjacentPairs(
      posedetection.SupportedModels.BlazePose
    );

    adjacentPairs.forEach(([i, j]) => {
      const kp1 = keypoints[i];
      const kp2 = keypoints[j];
      if (
        kp1?.score > 0.3 &&
        kp2?.score > 0.3 &&
        kp1.x != null &&
        kp1.y != null &&
        kp2.x != null &&
        kp2.y != null
      ) {
        ctx.beginPath();
        ctx.moveTo(kp1.x, kp1.y);
        ctx.lineTo(kp2.x, kp2.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "lime";
        ctx.stroke();
      }
    });

    ctx.restore();
  }, [poses, videoRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
};

export default PoseCanvas3d;
