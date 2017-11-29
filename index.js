var nextLink;
var previousLink;
var link = 'https://pokeapi.co/api/v2/pokemon/';
getPoke();
function getPoke() {
    var pokemonList = document.getElementById('pokemons');
    if (pokemonList != null) {
        fetch(link).then(function (response) {
            response.json().then(function (pokelist) {
                var html = '';
                nextLink = pokelist.next;
                previousLink = pokelist.previous;
                for (var _i = 0, _a = pokelist.results; _i < _a.length; _i++) {
                    var pokemon = _a[_i];
                    html += "<tr><td>" + pokemon.name.toUpperCase() + "</td><td><button class=\"btn btn-primary\"\" onclick=details('" + pokemon.url + "')>Details</button></td></tr>";
                }
                pokemonList.innerHTML = html;
            });
        });
    }
}
function details(link2) {
    var detailName = document.getElementById('name');
    var pic = document.getElementById('pic');
    var weight = document.getElementById('weight');
    var moves = document.getElementById('moves');
    if (link2 != null && detailName != null) {
        fetch(link2).then(function (response) {
            response.json().then(function (pokelist2) {
                var html = '';
                detailName.innerHTML = pokelist2.forms[0].name.toUpperCase();
                if (pic != null && weight != null) {
                    pic.innerHTML = "<img src='" + pokelist2.sprites.front_default + "'>";
                    weight.innerText = "Weight: " + pokelist2.weight + " lbs";
                    for (var i = 0; i < 4; i++) {
                        html += "<li>" + pokelist2.moves[i].move.name.toUpperCase() + "</li>";
                    }
                    if (moves != null) {
                        moves.innerHTML = html;
                    }
                }
            });
        });
    }
}
function jump(num) {
    if (nextLink === null) {
        window.alert("There is no next page!");
    }
    else if (num === 0) {
        link = nextLink;
        getPoke();
    }
    else {
        if (previousLink === null) {
            window.alert("There is no previous page!");
        }
        else if (num === 1) {
            link = previousLink;
            getPoke();
        }
    }
}
