export async function fetchPokemon() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  );

  const data = await res.json();

  return data.results.map((pokemon, index) => ({
    name:
      pokemon.name.charAt(0).toUpperCase() +
      pokemon.name.slice(1),

    image:
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
  }));
}