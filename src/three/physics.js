// src/three/physics.js
import * as THREE from "three";
import { Octree } from "three/examples/jsm/math/Octree";
import { Capsule } from "three/examples/jsm/math/Capsule";

export function createPhysics({
  colliderMesh,
  capsuleRadius = 0.35,
  capsuleHeight = 1.0,
  gravity = 30,
}) {
  // ✅ Kiểm tra colliderMesh
  const worldOctree = new Octree();

  // ✅ Đảm bảo fromGraphNode nhận đúng geometry
  try {
    worldOctree.fromGraphNode(colliderMesh);
    // console.log("Octree created successfully");
  } catch (error) {
    console.error("Error creating Octree:", error);
  }

  // ✅ Tạo capsule với vị trí ban đầu hợp lý (cao hơn mặt đất)
  const playerCollider = new Capsule(
    new THREE.Vector3(0, capsuleRadius + 2, 0), // +2 để spawn cao hơn
    new THREE.Vector3(0, capsuleHeight + 2, 0),
    capsuleRadius
  );

  const playerVelocity = new THREE.Vector3();
  let playerOnFloor = false;

  function setPlayerPosition(pos) {
    playerCollider.start.copy(pos).add(new THREE.Vector3(0, capsuleRadius, 0));
    playerCollider.end.copy(pos).add(new THREE.Vector3(0, capsuleHeight, 0));
  }

  function collidePlayer() {
    const result = worldOctree.capsuleIntersect(playerCollider);
    playerOnFloor = false;

    if (result) {
      playerOnFloor = result.normal.y > 0;

      // ✅ Thêm margin nhỏ để tránh xuyên qua
      const margin = 0.01;
      playerCollider.translate(
        result.normal.multiplyScalar(result.depth + margin)
      );

      if (playerOnFloor) {
        if (playerVelocity.y < 0) {
          playerVelocity.y = 0;
        }
      } else {
        playerVelocity.addScaledVector(
          result.normal,
          -result.normal.dot(playerVelocity)
        );
      }
    }

    return result;
  }

  function step(delta) {
    // ✅ Giới hạn delta để tránh frame spike
    const clampedDelta = Math.min(delta, 0.1);

    // ✅ Chia nhỏ thành nhiều substeps nếu delta lớn
    const substeps = Math.ceil(clampedDelta / 0.016); // ~60fps
    const subDelta = clampedDelta / substeps;

    for (let i = 0; i < substeps; i++) {
      // Áp dụng trọng lực
      if (!playerOnFloor) {
        playerVelocity.y -= gravity * subDelta;
      }

      // Di chuyển capsule theo vận tốc
      const deltaPos = playerVelocity.clone().multiplyScalar(subDelta);
      playerCollider.translate(deltaPos);

      // Giải quyết va chạm
      collidePlayer();
    }

    // Tính vị trí chân nhân vật
    const playerPos = playerCollider.start.clone();
    playerPos.y -= capsuleRadius;

    return { playerPos, playerOnFloor, playerVelocity };
  }

  return {
    worldOctree,
    playerCollider,
    playerVelocity,
    setPlayerPosition,
    step,
    get playerOnFloor() {
      return playerOnFloor;
    },
  };
}
