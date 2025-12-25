// src/three/resize.js
export function createResizeHandler({ container, camera, renderer }) {
  return function onWindowResize() {
    const w = container.clientWidth;
    const h = container.clientHeight;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
}
