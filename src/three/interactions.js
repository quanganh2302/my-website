// src/three/interactions.js
import * as THREE from "three";

/**
 * ✅ CHỈ XỬ LÝ CLICK CHO NB_ OBJECTS
 */
export function setupPrefixInteractions({
  renderer,
  camera,
  root,
  onNB,
  highlight = false,
}) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  let pointerDown = false;
  let isDragging = false;

  let hovered = null;
  let hoveredOriginal = null;

  const interactables = [];
  root.traverse((o) => {
    if (!o?.name) return;
    if (o.name.startsWith("NB_")) {
      interactables.push(o);
    }
  });

  function setMouseFromEvent(e) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }

  function pick() {
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(interactables, true);
    if (hits.length === 0) return null;

    let obj = hits[0].object;
    while (obj && !obj.name?.startsWith("NB_")) {
      obj = obj.parent;
    }
    if (!obj) return null;

    return { obj, name: obj.name, hit: hits[0] };
  }

  function normalizeName(name) {
    return name.replace(/_\d+$/, "");
  }

  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    pointerDown = true;
    isDragging = false;
  };

  const onPointerMove = (e) => {
    setMouseFromEvent(e);
    if (pointerDown) isDragging = true;
  };

  const onPointerUp = (e) => {
    if (e.button !== 0) return;
    pointerDown = false;
    if (isDragging) return;

    const picked = pick();
    if (!picked) return;

    const { name, obj, hit } = picked;
    const cleanName = normalizeName(name);

    console.log("Clicked NB_:", cleanName);
    onNB?.(cleanName, obj, hit);
  };

  renderer.domElement.addEventListener("pointerdown", onPointerDown);
  renderer.domElement.addEventListener("pointermove", onPointerMove);
  renderer.domElement.addEventListener("pointerup", onPointerUp);

  function updateHover() {
    const picked = pick();
    const obj = picked?.obj ?? null;

    renderer.domElement.style.cursor = obj ? "pointer" : "default";

    if (!highlight) return;

    if (obj !== hovered) {
      if (hovered && hovered.material?.color && hoveredOriginal) {
        hovered.material.color.copy(hoveredOriginal);
      }

      hovered = obj;
      hoveredOriginal = null;
    }
  }

  function dispose() {
    renderer.domElement.removeEventListener("pointerdown", onPointerDown);
    renderer.domElement.removeEventListener("pointermove", onPointerMove);
    renderer.domElement.removeEventListener("pointerup", onPointerUp);

    if (hovered && hovered.material?.color && hoveredOriginal) {
      hovered.material.color.copy(hoveredOriginal);
    }
    renderer.domElement.style.cursor = "default";
  }

  return { updateHover, dispose };
}

/**
 * ✅ PROXIMITY TRIGGERS CHO D_ OBJECTS
 * Đơn giản: trigger một lần, pushback tự động thoát zone
 */
export function setupProximityTriggers({
  root,
  characterModel,
  onTrigger, // (name, obj, triggerPos) => void
  triggerDistance = 1,
}) {
  const triggers = [];

  function normalizeName(name) {
    return name.replace(/_\d+$/, "");
  }

  // Collect D_ objects
  root.traverse((o) => {
    if (!o?.name) return;
    if (o.name.startsWith("D_")) {
      const worldPos = new THREE.Vector3();
      o.getWorldPosition(worldPos);

      triggers.push({
        name: normalizeName(o.name),
        object: o,
        position: worldPos,
      });
    }
  });

  function checkProximity() {
    if (!characterModel) return null;

    const charPos = characterModel.position;

    for (const trigger of triggers) {
      const distance = charPos.distanceTo(trigger.position);

      if (distance < triggerDistance) {
        // ✅ Return trigger info để xử lý pushback
        return {
          name: trigger.name,
          object: trigger.object,
          position: trigger.position.clone(),
          distance,
        };
      }
    }

    return null;
  }

  return {
    checkProximity,
    triggers,
  };
}

