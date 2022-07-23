import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import "./Options.css";
import ExampleAvatar from "../assets/ExampleAvatar_B.vrm";

// getVmd returns a promise that resolves to a VMD object.
const getVmd = async (url) => {
  const data = await fetch(url)
    .then((res) => res.blob())
    .then((blob) => blob.arrayBuffer());
  const vmdData = new Parser().parseVmd(data);
  return vmdData;
};

function Options() {
  const { vrm } = useVrm(ExampleAvatar);

  const ikRef = useRef();
  const clockRef = useRef();
  const mixerRef = useRef();

  const start = async () => {
    setShow(false);
    const vmd = await getVmd(danceFile);

    // reset Clock to zero
    clockRef.current = new THREE.Clock();

    // convert animation to AnimationClip
    const animation = convert(vmd, toOffset(vrm));
    const clip = bindToVRM(animation, vrm);

    // setup mixer and ik handler
    mixerRef.current = new THREE.AnimationMixer(vrm.scene);
    ikRef.current = IKHandler.get(vrm);

    const animate = mixerRef.current.clipAction(clip);
  };

  return (
    <Canvas camera={{ position: [0, 1.5, 4], fov: 30, near: 0.001, far: 100 }}>
      <Suspense fallback={null}>
        <directionalLight />
        <VRMViewer vrm={vrm} ikRef={ikRef} mixerRef={mixerRef} clockRef={clockRef} />
        <Controls target={new THREE.Vector3(0, 1, 0)} maxDistance={10} screenSpacePanning />
        <gridHelper />
      </Suspense>
    </Canvas>
  );
}

export default Options;
