// src/three/characterControls.js
import * as THREE from "three";
import { A, D, DIRECTIONS, S, W } from "./utils";

export class CharacterControls {
  constructor(
    model,
    mixer,
    animationsMap,
    orbitControl,
    camera,
    currentAction
  ) {
    this.model = model;
    this.mixer = mixer;
    this.animationsMap = animationsMap;
    this.orbitControl = orbitControl;
    this.camera = camera;

    this.toggleRun = true;
    this.currentAction = currentAction;

    // temp data
    this.walkDirection = new THREE.Vector3();
    this.rotateAngle = new THREE.Vector3(0, 1, 0);
    this.rotateQuarternion = new THREE.Quaternion();
    this.cameraTarget = new THREE.Vector3();

    // constants
    this.fadeDuration = 0.2;
    this.runVelocity = 5;
    this.walkVelocity = 2;

    // play default
    const action = this.animationsMap.get(currentAction);
    if (action) action.play();
  }

  switchRunToggle() {
    this.toggleRun = !this.toggleRun;
  }

  // ✅ Method mới: Chỉ update animation + rotation (không move)
  updateAnimationOnly(delta, keysPressed) {
    // ✅ BLOCK: Nếu đang play Turning, KHÔNG cho phép chuyển animation
    if (this.currentAction === "Turning") {
      // Chỉ update mixer để animation chạy, không làm gì khác
      const positionBeforeUpdate = this.model.position.clone();
      this.mixer.update(delta);
      this.model.position.copy(positionBeforeUpdate);
      return; // ✅ RETURN sớm để không fade sang animation khác
    }

    const directionPressed = DIRECTIONS.some(
      (key) => keysPressed[key] === true
    );

    // Chọn animation
    let play = "Standing";
    if (directionPressed) {
      play = this.toggleRun ? "Running" : "Walking";
    }

    // Fade animation
    if (this.currentAction !== play) {
      const toPlay = this.animationsMap.get(play);
      const current = this.animationsMap.get(this.currentAction);

      if (current) current.fadeOut(this.fadeDuration);
      if (toPlay) {
        toPlay.reset().fadeIn(this.fadeDuration).play();
      } else {
        console.warn(`Animation "${play}" not found!`);
      }

      this.currentAction = play;
    }

    // Lưu vị trí trước khi mixer update (tránh root motion)
    const positionBeforeUpdate = this.model.position.clone();

    this.mixer.update(delta);

    // Khôi phục vị trí (vì physics đã xử lý movement)
    this.model.position.copy(positionBeforeUpdate);

    // ✅ Chỉ xoay nhân vật theo hướng di chuyển
    if (directionPressed) {
      const angleYCameraDirection = Math.atan2(
        this.camera.position.x - this.model.position.x,
        this.camera.position.z - this.model.position.z
      );

      const directionOffset = this.directionOffset(keysPressed);

      this.rotateQuarternion.setFromAxisAngle(
        this.rotateAngle,
        angleYCameraDirection + directionOffset + Math.PI
      );

      // Xoay mượt
      this.model.quaternion.rotateTowards(this.rotateQuarternion, 0.2);
    }
  }

  // ✅ Method cũ (giữ lại để tương thích, nhưng không dùng nữa)
  update(delta, keysPressed) {
    const directionPressed = DIRECTIONS.some(
      (key) => keysPressed[key] === true
    );

    let play = "Standing";
    if (directionPressed) {
      play = this.toggleRun ? "Running" : "Walking";
    }

    if (this.currentAction !== play) {
      const toPlay = this.animationsMap.get(play);
      const current = this.animationsMap.get(this.currentAction);

      if (current) current.fadeOut(this.fadeDuration);
      if (toPlay) {
        toPlay.reset().fadeIn(this.fadeDuration).play();
      } else {
        console.warn(`Animation "${play}" not found!`);
      }

      this.currentAction = play;
    }

    const positionBeforeUpdate = this.model.position.clone();

    this.mixer.update(delta);

    this.model.position.copy(positionBeforeUpdate);

    if (directionPressed) {
      const angleYCameraDirection = Math.atan2(
        this.camera.position.x - this.model.position.x,
        this.camera.position.z - this.model.position.z
      );

      const directionOffset = this.directionOffset(keysPressed);

      this.rotateQuarternion.setFromAxisAngle(
        this.rotateAngle,
        angleYCameraDirection + directionOffset + Math.PI
      );
      this.model.quaternion.rotateTowards(this.rotateQuarternion, 0.2);

      this.camera.getWorldDirection(this.walkDirection);
      this.walkDirection.y = 0;
      this.walkDirection.normalize();
      this.walkDirection.applyAxisAngle(this.rotateAngle, directionOffset);

      const velocity = this.toggleRun ? this.runVelocity : this.walkVelocity;

      const moveX = this.walkDirection.x * velocity * delta;
      const moveZ = this.walkDirection.z * velocity * delta;

      this.model.position.x += moveX;
      this.model.position.z += moveZ;

      this.updateCameraTarget(moveX, moveZ);
    }
  }

  updateCameraTarget(moveX, moveZ) {
    this.camera.position.x += moveX;
    this.camera.position.z += moveZ;

    this.cameraTarget.x = this.model.position.x;
    this.cameraTarget.y = this.model.position.y + 1;
    this.cameraTarget.z = this.model.position.z;

    this.orbitControl.target = this.cameraTarget;
  }

  directionOffset(keysPressed) {
    let directionOffset = 0; // w

    if (keysPressed[W]) {
      if (keysPressed[A]) directionOffset = Math.PI / 4;
      else if (keysPressed[D]) directionOffset = -Math.PI / 4;
    } else if (keysPressed[S]) {
      if (keysPressed[A]) directionOffset = Math.PI / 4 + Math.PI / 2;
      else if (keysPressed[D]) directionOffset = -Math.PI / 4 - Math.PI / 2;
      else directionOffset = Math.PI;
    } else if (keysPressed[A]) directionOffset = Math.PI / 2;
    else if (keysPressed[D]) directionOffset = -Math.PI / 2;

    return directionOffset;
  }
}
