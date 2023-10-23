// array of objects
var pokemonList = [
    {name: "Bellossom", height: 0.4, types: "grass", abilities: ["Chlorophyll", "Healer"]},
    {name: "Butterfree", height: 1.1, types: ["bug", "flying"], abilities: ["Compoundeyes", "Tinted-lens"]},
    {name: "Rapidash", height: 1.7, types: "fire", abilities: ["Flash-fire", "Flame-body", "Run-away"]},
    {name: "Tentacruel", height: 1.6, types: ["water", "poison"], abilities: ["Chlorophyll", "Healer"]},
    {name: "Moltres", height: 2, types: ["fire", "flying"], abilities: ["Pressure", "Flame-body"]},
    {name: "Rattata", height: 0.3, types: "normal", abilities: ["Run-away", "Hustle", "Guts"]}
];

//Classifying pokemons by height by looping through the array pokemonList with forEach()

pokemonList.forEach(pokemon => {
    if (pokemon.height < 0.5) {
        document.write('<p>' + pokemon.name + "'s height is " + pokemon.height + " m. It's a small pokemon.</p>");
    }
    else if (pokemon.height >= 0.5 && pokemon.height <= 1.5) {
        document.write("<p>" + pokemon.name + "'s heigth is " + pokemon.height + " m. It's an average sized pokemon.</p>");
    } else {
        document.write("<p>" + pokemon.name + "'s height is " + pokemon.height + " m. It's a large pokemon.</p>");
    }
});