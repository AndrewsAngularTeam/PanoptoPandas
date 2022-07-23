import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { VRM, VRMSchema, VRMUtils } from "@pixiv/three-vrm";
import { calculatePosition } from "./toOffset";

const calcHeightVRM = (vrm) => {
  const { humanoid } = vrm;
  if (!humanoid) throw new Error("VRM does not have humanoid");

  const foot = humanoid.getBoneNode(VRMSchema.HumanoidBoneName.LeftFoot);
  const head = humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Head);
  const currentPose = humanoid.getPose();
  humanoid.resetPose();

  const headY = calculatePosition(head, head)?.[1];
  const footY = calculatePosition(foot, foot)?.[1];
  if (!headY || !footY) {
    return 0;
  }

  const height = headY - footY;
  humanoid.setPose(currentPose);

  return height;
};

// useVrm hook returns a promise that resolves to a VRM object.
const useVrm = (url) => {
  const { current: loader } = useRef(new GLTFLoader());
  const [vrm, setVrm] = useState();

  useEffect(() => {
    if (!url) return;

    loader.load(url, async (gltf) => {
      VRMUtils.removeUnnecessaryJoints(gltf.scene);
      VRMUtils.removeUnnecessaryVertices(gltf.scene);

      const vrm = await VRM.from(gltf);
      vrm.scene.rotation.y = Math.PI - 0.2;
      vrm.scene.position.set(0, 0, 0);
      const scale = 0.4 + 0.34 / calcHeightVRM(vrm);
      vrm.scene.scale.set(scale, scale, scale);

      setVrm(vrm);
    });
  }, [loader, url]);

  return { vrm, loaded: !!vrm };
};

export { useVrm };
