import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Parser } from "mmd-parser";
import * as THREE from "three";

import "./Options.css";

import ExampleAvatar from "../assets/ExampleAvatar_B.vrm";
import idle from "../assets/sway.vmd";

import { useVrm } from "../components/VRMViewer/useVRM";
import { VRMViewer } from "../components/VRMViewer/VRMViewer";
import { Controls } from "../components/VRMViewer/Controls";
import { bindToVRM } from "../components/VRMViewer/VMDAnimator";
import convert from "../components/VRMViewer/VRMAnimator";
import IKHandler from "../components/VRMViewer/IKHandler";
import toOffset, { calculatePosition } from "../components/VRMViewer/toOffset";

// getVmd returns a promise that resolves to a VMD object.
const getVmd = async (url) => {
  const data = await fetch(url)
    .then((res) => res.blob())
    .then((blob) => blob.arrayBuffer());
  const vmdData = new Parser().parseVmd(data);
  return vmdData;
};

// getQueryVariable returns the value of the query variable with the given name.
const getQueryVariable = (variable) => {
  let query = window.location.search.substring(1);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
};

const Options = () => {
  const vrmUrl = getQueryVariable("vrm");
  let decodedVrmUrl = decodeURIComponent(vrmUrl);

  if (!vrmUrl) {
    decodedVrmUrl = ExampleAvatar;
  }

  const { vrm, loaded } = useVrm(decodedVrmUrl);

  const ikRef = useRef();
  const clockRef = useRef();
  const mixerRef = useRef();

  const start = async () => {
    const vmd = await getVmd(idle);

    // reset Clock to zero
    clockRef.current = new THREE.Clock();

    // convert animation to AnimationClip
    const animation = convert(vmd, toOffset(vrm));
    const clip = bindToVRM(animation, vrm);

    // setup mixer and ik handler
    mixerRef.current = new THREE.AnimationMixer(vrm.scene);
    ikRef.current = IKHandler.get(vrm);

    const animate = mixerRef.current.clipAction(clip);
    animate.setLoop(THREE.LoopRepeat);
    animate.clampWhenFinished = true; // don't reset pos after animation ends
    animate.play(); // play animation
  };

  useEffect(() => {
    if (loaded) {
      console.log("start");
      start();
    }
  }, [loaded]);

  return (
    <Canvas
      camera={{ position: [0, 2, 4], fov: 10, near: 0.001, far: 100 }}
      onCreated={(state) => state.gl.setClearColor(0x000000, 0)}
      gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
      linear
    >
      <Suspense fallback={null}>
        <directionalLight />
        <VRMViewer vrm={vrm} ikRef={ikRef} mixerRef={mixerRef} clockRef={clockRef} />
        <Controls target={new THREE.Vector3(0, 1.7, 0)} maxDistance={10} screenSpacePanning />
      </Suspense>
    </Canvas>
  );
};

export default Options;
