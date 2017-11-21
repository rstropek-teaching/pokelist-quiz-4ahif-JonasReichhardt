var pokemonList = document.getElementById('pokemons');
var detailName = document.getElementById('name');
var pic = document.getElementById('pic');
var weight = document.getElementById('weight');
var moves = document.getElementById('moves');
var firstPage = 'https://pokeapi.co/api/v2/pokemon/';
var nextLink;
var previousLink;
var link;
link = firstPage;
getPoke();
function getPoke() {
    if (pokemonList != null) {
        (function () {
            fetch(link).then(function (response) {
                response.json().then(function (pokelist) {
                    var html = '';
                    nextLink = pokelist.next;
                    previousLink = pokelist.previous;
                    for (var _i = 0, _a = pokelist.results; _i < _a.length; _i++) {
                        var pokemon = _a[_i];
                        html += "<tr><td>" + pokemon.name.toUpperCase() + "</td><td><button onclick=details('" + pokemon.url + "')>Details</button></td></tr>";
                    }
                    pokemonList.innerHTML = html;
                });
            });
        })();
    }
}
function details(link2) {
    if (link2 != null && detailName != null) {
        (function () {
            fetch(link2).then(function (response) {
                response.json().then(function (pokelist2) {
                    var html = '';
                    detailName.innerHTML = pokelist2.forms[0].name.toUpperCase();
                    if (pic != null && weight != null) {
                        pic.innerHTML = "<img src='" + pokelist2.sprites.front_default + "'>";
                        weight.innerText = "Weight: " + pokelist2.weight + " lbs";
                        for (var _i = 0, _a = pokelist2.moves; _i < _a.length; _i++) {
                            var move = _a[_i];
                            html += "<li>" + move.move.name.toUpperCase() + "</li>";
                        }
                        if (moves != null) {
                            moves.innerHTML = html;
                        }
                    }
                });
            });
        })();
    }
}
function next() {
    if (nextLink != null) {
        link = nextLink;
        getPoke();
    }
    else {
        window.alert("There is no next page!");
    }
}
function previous() {
    if (previousLink != null) {
        link = previousLink;
        getPoke();
    }
    else {
        window.alert("There is no previous page!");
    }
}
