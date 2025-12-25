// src/three/pokemons/PokemonRegistry.js

class PokemonRegistry {
  constructor() {
    this.registry = new Map();
  }

  register(speciesName, PokemonClass) {
    if (this.registry.has(speciesName)) {
      console.warn(
        `⚠️ Pokemon "${speciesName}" already registered. Overwriting...`
      );
    }
    this.registry.set(speciesName, PokemonClass);
    console.log(`📝 Registered Pokemon: ${speciesName}`);
  }

  get(speciesName) {
    return this.registry.get(speciesName);
  }

  has(speciesName) {
    return this.registry.has(speciesName);
  }

  getAllSpecies() {
    return Array.from(this.registry.keys());
  }

  createFromObject(object) {
    if (!object || !object.name) return null;

    if (object.name === "PKM_Snorlax") {
      const PokemonClass = this.registry.get("Snorlax");
      if (PokemonClass) {
        console.log(`✅ Found Snorlax mesh: ${object.name}`);
        return new PokemonClass(object);
      }
    }

    return null;
  }

  scanScene(root) {
    const pokemons = [];

    console.log("🔍 Scanning for Pokemon...");

    root.traverse((obj) => {
      const pokemon = this.createFromObject(obj);
      if (pokemon) {
        pokemons.push(pokemon);
      }
    });

    console.log(`✅ Found ${pokemons.length} Pokemon`);
    return pokemons;
  }

  clear() {
    this.registry.clear();
    console.log("🗑️ Registry cleared");
  }
}

export const pokemonRegistry = new PokemonRegistry();
