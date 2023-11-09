//Define modalContainer globally
let modalContainer = document.querySelector('#modal-container');

//Array of pokemon objects
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Type check
  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("Not a valid Pokemon object.");
    }
  }

  function getAll() {
    return pokemonList;
  }

  //Adding list items.
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    // TO DO - CLICK should open the modal
    button.addEventListener('click', () => {
      showDetails(pokemon);
    });

    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  //Loadin message(gif img) as page is load.
  function showLoadingMessage() {
    var img = document.createElement("img");
    img.src = "./img/loader.gif";
    var src = document.getElementById("loader");
    src.appendChild(img);
  }

  //Loading message(gif img) gets dissapeared  when loading is done.
  function hideLoadingMessage() {
    document.getElementById("loader").style.display = "none";
  }

  // Promise function. Fetch function requests the pokemonList from the API
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
        hideLoadingMessage();
      });
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    })
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //Add the details to the item
      // console.log(details);
      //Image
      item.imageUrl = details.sprites.front_default;
      //Height
      item.height = details.height;
      //Weight
      item.weight = details.weight;
      //Abilities
      pokemonAbilities = details.abilities.map((el) => el.ability.name);
      formattedAbilities = pokemonAbilities.map((el) => el.charAt(0).toUpperCase() + el.slice(1));
      item.abilities = formattedAbilities.join(', ');

      //Types
      pokemonTypes = details.types.map((el) => el.type.name);
      formattedTypes = pokemonTypes.map((el) => el.charAt(0).toUpperCase() + el.slice(1));
      item.types = formattedTypes.join(', ');

      hideLoadingMessage();
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

function showModal(pokemon) {
  modalContainer.innerHTML = '';
  let modal = document.createElement('div');
  modal.classList.add('modal');
  modalContainer.appendChild(modal);

  //Create button to close modal display
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'X';
  closeButtonElement.addEventListener('click', hideModal);
  modal.appendChild(closeButtonElement);

  //Create h1 element for pokemon name
  let titleElement = document.createElement('h1');
  titleElement.innerText = pokemon.name.toUpperCase(); //Convert name to uppercase
  titleElement.classList.add('pokemon-name')
  modal.appendChild(titleElement);

  //Create img element for pokemon image
  let imageElement = document.createElement('img');
  imageElement.src = pokemon.imageUrl;
  imageElement.classList.add('pokemon-img');
  modal.appendChild(imageElement);

  //Create p for pokemon's height
  let contentElement = document.createElement('p');
  contentElement.innerText = "Height: " + pokemon.height;
  modal.appendChild(contentElement);

  //Create p for pokemon's weight
  let contentWeight = document.createElement('p');
  contentWeight.innerText = "Weight: " + pokemon.weight;
  modal.appendChild(contentWeight);

   //Create p for pokemon's abilities
  let contentAbilities = document.createElement('p');
  contentAbilities.innerText = "His Abilities: " + pokemon.abilities;
  modal.appendChild(contentAbilities);

  //Create p for pokemon's types
  let contentTypes = document.createElement('p');
  contentTypes.innerText = "Types: " + pokemon.types;
  modal.appendChild(contentTypes);

  modalContainer.classList.add('is-visible');
}

function hideModal() {
  modalContainer.classList.remove('is-visible');
}

//Modal gets closed if user press Esc key.
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

//Modal gets closed if the user clicks directly on the overlay
modalContainer.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});