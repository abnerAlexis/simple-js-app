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


  //Loaedin message(gif img) as page loads.
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
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
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
  let modalBody = $(".modal-body");
  let modalTitle = $(".modal-title");
  let modalHeader = $("modal-header");
  // let modalContainer = $(".modal-container");
  //Clear existing content of the modal
  // modalHeader.empty();
  modalBody.empty();
  modalTitle.empty();


  //creating element for name in modal content
  let nameElement = $("<h1>" + pokemon.name + "</h1>");
  //creating img in modal content
  let imageElementFront = $('<img class="modal-img" style="width:50%">');
  imageElementFront.attr("src", pokemon.imageUrlFront);
  let imageElementBack = $('<img class="modal-img" style="width:50%">');
  imageElementBack.attr("src", pokemon.imageUrlBack);
  //creating element for height in modal content
  let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");
  //creating element for weight in modal content
  let weightElement = $("<p>" + "weight : " + pokemon.weight + "</p>");
  //creating element for type in modal content
  let typesElement = $("<p>" + "types : " + pokemon.types + "</p>");
  //creating element for abilities in modal content
  let abilitiesElement = $("<p>" + "abilities : " + pokemon.abilities + "</p>");


  modalTitle.append(nameElement);
  modalBody.append(imageElementFront);
  modalBody.append(imageElementBack);
  modalBody.append(heightElement);
  modalBody.append(weightElement);
  modalBody.append(typesElement);
  modalBody.append(abilitiesElement);
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
