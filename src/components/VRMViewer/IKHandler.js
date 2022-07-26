import * as THREE from "three";
import { VRMSchema } from "@pixiv/three-vrm";

const PI2 = Math.PI * 2;

export function clampByRadian(v, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY) {
  const hasMin = Number.isFinite(min);
  const hasMax = Number.isFinite(max);
  if (hasMin && hasMax && min === max) return min;
  if (hasMin) min = THREE.MathUtils.euclideanModulo(min, PI2);
  if (hasMax) max = THREE.MathUtils.euclideanModulo(max, PI2);
  v = THREE.MathUtils.euclideanModulo(v, PI2);
  if (hasMin && hasMax && min >= max) {
    max += PI2;
    if (v < Math.PI) v += PI2;
  }
  if (hasMax && v > max) v = max;
  else if (hasMin && v < min) v = min;
  return THREE.MathUtils.euclideanModulo(v, PI2);
}

export function clampVector3ByRadian(v, min, max) {
  return v.set(
    clampByRadian(v.x, min?.x, max?.x),
    clampByRadian(v.y, min?.y, max?.y),
    clampByRadian(v.z, min?.z, max?.z),
  );
}

const BoneNames = VRMSchema.HumanoidBoneName;
const boneNameOrder = [
  BoneNames.Chest,
  BoneNames.Head,
  BoneNames.Hips,
  BoneNames.Jaw,
  BoneNames.LeftEye,
  BoneNames.LeftFoot,
  BoneNames.LeftHand,
  BoneNames.LeftIndexDistal,
  BoneNames.LeftIndexIntermediate,
  BoneNames.LeftIndexProximal,
  BoneNames.LeftLittleDistal,
  BoneNames.LeftLittleIntermediate,
  BoneNames.LeftLittleProximal,
  BoneNames.LeftLowerArm,
  BoneNames.LeftLowerLeg,
  BoneNames.LeftMiddleDistal,
  BoneNames.LeftMiddleIntermediate,
  BoneNames.LeftMiddleProximal,
  BoneNames.LeftRingDistal,
  BoneNames.LeftRingIntermediate,
  BoneNames.LeftRingProximal,
  BoneNames.LeftShoulder,
  BoneNames.LeftThumbDistal,
  BoneNames.LeftThumbIntermediate,
  BoneNames.LeftThumbProximal,
  BoneNames.LeftToes,
  BoneNames.LeftUpperArm,
  BoneNames.LeftUpperLeg,
  BoneNames.Neck,
  BoneNames.RightEye,
  BoneNames.RightFoot,
  BoneNames.RightHand,
  BoneNames.RightIndexDistal,
  BoneNames.RightIndexIntermediate,
  BoneNames.RightIndexProximal,
  BoneNames.RightLittleDistal,
  BoneNames.RightLittleIntermediate,
  BoneNames.RightLittleProximal,
  BoneNames.RightLowerArm,
  BoneNames.RightLowerLeg,
  BoneNames.RightMiddleDistal,
  BoneNames.RightMiddleIntermediate,
  BoneNames.RightMiddleProximal,
  BoneNames.RightRingDistal,
  BoneNames.RightRingIntermediate,
  BoneNames.RightRingProximal,
  BoneNames.RightShoulder,
  BoneNames.RightThumbDistal,
  BoneNames.RightThumbIntermediate,
  BoneNames.RightThumbProximal,
  BoneNames.RightToes,
  BoneNames.RightUpperArm,
  BoneNames.RightUpperLeg,
  BoneNames.Spine,
  BoneNames.UpperChest,
];
const boneMap = new Map(boneNameOrder.map((b, i) => [b, i]));
const quaternion = new THREE.Quaternion();
const targetPos = new THREE.Vector3();
const targetVec = new THREE.Vector3();
const effectorPos = new THREE.Vector3();
const effectorVec = new THREE.Vector3();
const linkPos = new THREE.Vector3();
const linkScale = new THREE.Vector3();
const axis = new THREE.Vector3();

export default class IKHandler {
  static cache = new WeakMap();

  static get(model) {
    let handler = this.cache.get(model);
    if (!handler) {
      handler = new IKHandler(model);
      this.cache.set(model, handler);
    }
    return handler;
  }

  targets = new Map();
  iks = new Map();
  vector = new THREE.Vector3();
  bones;
  root;

  constructor(model) {
    const { humanoid } = model;
    if (!humanoid) throw new Error("VRM does not contains humanoid");
    this.bones = boneNameOrder.map(humanoid.getBoneNode, humanoid);
    this.root = this.bones[boneMap.get(BoneNames.Hips)]?.parent ?? this.model.scene;
    const leftFootId = boneMap.get(BoneNames.LeftFoot);
    this.iks.set(leftFootId, {
      effector: leftFootId,
      target: leftFootId,
      iteration: 40,
      maxAngle: 2,
      links: [
        {
          enabled: true,
          index: boneMap.get(BoneNames.LeftLowerLeg),
          rotationMin: new THREE.Vector3(-180, 0, 0).multiplyScalar(THREE.MathUtils.DEG2RAD),
          rotationMax: new THREE.Vector3(0, 0, 0),
        },
        {
          enabled: true,
          index: boneMap.get(BoneNames.LeftUpperLeg),
        },
      ],
    });
    const rightFootId = boneMap.get(BoneNames.RightFoot);
    this.iks.set(rightFootId, {
      effector: rightFootId,
      target: rightFootId,
      iteration: 40,
      maxAngle: 2,
      links: [
        {
          enabled: true,
          index: boneMap.get(BoneNames.RightLowerLeg),
          rotationMin: new THREE.Vector3(-180, 0, 0).multiplyScalar(THREE.MathUtils.DEG2RAD),
          rotationMax: new THREE.Vector3(0, 0, 0),
        },
        {
          enabled: true,
          index: boneMap.get(BoneNames.RightUpperLeg),
        },
      ],
    });
    const leftToeId = boneMap.get(BoneNames.LeftToes);
    this.iks.set(leftToeId, {
      effector: leftToeId,
      target: leftToeId,
      iteration: 3,
      maxAngle: 4,
      links: [
        {
          enabled: false,
          index: leftFootId,
        },
      ],
    });
    const rightToeId = boneMap.get(BoneNames.RightToes);
    this.iks.set(rightToeId, {
      effector: rightToeId,
      target: rightToeId,
      iteration: 3,
      maxAngle: 4,
      links: [
        {
          enabled: false,
          index: rightFootId,
        },
      ],
    });
  }

  getAndEnableIK(boneName) {
    return this.getTarget(boneName, true);
  }

  getTarget(boneName, enable) {
    const boneIndex = boneMap.get(boneName);
    if (boneIndex == null) return;
    let target = this.targets.get(boneIndex);
    const ik = this.iks.get(boneIndex);
    if (enable) for (const link of ik.links) link.enabled = true;
    if (!target) {
      target = new THREE.Object3D();
      target.name = `${boneName}IK`;
      this.root.add(target);
      this.targets.set(boneIndex, target);
    }
    return target;
  }

  disableAll() {
    for (const { links } of this.iks.values()) for (const link of links) link.enabled = false;
  }

  update() {
    for (const ik of this.iks.values()) {
      const effector = this.bones[ik.effector];
      const target = this.targets.get(ik.target);
      if (!effector || !target) continue;

      // don't use getWorldPosition() here for the performance
      // because it calls updateMatrixWorld( true ) inside.
      targetPos.setFromMatrixPosition(target.matrixWorld);

      const iteration = ik.iteration ?? 1;
      for (let j = 0; j < iteration; j++) {
        let rotated = false;
        for (const { enabled, index, rotationMin, rotationMax } of ik.links) {
          if (!enabled) break;
          const link = this.bones[index];

          // don't use getWorldPosition/Quaternion() here for the performance
          // because they call updateMatrixWorld( true ) inside.
          link.matrixWorld.decompose(linkPos, quaternion, linkScale);
          quaternion.invert();
          effectorPos.setFromMatrixPosition(effector.matrixWorld);

          // work in link world
          effectorVec.subVectors(effectorPos, linkPos).applyQuaternion(quaternion).normalize();

          targetVec.subVectors(targetPos, linkPos).applyQuaternion(quaternion).normalize();

          let angle = targetVec.dot(effectorVec);

          if (angle > 1) angle = 1;
          else if (angle < -1) angle = -1;

          angle = Math.acos(angle);

          if (angle < 1e-5) continue;

          if (ik.minAngle && angle < ik.minAngle) angle = ik.minAngle;
          if (ik.maxAngle && angle > ik.maxAngle) angle = ik.maxAngle;

          axis.crossVectors(effectorVec, targetVec).normalize();

          link.quaternion.multiply(quaternion.setFromAxisAngle(axis, angle));
          clampVector3ByRadian(link.rotation, rotationMin, rotationMax);
          link.updateMatrixWorld(true);

          rotated = true;
        }

        if (!rotated) break;
      }
    }
  }
}
