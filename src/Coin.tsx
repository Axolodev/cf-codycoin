import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import * as Three from "three";
import { CAMERA_DISTANCE, SHININESS } from "./helpers/layout";

export const Coin: React.FC<{
  texture: Three.Texture;
  backTexture: Three.Texture;
}> = ({ texture, backTexture }) => {
  const frame = useCurrentFrame();

  // Place a camera and set the distance to the object.
  // Then make it look at the object.
  const camera = useThree((state) => state.camera);
  useEffect(() => {
    camera.position.set(0, 0, CAMERA_DISTANCE);
    camera.near = 0.2;
    camera.far = Math.max(5000, CAMERA_DISTANCE * 2);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  // Make the video fill the phone texture
  useEffect(() => {
    if (texture) {
      texture.repeat.y = 1.5;
      texture.repeat.x = 1.5;
      texture.offset.y = -0.25;
      texture.offset.x = -0.25;
    }
  }, [texture]);

  useEffect(() => {
    if (backTexture) {
      backTexture.repeat.y = 1.5;
      backTexture.repeat.x = 1.5;
      backTexture.offset.y = -0.25;
      backTexture.offset.x = -0.25;
    }
  }, [backTexture]);

  // During the whole scene, the phone is rotating.
  // 2 * Math.PI is a full rotation.
  const rotateY = interpolate(frame, [0, 500], [0, Math.PI * 6]);

  return (
    <group scale={1} rotation={[0, rotateY, 0]}>
      <mesh rotation={new Three.Euler(0, Math.PI / 2, Math.PI / 2)}>
        <cylinderGeometry args={[1, 1, 0.1, 60]} />
        <meshPhongMaterial color={0xe6c700} shininess={SHININESS} />
      </mesh>

      <mesh rotation={new Three.Euler(0, Math.PI, Math.PI / 2)}>
        <torusGeometry args={[1, 0.12, 10, 60]} />
        <meshPhongMaterial color={0xc2a800} shininess={SHININESS} />
      </mesh>

      <mesh position={[0, 0, 0.06]}>
        <circleGeometry args={[1, 60]} />
        <meshPhongMaterial
          transparent
          attach="material"
          map={texture}
          specular={0xffffff}
          shininess={0}
        />
      </mesh>

      <mesh position={[0, 0, -0.06]} rotation={new Three.Euler(0, Math.PI, 0)}>
        <circleGeometry args={[1, 60]} />
        <meshPhongMaterial
          transparent
          attach="material"
          map={backTexture}
          specular={0xffffff}
          shininess={0}
        />
      </mesh>
    </group>
  );
};
