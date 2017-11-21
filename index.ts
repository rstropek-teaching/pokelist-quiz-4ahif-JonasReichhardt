const pokemonList = document.getElementById('pokemons');
const detailName = document.getElementById('name');
const pic = document.getElementById('pic');
const weight = document.getElementById('weight');
const moves = document.getElementById('moves');

let firstPage : string = 'https://pokeapi.co/api/v2/pokemon/';
let nextLink : string;
let previousLink : string;
let link : string;

link = firstPage;
getPoke();

function getPoke(){
  if(pokemonList!=null){
    
        (function(){
            fetch(link).then(response => {
              response.json().then(pokelist => {
                let html = '';
                nextLink = pokelist.next;
                previousLink = pokelist.previous;
                for (const pokemon of pokelist.results) {
                  html += `<tr><td>${pokemon.name.toUpperCase()}</td><td><button onclick=details('${pokemon.url}')>Details</button></td></tr>`
                }
                pokemonList.innerHTML = html;
              });
            });
            })();
    }
}

function details(link2:string){
    if(link2!=null&&detailName!=null){

        (function(){
          fetch(link2).then(response => {
            response.json().then(pokelist2 => {
              let html = '';
              detailName.innerHTML = pokelist2.forms[0].name.toUpperCase();
              if(pic!=null&&weight!=null){
                pic.innerHTML = `<img src='${pokelist2.sprites.front_default}'>`;
                weight.innerText = "Weight: "+pokelist2.weight +" lbs";
                for(const move of pokelist2.moves){
                  html += `<li>${move.move.name.toUpperCase()}</li>`;
                }
                if(moves!=null){
                  moves.innerHTML = html;
                }
              }
            });
          });
        })();

    }
}

function next(){
    if(nextLink!=null){
        link = nextLink;
        getPoke();
    }else{
      window.alert("There is no next page!");
    }
}

function previous(){
    if(previousLink!=null){
      link = previousLink;
      getPoke();
    }else{
      window.alert("There is no previous page!");
    }
}

