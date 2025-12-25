// src/three/loadCharacter.js
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function loadCharacter(scene, url) {
  const loader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => {
        const model = gltf.scene;

        model.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
          }
        });

        scene.add(model);

        const mixer = new THREE.AnimationMixer(model);

        const actions = new Map();
        gltf.animations.forEach((clip) => {
          // ✅ Clone clip để không ảnh hưởng animation gốc
          const clonedClip = clip.clone();

          // ✅ CHỈ FILTER position tracks cho Standing, Walking, Running
          // GIỮ NGUYÊN Turning để có root motion
          if (
            clip.name === "Standing" ||
            clip.name === "Walking" ||
            clip.name === "Running"
          ) {
            clonedClip.tracks = clonedClip.tracks.filter((track) => {
              // Bỏ position tracks để tránh root motion không mong muốn
              return !track.name.includes(".position");
            });
          } else if (clip.name === "Turning") {
          } else {
            // Các animation khác cũng filter position
            clonedClip.tracks = clonedClip.tracks.filter((track) => {
              return !track.name.includes(".position");
            });
          }

          actions.set(clip.name, mixer.clipAction(clonedClip));
        });

        resolve({ model, mixer, actions });
      },
      undefined,
      reject
    );
  });
}
