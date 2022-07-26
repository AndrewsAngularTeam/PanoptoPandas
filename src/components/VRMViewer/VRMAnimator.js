import { VRMSchema } from "@pixiv/three-vrm";
import * as THREE from "three";
const { HumanoidBoneName, BlendShapePresetName } = VRMSchema;

const VMDBoneNames = {
  Root: "全ての親",
  Center: "センター",
  Hips: "下半身",
  Spine: "上半身",
  Chest: "上半身2",
  Neck: "首",
  Head: "頭",
  LeftEye: "左目",
  LeftShoulder: "左肩",
  LeftUpperArm: "左腕",
  LeftLowerArm: "左ひじ",
  LeftHand: "左手首",
  LeftThumbProximal: "左親指０",
  LeftThumbIntermediate: "左親指１",
  LeftThumbDistal: "左親指２",
  LeftIndexProximal: "左人指１",
  LeftIndexIntermediate: "左人指２",
  LeftIndexDistal: "左人指３",
  LeftMiddleProximal: "左中指１",
  LeftMiddleIntermediate: "左中指２",
  LeftMiddleDistal: "左中指３",
  LeftRingProximal: "左薬指１",
  LeftRingIntermediate: "左薬指２",
  LeftRingDistal: "左薬指３",
  LeftLittleProximal: "左小指１",
  LeftLittleIntermediate: "左小指２",
  LeftLittleDistal: "左小指３",
  LeftUpperLeg: "左足",
  LeftLowerLeg: "左ひざ",
  LeftFoot: "左足首",
  LeftFootIK: "左足ＩＫ",
  LeftToes: "左つま先",
  LeftToeIK: "左つま先ＩＫ",
  RightEye: "右目",
  RightShoulder: "右肩",
  RightUpperArm: "右腕",
  RightLowerArm: "右ひじ",
  RightHand: "右手首",
  RightThumbProximal: "右親指０",
  RightThumbIntermediate: "右親指１",
  RightThumbDistal: "右親指２",
  RightIndexProximal: "右人指１",
  RightIndexIntermediate: "右人指２",
  RightIndexDistal: "右人指３",
  RightMiddleProximal: "右中指１",
  RightMiddleIntermediate: "右中指２",
  RightMiddleDistal: "右中指３",
  RightRingProximal: "右薬指１",
  RightRingIntermediate: "右薬指２",
  RightRingDistal: "右薬指３",
  RightLittleProximal: "右小指１",
  RightLittleIntermediate: "右小指２",
  RightLittleDistal: "右小指３",
  RightUpperLeg: "右足",
  RightLowerLeg: "右ひざ",
  RightFoot: "右足首",
  RightFootIK: "右足ＩＫ",
  RightToes: "右つま先",
  RightToeIK: "右つま先ＩＫ",
};

const VRM_VMD_BONE_MAP = new Map([
  [VMDBoneNames.Hips, HumanoidBoneName.Hips],
  [VMDBoneNames.Spine, HumanoidBoneName.Spine],
  [VMDBoneNames.Chest, HumanoidBoneName.Chest],
  [VMDBoneNames.Neck, HumanoidBoneName.Neck],
  [VMDBoneNames.Head, HumanoidBoneName.Head],
  [VMDBoneNames.LeftEye, HumanoidBoneName.LeftEye],
  [VMDBoneNames.LeftShoulder, HumanoidBoneName.LeftShoulder],
  [VMDBoneNames.LeftUpperArm, HumanoidBoneName.LeftUpperArm],
  [VMDBoneNames.LeftLowerArm, HumanoidBoneName.LeftLowerArm],
  [VMDBoneNames.LeftHand, HumanoidBoneName.LeftHand],
  [VMDBoneNames.LeftThumbProximal, HumanoidBoneName.LeftThumbProximal],
  [VMDBoneNames.LeftThumbIntermediate, HumanoidBoneName.LeftThumbIntermediate],
  [VMDBoneNames.LeftThumbDistal, HumanoidBoneName.LeftThumbDistal],
  [VMDBoneNames.LeftIndexProximal, HumanoidBoneName.LeftIndexProximal],
  [VMDBoneNames.LeftIndexIntermediate, HumanoidBoneName.LeftIndexIntermediate],
  [VMDBoneNames.LeftIndexDistal, HumanoidBoneName.LeftIndexDistal],
  [VMDBoneNames.LeftMiddleProximal, HumanoidBoneName.LeftMiddleProximal],
  [VMDBoneNames.LeftMiddleIntermediate, HumanoidBoneName.LeftMiddleIntermediate],
  [VMDBoneNames.LeftMiddleDistal, HumanoidBoneName.LeftMiddleDistal],
  [VMDBoneNames.LeftRingProximal, HumanoidBoneName.LeftRingProximal],
  [VMDBoneNames.LeftRingIntermediate, HumanoidBoneName.LeftRingIntermediate],
  [VMDBoneNames.LeftRingDistal, HumanoidBoneName.LeftRingDistal],
  [VMDBoneNames.LeftLittleProximal, HumanoidBoneName.LeftLittleProximal],
  [VMDBoneNames.LeftLittleIntermediate, HumanoidBoneName.LeftLittleIntermediate],
  [VMDBoneNames.LeftLittleDistal, HumanoidBoneName.LeftLittleDistal],
  [VMDBoneNames.LeftUpperLeg, HumanoidBoneName.LeftUpperLeg],
  [VMDBoneNames.LeftLowerLeg, HumanoidBoneName.LeftLowerLeg],
  [VMDBoneNames.LeftFoot, HumanoidBoneName.LeftFoot],
  [VMDBoneNames.LeftToes, HumanoidBoneName.LeftToes],
  [VMDBoneNames.RightEye, HumanoidBoneName.RightEye],
  [VMDBoneNames.RightShoulder, HumanoidBoneName.RightShoulder],
  [VMDBoneNames.RightUpperArm, HumanoidBoneName.RightUpperArm],
  [VMDBoneNames.RightLowerArm, HumanoidBoneName.RightLowerArm],
  [VMDBoneNames.RightHand, HumanoidBoneName.RightHand],
  [VMDBoneNames.RightThumbProximal, HumanoidBoneName.RightThumbProximal],
  [VMDBoneNames.RightThumbIntermediate, HumanoidBoneName.RightThumbIntermediate],
  [VMDBoneNames.RightThumbDistal, HumanoidBoneName.RightThumbDistal],
  [VMDBoneNames.RightIndexProximal, HumanoidBoneName.RightIndexProximal],
  [VMDBoneNames.RightIndexIntermediate, HumanoidBoneName.RightIndexIntermediate],
  [VMDBoneNames.RightIndexDistal, HumanoidBoneName.RightIndexDistal],
  [VMDBoneNames.RightMiddleProximal, HumanoidBoneName.RightMiddleProximal],
  [VMDBoneNames.RightMiddleIntermediate, HumanoidBoneName.RightMiddleIntermediate],
  [VMDBoneNames.RightMiddleDistal, HumanoidBoneName.RightMiddleDistal],
  [VMDBoneNames.RightRingProximal, HumanoidBoneName.RightRingProximal],
  [VMDBoneNames.RightRingIntermediate, HumanoidBoneName.RightRingIntermediate],
  [VMDBoneNames.RightRingDistal, HumanoidBoneName.RightRingDistal],
  [VMDBoneNames.RightLittleProximal, HumanoidBoneName.RightLittleProximal],
  [VMDBoneNames.RightLittleIntermediate, HumanoidBoneName.RightLittleIntermediate],
  [VMDBoneNames.RightLittleDistal, HumanoidBoneName.RightLittleDistal],
  [VMDBoneNames.RightUpperLeg, HumanoidBoneName.RightUpperLeg],
  [VMDBoneNames.RightLowerLeg, HumanoidBoneName.RightLowerLeg],
  [VMDBoneNames.RightFoot, HumanoidBoneName.RightFoot],
  [VMDBoneNames.RightToes, HumanoidBoneName.RightToes],
]);

const VMDMorphNames = {
  Blink: "まばたき",
  BlinkR: "ウィンク",
  BlinkL: "ウィンク右",
  A: "あ",
  I: "い",
  U: "う",
  E: "え",
  O: "お",
};

const VMD_VRM_MORTH_MAP = new Map([
  [VMDMorphNames.Blink, BlendShapePresetName.Blink],
  [VMDMorphNames.BlinkL, BlendShapePresetName.BlinkL],
  [VMDMorphNames.BlinkR, BlendShapePresetName.BlinkR],
  [VMDMorphNames.A, BlendShapePresetName.A],
  [VMDMorphNames.I, BlendShapePresetName.I],
  [VMDMorphNames.U, BlendShapePresetName.U],
  [VMDMorphNames.E, BlendShapePresetName.E],
  [VMDMorphNames.O, BlendShapePresetName.O],
]);

const IK_OFFSET_INIT = new Map([
  [VMDBoneNames.Center, { x: 0, y: 1, z: 0, s: 11 }],
  [VMDBoneNames.LeftFootIK, { x: 1, y: 1, z: 0, s: 11, dx: false }],
  [VMDBoneNames.RightFootIK, { x: -1, y: 1, z: 0, s: 11, dx: false }],
  [VMDBoneNames.LeftToeIK, { x: 0, y: -1, z: -1, s: 11, oy: 4, dx: false, dz: false }],
  [VMDBoneNames.RightToeIK, { x: 0, y: -1, z: -1, s: 11, oy: 4, dx: false, dz: false }],
]);

const VMD_VRM_IK_MAP = new Map([
  [VMDBoneNames.LeftFootIK, HumanoidBoneName.LeftFoot],
  [VMDBoneNames.LeftToeIK, HumanoidBoneName.LeftToes],
  [VMDBoneNames.RightFootIK, HumanoidBoneName.RightFoot],
  [VMDBoneNames.RightToeIK, HumanoidBoneName.RightToes],
]);

const tempV3 = new THREE.Vector3();
const tempQ = new THREE.Quaternion();

const V3_ZERO = new THREE.Vector3();
const Q_IDENTITY = new THREE.Quaternion();
const Z_30_DEG_CW = new THREE.Quaternion().setFromAxisAngle(tempV3.set(0, 0, 1), 30 * THREE.MathUtils.DEG2RAD);
const Z_30_DEG_CCW = Z_30_DEG_CW.clone().invert();

const VMD_BONE_NAMES = new Set(VRM_VMD_BONE_MAP.keys());
Array.from(VMD_VRM_IK_MAP.keys()).forEach(VMD_BONE_NAMES.add, VMD_BONE_NAMES);
VMD_BONE_NAMES.add(VMDBoneNames.Root);
VMD_BONE_NAMES.add(VMDBoneNames.Center);

export default function convert(vmd, vrmOffset) {
  const morphs = convertMorphs(vmd);
  const motions = convertMotions(vmd, vrmOffset);

  return {
    duration: Math.max(morphs.duration, motions.duration),
    timelines: Array.prototype.concat(morphs.timelines, motions.timelines),
  };
}

const convertMorphs = ({ morphs }) => {
  sortFrames(morphs);
  const timelines = new Map();
  for (const { morphName, weight, frameNum } of morphs) {
    const name = VMD_VRM_MORTH_MAP.get(morphName);
    if (!name) continue;
    let timeline = timelines.get(name);
    if (!timeline)
      timelines.set(
        name,
        (timeline = {
          name,
          type: "morph",
          times: [],
          values: [],
        }),
      );
    const { times, values } = timeline;
    const time = frameNum / 30;
    const timeIndex = times.findIndex((t) => t === time);
    if (timeIndex < 0) {
      times.push(time);
      values.push(weight);
    } else {
      values[timeIndex] = Math.max(values[timeIndex], weight);
    }
  }
  return {
    timelines: Array.from(timelines.values()),
    duration: getLastFrameNum(morphs) / 30,
  };
};

const convertMotions = ({ motions }, vrmOffset) => {
  sortFrames(motions);
  const timelines = [];
  const boneTlMap = new Map();
  for (const name of VMD_BONE_NAMES) boneTlMap.set(name, []);
  for (const { boneName, frameNum, position, rotation } of motions)
    boneTlMap.get(boneName)?.push({
      boneName,
      frameNum,
      position: new THREE.Vector3().fromArray(position),
      rotation: new THREE.Quaternion().fromArray(rotation),
    });
  fixPositions(boneTlMap, vrmOffset);
  for (const [boneName, timeline] of boneTlMap) {
    let name = VRM_VMD_BONE_MAP.get(boneName);
    let isIK = false;
    if (!name) {
      isIK = VMD_VRM_IK_MAP.has(boneName);
      name = VMD_VRM_IK_MAP.get(boneName);
    }
    if (name) {
      const times = [];
      const positions = [];
      const rotations = [];
      for (const f of timeline) {
        const i = times.push(f.frameNum / 30) - 1;
        f.position.toArray(positions, i * 3);
        f.rotation.toArray(rotations, i * 4);
      }
      if (times.length) {
        timelines.push({
          name,
          type: "rotation",
          isIK,
          times,
          values: rotations,
        });
        if (isIK || name === HumanoidBoneName.Hips)
          timelines.push({
            name,
            type: "position",
            isIK,
            times,
            values: positions,
          });
      }
    }
  }
  return { timelines, duration: getLastFrameNum(motions) / 30 };
};

const fixPositions = (tls, vrmOffset = {}) => {
  const centerOffset = mergeTimelines(
    tls,
    VMDBoneNames.Center,
    offsetToTimeline(VMDBoneNames.Center, vrmOffset.hipsOffset),
  );
  const hipsTl = mergeTimelines(tls, VMDBoneNames.Root, centerOffset, VMDBoneNames.Hips);
  tls.set(
    VMDBoneNames.Spine,
    localizeTimeline(hipsTl, mergeTimelines(tls, VMDBoneNames.Root, centerOffset, VMDBoneNames.Hips)),
  );
  tls.set(VMDBoneNames.Hips, hipsTl);
  const leftFootOffset = offsetToTimeline(VMDBoneNames.LeftFootIK, vrmOffset.leftFootOffset);
  const rightFootOffset = offsetToTimeline(VMDBoneNames.RightFootIK, vrmOffset.rightFootOffset);
  if (tls.has(VMDBoneNames.LeftToeIK))
    tls.set(
      VMDBoneNames.LeftToeIK,
      mergeTimelines(
        tls,
        VMDBoneNames.Root,
        leftFootOffset,
        VMDBoneNames.LeftFootIK,
        offsetToTimeline(VMDBoneNames.RightToeIK, vrmOffset.leftToeOffset),
        VMDBoneNames.LeftToeIK,
      ),
    );
  if (tls.has(VMDBoneNames.RightToeIK))
    tls.set(
      VMDBoneNames.RightToeIK,
      mergeTimelines(
        tls,
        VMDBoneNames.Root,
        rightFootOffset,
        VMDBoneNames.RightFootIK,
        offsetToTimeline(VMDBoneNames.RightToeIK, vrmOffset.rightToeOffset),
        VMDBoneNames.RightToeIK,
      ),
    );
  if (tls.has(VMDBoneNames.LeftFootIK))
    tls.set(VMDBoneNames.LeftFootIK, mergeTimelines(tls, VMDBoneNames.Root, leftFootOffset, VMDBoneNames.LeftFootIK));
  if (tls.has(VMDBoneNames.RightFootIK))
    tls.set(
      VMDBoneNames.RightFootIK,
      mergeTimelines(tls, VMDBoneNames.Root, rightFootOffset, VMDBoneNames.RightFootIK),
    );
  tls.delete(VMDBoneNames.Center);
  tls.delete(VMDBoneNames.Root);
  for (const tl of tls.values())
    for (const f of tl) {
      f.position.x *= -1;
      f.rotation.x *= -1;
      f.rotation.w *= -1;
      switch (f.boneName) {
        case VMDBoneNames.LeftUpperArm:
          f.rotation.multiply(Z_30_DEG_CW);
          break;
        case VMDBoneNames.RightUpperArm:
          f.rotation.multiply(Z_30_DEG_CCW);
          break;
        case VMDBoneNames.LeftLowerArm:
        case VMDBoneNames.LeftHand:
        case VMDBoneNames.LeftThumbProximal:
        case VMDBoneNames.LeftThumbIntermediate:
        case VMDBoneNames.LeftThumbDistal:
        case VMDBoneNames.LeftIndexProximal:
        case VMDBoneNames.LeftIndexIntermediate:
        case VMDBoneNames.LeftIndexDistal:
        case VMDBoneNames.LeftMiddleProximal:
        case VMDBoneNames.LeftMiddleIntermediate:
        case VMDBoneNames.LeftMiddleDistal:
        case VMDBoneNames.LeftRingProximal:
        case VMDBoneNames.LeftRingIntermediate:
        case VMDBoneNames.LeftRingDistal:
        case VMDBoneNames.LeftLittleProximal:
        case VMDBoneNames.LeftLittleIntermediate:
        case VMDBoneNames.LeftLittleDistal:
          f.rotation.premultiply(Z_30_DEG_CCW).multiply(Z_30_DEG_CW);
          break;
        case VMDBoneNames.RightLowerArm:
        case VMDBoneNames.RightHand:
        case VMDBoneNames.RightThumbProximal:
        case VMDBoneNames.RightThumbIntermediate:
        case VMDBoneNames.RightThumbDistal:
        case VMDBoneNames.RightIndexProximal:
        case VMDBoneNames.RightIndexIntermediate:
        case VMDBoneNames.RightIndexDistal:
        case VMDBoneNames.RightMiddleProximal:
        case VMDBoneNames.RightMiddleIntermediate:
        case VMDBoneNames.RightMiddleDistal:
        case VMDBoneNames.RightRingProximal:
        case VMDBoneNames.RightRingIntermediate:
        case VMDBoneNames.RightRingDistal:
        case VMDBoneNames.RightLittleProximal:
        case VMDBoneNames.RightLittleIntermediate:
        case VMDBoneNames.RightLittleDistal:
          f.rotation.premultiply(Z_30_DEG_CW).multiply(Z_30_DEG_CCW);
          break;
        default:
        // do nothing
      }
      f.position.multiplyScalar(0.1);
    }
};

const offsetToTimeline = (boneName, rawPos) => {
  const init = IK_OFFSET_INIT.get(boneName);
  return [
    {
      boneName: `${boneName}Offset`,
      frameNum: 0,
      position: rawPos
        ? new THREE.Vector3(
            init.dx || isNaN(rawPos[0])
              ? init.x
              : rawPos[0] * (init.sx ?? 1) * (init.s ?? 1) + (init.ox ?? 0) + (init.o ?? 0),
            init.dy || isNaN(rawPos[1])
              ? init.y
              : rawPos[1] * (init.sy ?? 1) * (init.s ?? 1) + (init.oy ?? 0) + (init.o ?? 0),
            init.dz || isNaN(rawPos[2])
              ? init.z
              : rawPos[2] * (init.sz ?? 1) * (init.s ?? 1) + (init.oz ?? 0) + (init.o ?? 0),
          )
        : new THREE.Vector3(init.x, init.y, init.z),
      rotation: Q_IDENTITY,
    },
  ];
};

const localizeTimeline = (...tls) => {
  const { boneName } = tls[1][0];
  const results = [];
  let isChild = false;
  for (const tl of tls) {
    for (const f of tl) {
      const { frameNum } = f;
      if (frameNum < results.length && results[frameNum] != null) continue;
      const fp = isChild ? lerpKeyframe(tls[0], frameNum) : f;
      const fc = isChild ? f : lerpKeyframe(tls[1], frameNum);
      results[frameNum] = {
        boneName,
        frameNum,
        position: (fc.isNew ? fc.position : fc.position.clone()).sub(fp.position),
        rotation: (fc.isNew ? fc.rotation : fc.rotation.clone()).multiply(tempQ.copy(fp.rotation).invert()),
      };
    }
    isChild = true;
  }
  return results.filter((r) => !!r);
};

const lerpKeyframe = (tl, frameNum) => {
  if (!tl)
    return {
      boneName: "",
      frameNum,
      position: V3_ZERO,
      rotation: Q_IDENTITY,
    };
  const nextIndex = tl.findIndex((keyframe) => frameNum < keyframe.frameNum);
  switch (nextIndex) {
    case 0:
      return tl[0];
    case -1:
      return tl[tl.length - 1];
    case frameNum:
      return tl[frameNum];
    default:
  }
  const prevFrame = tl[nextIndex - 1];
  const nextFrame = tl[nextIndex];
  const prevFrameNum = prevFrame.frameNum;
  const nextFrameNum = nextFrame.frameNum;
  const v = (frameNum - prevFrameNum) / (nextFrameNum - prevFrameNum);
  return {
    boneName: tl[0].boneName,
    frameNum,
    position: prevFrame.position.clone().lerp(nextFrame.position, v),
    rotation: prevFrame.rotation.clone().slerp(nextFrame.rotation, v),
    isNew: true,
  };
};

const mergeTimelines = (tlsMap, ...tlsKey) => {
  const tls = tlsKey.map(resolveTimeline(tlsMap)).filter((t) => !!t);
  let boneName;
  const last = tlsKey[tlsKey.length - 1];
  if (typeof last === "string") boneName = last;
  else boneName = tls[tls.length - 1][0]?.boneName ?? "";
  const results = [];
  for (const tl of tls)
    for (const f of tl) {
      const { frameNum } = f;
      if (frameNum < results.length && results[frameNum] != null) continue;
      const position = new THREE.Vector3();
      const rotation = new THREE.Quaternion();
      for (const otl of tls) {
        if (!otl.length) continue;
        const f2 = otl[0].boneName === f.boneName ? f : lerpKeyframe(otl, frameNum);
        position.add(tempV3.copy(f2.position).applyQuaternion(rotation));
        rotation.multiply(f2.rotation);
      }
      results[frameNum] = { boneName, frameNum, position, rotation };
    }
  return results.filter((r) => !!r);
};

const resolveTimeline = (map) => (key) => Array.isArray(key) ? key : map.get(key);

const sortFrames = (f) => {
  return (Array.isArray(f) ? f : Array.from(f)).sort((a, b) => a.frameNum - b.frameNum);
};

const getLastFrameNum = (f) => (f.length ? f[f.length - 1].frameNum : 0);
