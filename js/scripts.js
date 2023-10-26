let pokemonRepository = (function () {
    let repository = [
        { name: "Bellossom", height: 0.4, types: "grass", abilities: ["Chlorophyll", "Healer"] },
        { name: "Butterfree", height: 1.1, types: ["bug", "flying"], abilities: ["Compoundeyes", "Tinted-lens"] },
        { name: "Rapidash", height: 1.7, types: "fire", abilities: ["Flash-fire", "Flame-body", "Run-away"] },
        { name: "Tentacruel", height: 1.6, types: ["water", "poison"], abilities: ["Chlorophyll", "Healer"] },
        { name: "Moltres", height: 2, types: ["fire", "flying"], abilities: ["Pressure", "Flame-body"] },
        { name: "Rattata", height: 0.3, types: "normal", abilities: ["Run-away", "Hustle", "Guts"] },
    ];

    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "height" in pokemon &&
            "types" in pokemon &&
            "abilities" in pokemon
        ) {
            repository.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }
    function getAll() {
        return repository;
    }
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
    }
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})();

pokemonRepository.add({
    name: "Pikachu",
    height: 0.4,
    types: "electric",
    abilities: ["Static", "Lightning Rod"],
  });

pokemonRepository.getAll().forEach(function (pokemon) {
  let pokemonList = document.querySelector('.pokemon-list');
  let listPokemon = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.className = 'button-class';
  listPokemon.appendChild(button);
  pokemonList.appendChild(listPokemon);
});
