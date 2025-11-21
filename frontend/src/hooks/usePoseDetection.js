import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posedetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";
function calculateAngle(A, B, C) {
  const AB = { x: A.x - B.x, y: A.y - B.y };
  const CB = { x: C.x - B.x, y: C.y - B.y };

  const dot = AB.x * CB.x + AB.y * CB.y;
  const magAB = Math.hypot(AB.x, AB.y);
  const magCB = Math.hypot(CB.x, CB.y);

  const angleRad = Math.acos(dot / (magAB * magCB));
  return (angleRad * 180) / Math.PI;
}

export function usePoseDetection(videoRef) {
  const [angles, setAngles] = useState([]);
  // console.log(angles);
  const detectorRef = useRef(null);
  const rafRef = useRef(null);
  const [poses, setPoses] = useState([]);

  // TFJS 초기화
  useEffect(() => {
    (async () => {
      await tf.setBackend("webgl");
      await tf.ready();
      console.log("TFJS backend:", tf.getBackend());
    })();
  }, []);

  // 모델 로드
  useEffect(() => {
    let cancelled = false;
    const loadModel = async () => {
      try {
        const detector = await posedetection.createDetector(
          posedetection.SupportedModels.MoveNet,
          {
            modelType: posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
            enableSmoothing: true,
          }
        );
        if (!cancelled) detectorRef.current = detector;
      } catch (err) {
        console.error(err);
      }
    };
    loadModel();
    return () => (cancelled = true);
  }, []);

  // 실시간 추정 루프
  useEffect(() => {
    const detectPose = async () => {
      const video = videoRef.current;
      const detector = detectorRef.current;
      if (video && detector && video.readyState >= 2) {
        const estimatedPoses = await detector.estimatePoses(video);
        setPoses(estimatedPoses);

        // 예: 첫 번째 사람 기준 팔꿈치 각도
        if (estimatedPoses.length > 0) {
          const pose = estimatedPoses[0];
          const leftElbow = calculateAngle(
            pose.keypoints.find((k) => k.name === "left_shoulder"),
            pose.keypoints.find((k) => k.name === "left_elbow"),
            pose.keypoints.find((k) => k.name === "left_wrist")
          );
          setAngles({ leftElbow });
        }
      }
      rafRef.current = requestAnimationFrame(detectPose);
    };
    rafRef.current = requestAnimationFrame(detectPose);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [videoRef]);
  return poses;
}
