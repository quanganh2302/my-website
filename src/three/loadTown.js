// src/three/loadTown.js
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function loadTown(scene, url) {
  const loader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => {
        const model = gltf.scene;

        // Bật shadow hợp lý
        model.traverse((obj) => {
          if (obj.isMesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;
          }
        });

        scene.add(model);

        // model.traverse((obj) => {
        //   if (obj.name) {
        //     console.log(`- ${obj.name}`, {
        //       type: obj.type,
        //       isMesh: obj.isMesh,
        //       hasGeometry: !!obj.geometry,
        //       position: obj.position,
        //       children: obj.children.length,
        //     });
        //   }
        // });

        resolve(model);
      },
      undefined,
      reject
    );
  });
}
