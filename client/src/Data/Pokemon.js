export async function fetchPokemon() { 
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await response.json();

    return data.results.map((p,i) => {
        name : capaitalze(p.name),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`
    });

    function capaitalze(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);

        }
}