import { useRef } from "react";
import { usePoseDetection3d } from "../../hooks/usePoseDetection3d";
import WebCamView from "./WebCamView";

const Exercise = () => {
  const videoRef = useRef(null);
  const { poses, angles } = usePoseDetection3d(videoRef);
  console.log(poses);
  return (
    <div style={{ marginTop: "30px", height: "70vh", display: "flex" }}>
      <WebCamView
        videoRef={videoRef}
        poses={poses}
        width="640px"
        height="480px"
      />
    </div>
  );
};

export default Exercise;
