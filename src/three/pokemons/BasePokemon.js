// src/three/pokemons/BasePokemon.js
import * as THREE from "three";

/**
 * Base class cho tất cả Pokemon
 */
export class BasePokemon {
  constructor(object, config = {}) {
    this.object = object;
    this.name = config.name || "Unknown";
    this.triggerDistance = config.triggerDistance || 2.5;
    this.cooldown = config.cooldown || 2000;

    this.enablePushback = config.enablePushback || false;
    this.pushbackDistance = config.pushbackDistance || 1.0;
    this.enableTurning = config.enableTurning || false;

    // Get world position
    this.position = new THREE.Vector3();
    this.object.getWorldPosition(this.position);

    this.lastTriggerTime = 0;
    this.isActive = true;

    console.log(
      `✅ ${this.name} at`,
      this.position,
      `trigger: ${this.triggerDistance}`
    );
  }

  onApproach(characterPosition, distance) {
    console.log(
      `🎮 Approached ${this.name} (distance: ${distance.toFixed(2)})`
    );

    if (this.enablePushback) {
      return {
        needsPushback: true,
        needsTurning: this.enableTurning,
        pushbackDistance: this.pushbackDistance,
      };
    }
    return null;
  }

  onInteract(characterPosition) {
    console.log(`🖱️ Interacted with ${this.name}`);
  }

  update(delta, characterPosition) {
    // Override in subclass
  }

  canTrigger() {
    const now = Date.now();
    return now - this.lastTriggerTime > this.cooldown;
  }

  markTriggered() {
    this.lastTriggerTime = Date.now();
  }

  getDistanceToCharacter(characterPosition) {
    return this.position.distanceTo(characterPosition);
  }

  isCharacterInRange(characterPosition) {
    const distance = this.getDistanceToCharacter(characterPosition);
    return distance < this.triggerDistance;
  }

  setActive(active) {
    this.isActive = active;
  }

  dispose() {
    console.log(`🗑️ ${this.name} disposed`);
  }
}
