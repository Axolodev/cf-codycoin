import { useLoader } from "@react-three/fiber";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";
import React from "react";
import { AbsoluteFill, useVideoConfig, staticFile } from "remotion";
import { Coin } from "./Coin";

const container: React.CSSProperties = {
  backgroundColor: "transparent",
};

export const Scene: React.FC = () => {
  const { width, height } = useVideoConfig();
  const coinFront = useLoader(THREE.TextureLoader, staticFile("happy.png"));
  const coinBack = useLoader(THREE.TextureLoader, staticFile("cf.png"));

  return (
    <AbsoluteFill style={container}>
      <ThreeCanvas linear width={width} height={height}>
        <color attach="background" args={[0xffffff]} />
        <ambientLight intensity={1} color={0xffffff} />
        <pointLight position={[10, 10, 0]} />
        <Coin texture={coinFront} backTexture={coinBack} />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
