import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Line, OrbitControls } from "@react-three/drei";

const Pose3D = ({ poses }) => {
  if (!poses || poses.length === 0) return null;

  const keypoints = poses[0].keypoints3D || poses[0].keypoints;
  const adjacentPairs = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4], // 예시, BlazePose skeleton 연결
    [0, 5],
    [5, 6],
    [6, 7],
    [7, 8],
  ];

  return (
    <>
      {/* Keypoints */}
      {keypoints.map((kp, i) =>
        kp.x != null && kp.y != null && kp.z != null && kp.score > 0.3 ? (
          <Sphere
            key={i}
            args={[0.001, 16, 16]}
            position={[kp.x / 100, kp.y / 10, kp.z / 10]}
          >
            <meshStandardMaterial color="red" />
          </Sphere>
        ) : null
      )}

      {/* Skeleton Lines */}
      {adjacentPairs.map(([i, j], idx) => {
        const kp1 = keypoints[i];
        const kp2 = keypoints[j];
        if (
          kp1?.x != null &&
          kp1?.y != null &&
          kp1?.z != null &&
          kp2?.x != null &&
          kp2?.y != null &&
          kp2?.z != null &&
          kp1.score > 0.3 &&
          kp2.score > 0.3
        ) {
          return (
            <Line
              key={idx}
              points={[
                [kp1.x / 100, kp1.y / 100, kp1.z / 100],
                [kp2.x / 100, kp2.y / 100, kp2.z / 100],
              ]}
              color="lime"
              lineWidth={2}
            />
          );
        }
        return null;
      })}
    </>
  );
};

export default Pose3D;
