import { useState } from "react";
import "./ImgSkeleton.scss";

export default function ImgSkeleton({ src }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="img-wrapper">
      <div className="img-skeleton" style={{ opacity: loading ? 1 : 0 }} />
      <img
        className="image"
        src={src}
        onLoad={() => setLoading(false)}
        alt=""
        style={{ opacity: loading ? 0 : 1 }}
      />
    </div>
  );
}
