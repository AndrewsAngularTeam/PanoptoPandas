import * as THREE from "three";
import { VRMSchema } from "@pixiv/three-vrm";

export default function toOffset(vrm) {
  const { humanoid } = vrm;
  if (!humanoid) throw new Error("VRM does not have humanoid");
  const currentPose = humanoid.getPose();
  humanoid.resetPose();
  const { HumanoidBoneName } = VRMSchema;
  const hips = humanoid.getBoneNode(HumanoidBoneName.Hips);
  const leftFoot = humanoid.getBoneNode(HumanoidBoneName.LeftFoot);
  const leftToe = humanoid.getBoneNode(HumanoidBoneName.LeftToes);
  const rightFoot = humanoid.getBoneNode(HumanoidBoneName.RightFoot);
  const rightToe = humanoid.getBoneNode(HumanoidBoneName.RightToes);
  humanoid.setPose(currentPose);
  return {
    hipsOffset: calculatePosition(hips, hips),
    leftFootOffset: calculatePosition(hips, leftFoot),
    leftToeOffset: calculatePosition(leftFoot, leftToe),
    rightFootOffset: calculatePosition(hips, rightFoot),
    rightToeOffset: calculatePosition(rightFoot, rightToe),
  };
}

const tempV3 = new THREE.Vector3();
export function calculatePosition(from, to) {
  if (!from || !to) return;
  let current = to;
  const chain = [to];
  while (current.parent && current !== from) {
    chain.push(current.parent);
    current = current.parent;
  }
  if (current == null) return;
  chain.reverse();
  const position = tempV3.set(0, 0, 0);
  for (const node of chain) position.add(node.position);
  return position.toArray();
}
