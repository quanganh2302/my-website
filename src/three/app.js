// src/three/app.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { light } from "./light";
import { loadTown } from "./loadTown";
import { loadCharacter } from "./loadCharacter";
import { createResizeHandler } from "./resize";

import { KeyDisplay } from "./utils";
import { CharacterControls } from "./characterControls";

import townUrl from "../assets/3d/portfolio.glb?url";
import redUrl from "../assets/3d/Red.glb?url";

import {
  setupPrefixInteractions,
  setupProximityTriggers,
} from "./interactions";
import { createPhysics } from "./physics";
import { PokemonManager } from "./pokemons";

// ✨ Update: Nhận callbacks từ React
export function initThree(container, callbacks = {}) {
  const { onShowPopup } = callbacks; // ✨ Popup callback từ React

  // SCENE
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa8def0);

  // CAMERA
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2, 6);

  // RENDERER
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  // ORBIT CONTROLS
  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enableDamping = true;
  orbitControls.minDistance = 2;
  orbitControls.maxDistance = 100;
  orbitControls.enablePan = false;
  orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;
  orbitControls.enableZoom = true;
  orbitControls.zoomSpeed = 1.0;
  orbitControls.update();

  // LIGHTS
  light(scene);

  // STATE
  const state = {
    town: null,
    characterControls: null,
    defaultView: null,
    clickInteractions: null,
    proximityTriggers: null,
    pokemonManager: null,
    physics: null,
    collider: null,
    spawnPosition: new THREE.Vector3(0, 2, 0),

    turningState: null,
    lastTriggerTime: 0,
    lastPokemonTriggerTime: 0,
  };

  // LOAD TOWN
  loadTown(scene, townUrl).then((town) => {
    state.town = town;

    const groundCollider = town.getObjectByName("Ground_Collider");

    if (!groundCollider) {
      console.warn("Không tìm thấy Ground_Collider trong GLB");
    } else {
      groundCollider.visible = false;

      state.physics = createPhysics({
        colliderMesh: groundCollider,
        capsuleRadius: 0.4,
        capsuleHeight: 1.2,
        gravity: 30,
      });
    }

    // Setup NB_ click interactions
    state.clickInteractions = setupPrefixInteractions({
      renderer,
      camera,
      root: town,
      onNB: (name) => {
        console.log("🖱️ Clicked NB_ object:", name);
      },
      highlight: true,
    });
  });

  // --- INPUT (KeyDisplay + keysPressed) ---
  const keysPressed = {};
  const keyDisplay = new KeyDisplay();

  const onKeyDown = (event) => {
    keyDisplay.down(event.key);

    const isTurning = state.turningState?.active;
    const isWASD = ["w", "a", "s", "d"].includes(event.key.toLowerCase());

    if (isTurning && isWASD) {
      console.log(`🚫 WASD blocked during turning: ${event.key}`);
      return;
    }

    // R: Reset
    if (event.key.toLowerCase() === "r") {
      if (state.characterControls && state.physics) {
        console.log("Resetting character position...");

        state.characterControls.model.position.copy(state.spawnPosition);
        state.physics.setPlayerPosition(state.spawnPosition);
        state.physics.playerVelocity.set(0, 0, 0);
        state.turningState = null;
        state.lastTriggerTime = 0;
        state.lastPokemonTriggerTime = 0;

        const model = state.characterControls.model;
        const distance = 4;
        const height = 3;
        const targetHeight = 1;

        const forward = new THREE.Vector3();
        model.getWorldDirection(forward);

        const camPos = model.position
          .clone()
          .add(forward.clone().multiplyScalar(-distance))
          .add(new THREE.Vector3(0, height, 0));

        const target = model.position
          .clone()
          .add(new THREE.Vector3(0, targetHeight, 0));

        camera.position.copy(camPos);
        orbitControls.target.copy(target);
        orbitControls.update();
      }
      return;
    }

    // Shift: toggle run/walk
    if (event.shiftKey && state.characterControls) {
      state.characterControls.switchRunToggle();
      return;
    }

    keysPressed[event.key.toLowerCase()] = true;
  };

  const onKeyUp = (event) => {
    keyDisplay.up(event.key);

    const isTurning = state.turningState?.active;
    const isWASD = ["w", "a", "s", "d"].includes(event.key.toLowerCase());

    if (isTurning && isWASD) {
      return;
    }

    keysPressed[event.key.toLowerCase()] = false;
  };

  document.addEventListener("keydown", onKeyDown, false);
  document.addEventListener("keyup", onKeyUp, false);

  const onRightClickReset = (e) => {
    e.preventDefault();
    if (!state.characterControls) return;

    const model = state.characterControls.model;

    const distance = 4;
    const height = 3;
    const targetHeight = 1;

    const forward = new THREE.Vector3();
    model.getWorldDirection(forward);

    const camPos = model.position
      .clone()
      .add(forward.clone().multiplyScalar(-distance))
      .add(new THREE.Vector3(0, height, 0));

    const target = model.position
      .clone()
      .add(new THREE.Vector3(0, targetHeight, 0));

    camera.position.copy(camPos);
    orbitControls.target.copy(target);
    orbitControls.update();
  };

  renderer.domElement.addEventListener("contextmenu", onRightClickReset);

  // LOAD CHARACTER
  loadCharacter(scene, redUrl).then(({ model, mixer, actions }) => {
    model.scale.set(0.8, 0.8, 0.8);
    model.position.copy(state.spawnPosition);

    const animationsMap = new Map();
    animationsMap.set("Standing", actions.get("Standing"));
    animationsMap.set("Walking", actions.get("Walking"));
    animationsMap.set("Running", actions.get("Running"));

    if (actions.get("Turning")) {
      animationsMap.set("Turning", actions.get("Turning"));
    } else {
      console.warn("⚠️ Turning animation not found!");
    }

    if (
      !animationsMap.get("Standing") ||
      !animationsMap.get("Walking") ||
      !animationsMap.get("Running")
    ) {
      console.error("Missing actions:", {
        Standing: !!animationsMap.get("Standing"),
        Walking: !!animationsMap.get("Walking"),
        Running: !!animationsMap.get("Running"),
      });
      return;
    }

    state.characterControls = new CharacterControls(
      model,
      mixer,
      animationsMap,
      orbitControls,
      camera,
      "Standing"
    );

    if (state.physics) {
      state.physics.setPlayerPosition(model.position);
    }

    const invQ = model.quaternion.clone().invert();

    state.defaultView = {
      camOffsetLocal: camera.position
        .clone()
        .sub(model.position)
        .applyQuaternion(invQ),
      targetOffsetLocal: orbitControls.target
        .clone()
        .sub(model.position)
        .applyQuaternion(invQ),
    };

    // Setup D_ proximity triggers
    if (state.town) {
      state.proximityTriggers = setupProximityTriggers({
        root: state.town,
        characterModel: model,
        triggerDistance: 1,
      });

      // Setup Pokemon Manager
      state.pokemonManager = new PokemonManager();
      state.pokemonManager.setup(state.town, model);
    }
  });

  // Camera follow helper
  function updateCameraFollow(model) {
    const targetOffset = new THREE.Vector3(0, 1, 0);
    const lerpSpeed = 0.1;

    const currentDistance = camera.position.distanceTo(orbitControls.target);

    const clampedDistance = THREE.MathUtils.clamp(
      currentDistance,
      orbitControls.minDistance,
      orbitControls.maxDistance
    );

    const idealTarget = model.position.clone().add(targetOffset);

    const direction = new THREE.Vector3()
      .subVectors(camera.position, orbitControls.target)
      .normalize();

    const idealCamPos = idealTarget
      .clone()
      .add(direction.multiplyScalar(clampedDistance));

    camera.position.lerp(idealCamPos, lerpSpeed);
    orbitControls.target.lerp(idealTarget, lerpSpeed);
  }

  // ✨ Helper: Pushback + Turning
  function handlePushbackAndTurning(
    triggerPosition,
    pushbackDistance,
    sourceName,
    pokemonName = null
  ) {
    if (!state.characterControls || !state.physics) return;

    console.log(`🚫 Triggered by ${sourceName}`);

    // Pushback
    const pushDirection = new THREE.Vector3()
      .subVectors(state.characterControls.model.position, triggerPosition)
      .normalize();

    const pushbackVector = pushDirection.multiplyScalar(pushbackDistance);
    const newPosition = state.characterControls.model.position
      .clone()
      .add(pushbackVector);

    state.characterControls.model.position.copy(newPosition);

    if (state.physics) {
      state.physics.setPlayerPosition(newPosition);
      state.physics.playerVelocity.set(0, 0, 0);
    }

    // Turning
    const turningAction = state.characterControls.animationsMap.get("Turning");

    if (turningAction) {
      const currentAction = state.characterControls.animationsMap.get(
        state.characterControls.currentAction
      );
      if (currentAction) {
        currentAction.fadeOut(0.2);
      }

      turningAction.reset().fadeIn(0.2).play();
      state.characterControls.currentAction = "Turning";

      const turningClip = turningAction.getClip();
      const actualDuration = turningClip ? turningClip.duration : 1.7;

      state.turningState = {
        active: true,
        elapsed: 0,
        duration: actualDuration,
      };

      keysPressed["w"] = false;
      keysPressed["a"] = false;
      keysPressed["s"] = false;
      keysPressed["d"] = false;

      keyDisplay.lockWASD();
    } else {
      console.warn("⚠️ Turning animation not available");
    }

    // ✨ Show popup nếu là Pokemon
    if (pokemonName && onShowPopup) {
      onShowPopup(
        `💤 ${pokemonName}`,
        `${pokemonName} đang ngủ chặn đường!\nBạn không thể đi qua.`,
        "warning"
      );
    }
  }

  // LOOP
  const clock = new THREE.Clock();
  let rafId = 0;

  function animate() {
    const delta = clock.getDelta();

    const isTurning = state.turningState?.active;

    // 1) Physics + Movement
    if (state.physics && state.characterControls) {
      if (!isTurning) {
        const isRunning = state.characterControls.toggleRun;
        const moveSpeed = isRunning ? 4.5 : 2.5;
        const dir = new THREE.Vector3();

        if (keysPressed["w"]) dir.z += 1;
        if (keysPressed["s"]) dir.z -= 1;
        if (keysPressed["a"]) dir.x -= 1;
        if (keysPressed["d"]) dir.x += 1;

        const isMoving = dir.lengthSq() > 0;

        if (isMoving) {
          dir.normalize();

          const forward = new THREE.Vector3();
          camera.getWorldDirection(forward);
          forward.y = 0;
          if (forward.lengthSq() > 0) forward.normalize();

          const right = new THREE.Vector3()
            .crossVectors(forward, new THREE.Vector3(0, 1, 0))
            .normalize();

          const move = new THREE.Vector3();
          move.addScaledVector(forward, dir.z).addScaledVector(right, dir.x);

          if (move.lengthSq() > 0) move.normalize();

          state.physics.playerVelocity.x = move.x * moveSpeed;
          state.physics.playerVelocity.z = move.z * moveSpeed;
        } else {
          state.physics.playerVelocity.x = 0;
          state.physics.playerVelocity.z = 0;
        }
      }

      const { playerPos } = state.physics.step(delta);
      state.characterControls.model.position.copy(playerPos);

      if (playerPos.y < -10) {
        console.warn("Character fell out of bounds! Resetting...");
        state.characterControls.model.position.copy(state.spawnPosition);
        state.physics.setPlayerPosition(state.spawnPosition);
        state.physics.playerVelocity.set(0, 0, 0);
      }
    }

    // 2) Update animation
    if (state.characterControls) {
      if (!isTurning) {
        state.characterControls.updateAnimationOnly(delta, keysPressed);
      } else {
        const emptyKeys = {};
        state.characterControls.updateAnimationOnly(delta, emptyKeys);

        if (state.physics) {
          state.physics.setPlayerPosition(
            state.characterControls.model.position
          );
          state.physics.playerVelocity.set(0, 0, 0);
        }
      }

      if (isTurning && state.turningState) {
        state.turningState.elapsed += delta;

        if (state.turningState.elapsed >= state.turningState.duration) {
          const turningAction =
            state.characterControls.animationsMap.get("Turning");
          if (turningAction) {
            turningAction.fadeOut(0.4);
          }

          const model = state.characterControls.model;
          model.rotateY(Math.PI);

          const pushbackAfterTurn = 1;
          const forwardDirection = new THREE.Vector3();
          model.getWorldDirection(forwardDirection);
          forwardDirection.y = 0;
          forwardDirection.normalize();

          model.position.addScaledVector(forwardDirection, pushbackAfterTurn);

          if (state.physics) {
            state.physics.setPlayerPosition(model.position);
            state.physics.playerVelocity.set(0, 0, 0);
          }

          state.turningState = null;
          keyDisplay.unlockWASD();

          const hasInput =
            keysPressed["w"] ||
            keysPressed["s"] ||
            keysPressed["a"] ||
            keysPressed["d"];

          if (!hasInput) {
            const standingAction =
              state.characterControls.animationsMap.get("Standing");
            if (standingAction) {
              standingAction.reset().fadeIn(0.4).play();
              state.characterControls.currentAction = "Standing";
            }
          } else {
            const nextAnim = state.characterControls.toggleRun
              ? "Running"
              : "Walking";
            const nextAction =
              state.characterControls.animationsMap.get(nextAnim);
            if (nextAction) {
              nextAction.reset().fadeIn(0.4).play();
              state.characterControls.currentAction = nextAnim;
            }
          }
        }
      }
    }

    // 3) Camera follow
    if (state.characterControls && !isTurning) {
      const hasMovement =
        keysPressed["w"] ||
        keysPressed["s"] ||
        keysPressed["a"] ||
        keysPressed["d"];

      if (hasMovement) {
        updateCameraFollow(state.characterControls.model);
      }
    }

    // 4) Check D_ proximity triggers
    if (state.proximityTriggers && state.characterControls) {
      const trigger = state.proximityTriggers.checkProximity();

      if (trigger) {
        const now = Date.now();
        const timeSinceLastTrigger = now - state.lastTriggerTime;
        const cooldownPassed = timeSinceLastTrigger > 1800;

        if (cooldownPassed && !isTurning) {
          state.lastTriggerTime = now;

          handlePushbackAndTurning(
            trigger.position,
            1.0,
            `D_ zone: ${trigger.name}`
          );
        }
      }
    }

    // 5) ✨ Check Pokemon proximity
    if (state.pokemonManager && state.characterControls && !isTurning) {
      const charPos = state.characterControls.model.position;

      for (const pokemon of state.pokemonManager.pokemons) {
        if (!pokemon.isActive) continue;

        const distance = pokemon.getDistanceToCharacter(charPos);

        // 🐛 DEBUG: Log mỗi 60 frames
        if (!window.pokemonDebugFrame) window.pokemonDebugFrame = 0;
        window.pokemonDebugFrame++;

        if (pokemon.isCharacterInRange(charPos)) {
          if (pokemon.canTrigger()) {
            const result = pokemon.onApproach(charPos, distance);
            pokemon.markTriggered();

            if (result && result.needsPushback && result.needsTurning) {
              const now = Date.now();
              const timeSinceLast = now - state.lastPokemonTriggerTime;
              const cooldownPassed = timeSinceLast > 1800;

              if (cooldownPassed) {
                state.lastPokemonTriggerTime = now;

                handlePushbackAndTurning(
                  pokemon.position,
                  result.pushbackDistance || 1.0,
                  `Pokemon: ${pokemon.name}`,
                  pokemon.name
                );
              }
            }
          }
        }
      }
    }

    // 6) Hover interactions
    state.clickInteractions?.updateHover();

    orbitControls.update();
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(animate);
  }

  animate();

  // RESIZE
  const onResize = createResizeHandler({ container, camera, renderer });
  const onResizeAll = () => {
    onResize();
    keyDisplay.updatePosition();
  };
  window.addEventListener("resize", onResizeAll);

  // DISPOSE
  return function dispose() {
    cancelAnimationFrame(rafId);

    window.removeEventListener("resize", onResizeAll);
    document.removeEventListener("keydown", onKeyDown, false);
    document.removeEventListener("keyup", onKeyUp, false);
    state.clickInteractions?.dispose?.();
    state.proximityTriggers = null;

    state.pokemonManager?.dispose();
    state.pokemonManager = null;

    renderer.domElement.removeEventListener("contextmenu", onRightClickReset);
    keyDisplay.dispose?.();

    orbitControls.dispose();
    renderer.dispose();

    if (renderer.domElement?.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  };
}
