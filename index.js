var pokemonList = document.getElementById('pokemons');
var detailName = document.getElementById('name');
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
                        html += "<tr><td>" + pokemon.name.toUpperCase() + "</td><td><button onclick=\"details('" + pokemon.url + "')\">Details</button></td></tr>";
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
                    html += pokelist2.forms.name;
                    window.alert(html);
                    detailName.innerHTML = html;
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
