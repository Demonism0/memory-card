async function getPokemonUrls() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/')
  const pokemonsObj = await response.json();
  const pokemonsArray = pokemonsObj.results;
  let urlArray = [];
  for (let i = 0; i < 12; i += 1) {
    urlArray.push(pokemonsArray[i].url);
  }
  return urlArray;
}

async function getPokemonData(url) {
  const response = await fetch(url);
  const pokemonObj = await response.json();
  const name = pokemonObj.name;
  const sprite = pokemonObj.sprites.front_default;
  return { name, sprite }
}

async function getAll() {
  let result = [];
  const urlArray = await getPokemonUrls();
  for (let i = 0; i < 12; i += 1) {
    const pokemon = await getPokemonData(urlArray[i]);
    result.push({...pokemon, id: i});
  }
  return result;
}

export default getAll;
