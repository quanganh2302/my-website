// src/three/utils.js
export const W = "w";
export const A = "a";
export const S = "s";
export const D = "d";
export const R = "r";
export const SHIFT = "shift";
export const DIRECTIONS = [W, A, S, D];

export class KeyDisplay {
  map = new Map();

  constructor() {
    const w = document.createElement("div");
    const a = document.createElement("div");
    const s = document.createElement("div");
    const d = document.createElement("div");
    const r = document.createElement("div");
    const shift = document.createElement("div");

    this.map.set(W, w);
    this.map.set(A, a);
    this.map.set(S, s);
    this.map.set(D, d);
    this.map.set(R, r);
    this.map.set(SHIFT, shift);

    this.map.forEach((v, k) => {
      v.style.color = "blue";
      v.style.fontSize = "50px";
      v.style.fontWeight = "800";
      v.style.position = "absolute";
      v.textContent = k.toUpperCase();
    });

    this.updatePosition();

    this.map.forEach((v) => document.body.append(v));
  }

  updatePosition() {
    this.map.get(W).style.top = `${window.innerHeight - 150}px`;
    this.map.get(A).style.top = `${window.innerHeight - 100}px`;
    this.map.get(S).style.top = `${window.innerHeight - 100}px`;
    this.map.get(D).style.top = `${window.innerHeight - 100}px`;
    this.map.get(R).style.top = `${window.innerHeight - 100}px`;
    this.map.get(SHIFT).style.top = `${window.innerHeight - 100}px`;

    this.map.get(W).style.left = `300px`;
    this.map.get(A).style.left = `200px`;
    this.map.get(S).style.left = `300px`;
    this.map.get(D).style.left = `400px`;
    this.map.get(R).style.left = `500px`;
    this.map.get(SHIFT).style.left = `50px`;
  }

  down(key) {
    const el = this.map.get(key.toLowerCase());
    if (el) el.style.color = "red";
  }

  up(key) {
    const el = this.map.get(key.toLowerCase());
    if (el) el.style.color = "blue";
  }

  // ✅ Lock WASD visual feedback
  lockWASD() {
    ["w", "a", "s", "d"].forEach((key) => {
      const el = this.map.get(key);
      if (el) {
        el.style.color = "gray";
        el.style.opacity = "0.3";
      }
    });
  }

  // ✅ Unlock WASD visual feedback
  unlockWASD() {
    ["w", "a", "s", "d"].forEach((key) => {
      const el = this.map.get(key);
      if (el) {
        el.style.color = "blue";
        el.style.opacity = "1";
      }
    });
  }

  dispose() {
    this.map.forEach((el) => el.remove());
    this.map.clear();
  }
}
