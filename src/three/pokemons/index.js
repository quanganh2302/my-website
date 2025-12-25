// src/three/pokemon/index.js
import { pokemonRegistry } from "./PokemonRegistry";
import { SnorlaxPokemon } from "./species/snorlax";

// 🔧 Đăng ký tất cả Pokemon ở đây
pokemonRegistry.register("Snorlax", SnorlaxPokemon);
// pokemonRegistry.register("Pikachu", PikachuPokemon); // Future
// pokemonRegistry.register("Charizard", CharizardPokemon); // Future

/**
 * Pokemon Manager
 * Quản lý tất cả Pokemon trong scene
 */
export class PokemonManager {
  constructor() {
    this.pokemons = []; // Array of Pokemon instances
    this.characterModel = null;
  }

  /**
   * Setup Pokemon system
   * @param {Object3D} sceneRoot - Root object của scene (town)
   * @param {Object3D} characterModel - Model của nhân vật
   */
  setup(sceneRoot, characterModel) {
    this.characterModel = characterModel;
    
    // Scan scene và tạo Pokemon instances
    this.pokemons = pokemonRegistry.scanScene(sceneRoot);
    
    console.log(`✅ Pokemon Manager initialized with ${this.pokemons.length} Pokemon`);
    
    return this.pokemons.length;
  }

  /**
   * Update tất cả Pokemon mỗi frame
   * @param {number} delta - Delta time
   */
  update(delta) {
    if (!this.characterModel) return;

    const charPos = this.characterModel.position;

    for (const pokemon of this.pokemons) {
      if (!pokemon.isActive) continue;

      // Update Pokemon (animation, effects, etc.)
      pokemon.update(delta, charPos);

      // Check proximity
      if (pokemon.isCharacterInRange(charPos)) {
        if (pokemon.canTrigger()) {
          const distance = pokemon.getDistanceToCharacter(charPos);
          
          // Trigger onApproach
          pokemon.onApproach(charPos, distance);
          pokemon.markTriggered();
        }
      }
    }
  }

  /**
   * Get Pokemon by name
   * @param {string} name - Pokemon name
   * @returns {BasePokemon|null}
   */
  getPokemonByName(name) {
    return this.pokemons.find(p => p.name === name) || null;
  }

  /**
   * Get tất cả Pokemon đang active
   */
  getActivePokemons() {
    return this.pokemons.filter(p => p.isActive);
  }

  /**
   * Handle click/interact với Pokemon
   * @param {Object3D} clickedObject - Object được click
   */
  handleClick(clickedObject) {
    if (!this.characterModel || !clickedObject) return;

    // Tìm Pokemon tương ứng với clicked object
    const pokemon = this.pokemons.find(p => p.object === clickedObject);
    
    if (pokemon && pokemon.isActive) {
      const charPos = this.characterModel.position;
      pokemon.onInteract(charPos);
    }
  }

  /**
   * Dispose tất cả Pokemon
   */
  dispose() {
    for (const pokemon of this.pokemons) {
      pokemon.dispose();
    }
    this.pokemons = [];
    console.log("🗑️ Pokemon Manager disposed");
  }
}

// Export để dùng trong app.js
export { pokemonRegistry } from "./PokemonRegistry";
export { BasePokemon } from "./BasePokemon";
export { SnorlaxPokemon } from "./species/snorlax";