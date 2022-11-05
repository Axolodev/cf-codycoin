import { Composition } from "remotion";
import { Scene } from "./Scene";

export const RemotionVideo: React.FC = () => {
  return (
    <>
      <Composition
        id="Scene"
        component={Scene}
        durationInFrames={168}
        fps={50}
        width={720}
        height={720}
      />
    </>
  );
};
