// @ts-nocheck
import { ArrowBackOutlined } from "@material-ui/icons";
import movie from "./op.mp4";
import "./Watch.scss";

export default function Watch() {
  return (
    <div className="watch">
      <div className="back">
        <ArrowBackOutlined />
        Home
      </div>
      <video className="video" muted src={movie} autoPlay controls></video>
    </div>
  );
}
