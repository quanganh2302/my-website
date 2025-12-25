// src/three/loop.js
import * as THREE from "three";

export function startLoop({ renderer, scene, camera, orbitControls, state }) {
  const clock = new THREE.Clock();
  let rafId = 0;

  function animate() {
    const delta = clock.getDelta();

    if (state.characterControls && state.keysPressed) {
      state.characterControls.update(delta, state.keysPressed);
    }

    orbitControls.update();
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(animate);
  }

  animate();
  return () => cancelAnimationFrame(rafId);
}
