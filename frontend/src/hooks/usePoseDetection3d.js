import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posedetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";

// 3D 관절 각도 계산
function calculateAngle3D(A, B, C) {
  if (!A || !B || !C) return null;

  const zA = A.z ?? 0;
  const zB = B.z ?? 0;
  const zC = C.z ?? 0;

  const AB = { x: A.x - B.x, y: A.y - B.y, z: zA - zB };
  const CB = { x: C.x - B.x, y: C.y - B.y, z: zC - zB };

  const dot = AB.x * CB.x + AB.y * CB.y + AB.z * CB.z;
  const magAB = Math.sqrt(AB.x ** 2 + AB.y ** 2 + AB.z ** 2);
  const magCB = Math.sqrt(CB.x ** 2 + CB.y ** 2 + CB.z ** 2);

  if (magAB === 0 || magCB === 0) return null;

  const angleRad = Math.acos(Math.min(Math.max(dot / (magAB * magCB), -1), 1)); // 안전하게 clamp
  return (angleRad * 180) / Math.PI;
}

const getPoint = (keypoints, name) => {
  const point = keypoints.find((k) => k.name === name);
  if (!point) console.warn("Keypoint missing:", name);
  return point;
};
export function usePoseDetection3d(videoRef) {
  const detectorRef = useRef(null);
  const rafRef = useRef(null);
  const [poses, setPoses] = useState([]);
  const [angles, setAngles] = useState({});

  // TFJS 초기화
  useEffect(() => {
    (async () => {
      await tf.setBackend("webgl");
      await tf.ready();
      console.log("TFJS backend:", tf.getBackend());
    })();
  }, []);

  // BlazePose 3D 모델 로드
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const detector = await posedetection.createDetector(
          posedetection.SupportedModels.BlazePose,
          {
            runtime: "mediapipe",
            modelType: "lite",
            enableSmoothing: true,
            solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/pose",
          }
        );
        if (!cancelled) detectorRef.current = detector;
      } catch (err) {
        console.error("Pose detector loading error:", err);
      }
    })();

    return () => {
      cancelled = true;
      if (detectorRef.current) {
        detectorRef.current.dispose?.();
        detectorRef.current = null;
      }
    };
  }, []);

  // 실시간 포즈 추정 및 각도 계산
  useEffect(() => {
    const detectPose = async () => {
      const video = videoRef.current;
      const detector = detectorRef.current;

      if (video && detector && video.readyState >= 2) {
        try {
          const estimatedPoses = await detector.estimatePoses(video, {
            flipHorizontal: false,
          });
          if (!estimatedPoses || estimatedPoses.length === 0) {
            rafRef.current = requestAnimationFrame(detectPose);
            return;
          }
          const pose = estimatedPoses[0];

          // keypoints3D가 있으면 사용, 없으면 keypoints
          const keypoints = pose.keypoints3D?.length
            ? pose.keypoints3D
            : pose.keypoints;
          //   const scaledKeypoints = scaleKeypoints(video, keypoints);

          if (!keypoints) {
            console.warn("No keypoints found");
            rafRef.current = requestAnimationFrame(detectPose);
            return;
          }

          // 좌우 팔꿈치 각도 계산
          const leftElbow = calculateAngle3D(
            getPoint(keypoints, "left_shoulder"),
            getPoint(keypoints, "left_elbow"),
            getPoint(keypoints, "left_wrist")
          );

          const rightElbow = calculateAngle3D(
            getPoint(keypoints, "right_shoulder"),
            getPoint(keypoints, "right_elbow"),
            getPoint(keypoints, "right_wrist")
          );

          //   setPoses(estimatedPoses);
          setPoses([
            {
              ...pose,
            },
          ]);

          setAngles({ leftElbow, rightElbow });
        } catch (err) {
          console.error("Pose estimation error:", err);
        }
      }

      rafRef.current = requestAnimationFrame(detectPose);
    };

    rafRef.current = requestAnimationFrame(detectPose);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [videoRef]);

  return { poses, angles };
}
