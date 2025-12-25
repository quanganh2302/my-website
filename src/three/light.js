// src/three/light.js
import * as THREE from "three";

export function light(scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));

  const dirLight = new THREE.DirectionalLight(0xffffff, 5);
  dirLight.position.set(-60, 100, 100);
  dirLight.castShadow = true;

  const s = 30; // <= chỉnh giá trị này theo kích thước map/town của bạn
  dirLight.shadow.camera.left = -s;
  dirLight.shadow.camera.right = s;
  dirLight.shadow.camera.top = s;
  dirLight.shadow.camera.bottom = -s;

  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 180;
  dirLight.shadow.mapSize.width = 4096;
  dirLight.shadow.mapSize.height = 4096;

  dirLight.shadow.camera.updateProjectionMatrix();

  // Bias để giảm răng cưa/acne
  dirLight.shadow.bias = -0.0001; // thử: -0.0001 -> -0.001
  dirLight.shadow.normalBias = 0.02;

  scene.add(dirLight);
  // scene.add(new THREE.CameraHelper(dirLight.shadow.camera))
}
