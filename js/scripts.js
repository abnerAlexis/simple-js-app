//IIFE    
let pokemons = (function () {
    // array of objects
    var pokemonList = [
        { name: "Bellossom", height: 0.4, types: "grass", abilities: ["Chlorophyll", "Healer"] },
        { name: "Butterfree", height: 1.1, types: ["bug", "flying"], abilities: ["Compoundeyes", "Tinted-lens"] },
        { name: "Rapidash", height: 1.7, types: "fire", abilities: ["Flash-fire", "Flame-body", "Run-away"] },
        { name: "Tentacruel", height: 1.6, types: ["water", "poison"], abilities: ["Chlorophyll", "Healer"] },
        { name: "Moltres", height: 2, types: ["fire", "flying"], abilities: ["Pressure", "Flame-body"] },
        { name: "Rattata", height: 0.3, types: "normal", abilities: ["Run-away", "Hustle", "Guts"] }
    ];

    //Categorizing size of pokemons
    function displayPokemonbySize(pokemon) {
        let pokemonSize = '';
        if (pokemon.height < 0.5) {
            pokemonSize = 'small';
        }
        else if (pokemon.height <= 1.5) {
            pokemonSize = "average";
        } else {
            pokemonSize = 'large';
        }
        document.write(`<p>${pokemon.name} is ${pokemon.height} m. It is a ${pokemonSize} pokemon.</p><br>`);
    }

    //Get all pokemon
    function getAll() {
        return pokemonList;
    }

    //Add new pokemon
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    //Returning the iteration of pokemonList. 
    return {
        internalMethod: function () {
            pokemonList.forEach(displayPokemonbySize);
        },
        getAll: getAll,
        add: add,
    };
})();

//Add new pokemon
pokemons.add({
    name: "Pikachu",
    height: 0.4,
    types: "electric",
    abilities: ["Static", "Lightning Rod"],
  });

//Internal method call
pokemons.internalMethod();
document.write(pokemons.getAll());