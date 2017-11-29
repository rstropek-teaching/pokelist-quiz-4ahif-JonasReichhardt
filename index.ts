let nextLink: string;
let previousLink: string;

let link: string = 'https://pokeapi.co/api/v2/pokemon/';
getPoke();


function getPoke() {
  const pokemonList = document.getElementById('pokemons');

  if (pokemonList != null) {

    fetch(link).then(response => {
      response.json().then(pokelist => {
        let html = '';
        nextLink = pokelist.next;
        previousLink = pokelist.previous;

        for (const pokemon of pokelist.results) {
          html += `<tr><td>${pokemon.name.toUpperCase()}</td><td><button class="btn btn-primary"" onclick=details('${pokemon.url}')>Details</button></td></tr>`
        }

        pokemonList.innerHTML = html;
      });
    });
  }
}

function details(link2: string) {
  const detailName = document.getElementById('name');
  const pic = document.getElementById('pic');
  const weight = document.getElementById('weight');
  const moves = document.getElementById('moves');

  if (link2 != null && detailName != null) {

    fetch(link2).then(response => {
      response.json().then(pokelist2 => {
        let html = '';
        detailName.innerHTML = pokelist2.forms[0].name.toUpperCase();

        if (pic != null && weight != null) {
          pic.innerHTML = `<img src='${pokelist2.sprites.front_default}'>`;
          weight.innerText = "Weight: " + pokelist2.weight + " lbs";

          for (var i = 0; i < 4; i++) {
            html += `<li>${pokelist2.moves[i].move.name.toUpperCase()}</li>`;
          }

          if (moves != null) {
            moves.innerHTML = html;
          }
        }

      });
    });
  }
}

function jump(num: number) {

  if (nextLink === null) {

    window.alert("There is no next page!");

  } else if (num === 0) {

    link = nextLink;
    getPoke();
  } else {
    if (previousLink === null) {

      window.alert("There is no previous page!");

    } else if (num === 1) {

      link = previousLink;
      getPoke();
    }
  }
}

