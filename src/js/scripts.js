class Pokemon {
  URL = 'https://pokeapi.co/api/v2/pokemon/?limit=200';

  async loadPokemons() {
    this.showLoadingMessage();
    const response = await fetch(this.URL);     // Call the API to get the list
    const pokemons = await response.json();     // Convert the response to json
    this.pokemonArray = pokemons.results;       // Store name and url for each pokemon
    this.hideLoadingMessage();
    this.processPokemons();
  }

  processPokemons() {
    // Process pokemons. Create buttons and eventListeners and
    // add them in the pokemonButtons
    const pokemonButtons = document.getElementById('pokemonButtons');
    this.pokemonArray.forEach(pokemon => pokemonButtons.appendChild(this.createButton(pokemon)));
  }

  createButton(pokemon) {
    //create button
    const button = document.createElement('button');

    //Setting up the button attributes
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'btn btn-primary');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#pokemon-modal');

    //Setting up button labels
    button.innerText = pokemon.name;
    button.addEventListener('click', this.modalBodyContent(pokemon));
    return button;
  }

  modalBodyContent(pokemon) {
    // We need to return another function so that this method will not be rendered
    // when we load the page.
    return () => {
      document.getElementById('modalLabel').innerHTML = pokemon.name;
      document.getElementById('pokemonDetails').innerHTML = "";

      // Make the call for details and set the information in the modal
      this.getPokemonDetails(pokemon).then((details) => {
        document.getElementById('pokemonDetails').innerHTML =
          '<dl class="row">' +
          '<dt class="col-sm-3">Height</dt>' +
          `<dd class="col-sm-9">${details.height}ft</dd>` +
          '<span></span>' +
          '<dt class="col-sm-3">Weight</dt>' +
          `<dd class="col-sm-9">${details.weight}lbs</dd>` +
          '<span></span>' +
          '<dt class="col-sm-3">Types</dt>' +
          `<dd class="col-sm-9">${details.types}</dd>` +
          '<span></span>' +
          '<dt class="col-sm-3">Abilities</dt>' +
          `<dd class="col-sm-9">${details.abilities}</dd>` +
          '<span></span>' +

          `<dd class="col"><div class="text-center"><img src="${details.image}" /></div></dd>` +
          '</dl>';
      });

    };
  }

  async getPokemonDetails(pokemon) {
    const response = await fetch(pokemon.url);      // Call pokemon.url to get the details
    const jsonResponse = await response.json(); // Convert the response to json

    return {
      name: jsonResponse.name,
      height: jsonResponse.height,
      weight: jsonResponse.weight,
      types: jsonResponse.types.map(pokemon => pokemon.type.name).join(', '),
      abilities: jsonResponse.abilities.map(pokemon => pokemon.ability.name).join(', '),
      image: jsonResponse.sprites.front_default,
    };
  }

  //Loaedin message(gif img) as page is load.
  showLoadingMessage() {
    var img = document.createElement("img");
    img.src = "./img/loader.gif";
    var src = document.getElementById("loader");
    src.appendChild(img);
  }

  //Loading message(gif img) gets dissapeared  when loading is done.
  hideLoadingMessage() {
    document.getElementById("loader").style.display = "none";
  }
}

new Pokemon().loadPokemons();