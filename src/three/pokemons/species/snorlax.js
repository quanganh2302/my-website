// src/three/pokemons/species/snorlax.js
import { BasePokemon } from "../BasePokemon";

/**
 * Snorlax Pokemon
 * Ngủ chặn đường, pushback + turning giống D_ objects
 */
export class SnorlaxPokemon extends BasePokemon {
  constructor(object) {
    super(object, {
      name: "Snorlax",
      triggerDistance: 2.0,
      cooldown: 1800,

      // Enable pushback + turning
      enablePushback: true,
      enableTurning: true,
      pushbackDistance: 1.2,
    });
  }

  /**
   * Khi nhân vật đến gần Snorlax
   * Return pushback info để trigger turning + popup
   */
  onApproach(characterPosition, distance) {
    console.log(
      `💤 You approached Snorlax! (distance: ${distance.toFixed(2)})`
    );
    console.log(`💤 Snorlax is blocking the path!`);

    // Luôn pushback khi gần Snorlax
    return {
      needsPushback: true,
      needsTurning: true,
      pushbackDistance: this.pushbackDistance,
    };
  }

  /**
   * Khi click vào Snorlax (optional)
   */
  onInteract(characterPosition) {
    console.log(`🖱️ Clicked on Snorlax`);
    console.log(`💤 Snorlax is sleeping soundly... Zzz...`);
    // TODO: Có thể thêm dialog hoặc interaction khác
  }
}
