import { useFrame, useThree } from "@react-three/fiber";
import { useState } from "react";
import { getCurrentTabUId } from "../../chrome/utils";
import { VRMSchema } from "@pixiv/three-vrm";

const VRMViewer = ({ vrm, ikRef, mixerRef, clockRef }) => {
  const { camera } = useThree();

  const [id, setID] = useState(undefined);
  const [maxVolume, setMaxVolume] = useState(0.001);
  getCurrentTabUId((id) => {
    setID(id);
  });

  // useFrame runs on every frame in Three.JS.
  useFrame(() => {
    if (!clockRef.current) return; // not started yet.

    const delta = clockRef.current.getDelta();

    // update mixer for animations
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }

    // update ik handler for IK bones (e.g. legs, feet).
    if (ikRef.current) {
      ikRef.current.update();
    }

    // update vrm itself (e.g. hair physics, animations).
    if (vrm) {
      vrm.update(delta);
    }

    // make vrm pupils always look at camera.
    if (vrm && vrm.lookAt) {
      vrm.lookAt.target = camera;
    }

    const message = {
      type: "volume",
    };

    id &&
      chrome.tabs.sendMessage(id, message, (response) => {
        if (maxVolume < response) {
          setMaxVolume(response);
        } else if (maxVolume > 0.001) {
          setMaxVolume(maxVolume - 0.0005);
        }

        vrm.blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.A, response / maxVolume);
      });
  });

  return vrm && <primitive object={vrm.scene} />;
};

export { VRMViewer };
