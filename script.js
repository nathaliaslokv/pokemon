
async function buscarPokemon() {
    const nome = document.getElementById("pokemon").value
        .trim().toLowerCase();

    if (nome === "") {
        alert("Digite o nome de um Pokémon!");
        return;
    }

    try {
        const resposta = await fetch(
            "https://pokeapi.co/api/v2/pokemon/" + nome
        );

        if (!resposta.ok) {
            throw new Error("Pokemon não encontrado");
        }

        const pokemon = await resposta.json();

        document.getElementById("nome").textContent =
            pokemon.name.charAt(0).toUpperCase() +
            pokemon.name.slice(1) + " #" + pokemon.id;

        document.getElementById("imagem").src =
            pokemon.sprites.other["official-artwork"].front_default ||
            pokemon.sprites.front_default;

        document.getElementById("tipo").innerHTML =
            pokemon.types.map(function(item) {
                return '<span class="badge bg-primary me-1">' +
                    item.type.name + '</span>';
            }).join("");

        document.getElementById("altura").textContent =
            (pokemon.height / 10).toFixed(1) + " m";

        document.getElementById("peso").textContent =
            (pokemon.weight / 10).toFixed(1) + " kg";

        const nomes = {
            hp: "HP",
            attack: "Ataque",
            defense: "Defesa",
            speed: "Velocidade"
        };

        pokemon.stats.forEach(function(item) {
            const chave = item.stat.name;

            if (nomes[chave]) {
                let id = chave;

                if (chave === "attack") id = "ataque";
                if (chave === "defense") id = "defesa";
                if (chave === "speed") id = "velocidade";

                const valor = item.base_stat;

                document.getElementById("label" + id).textContent =
                    nomes[chave] + ": " + valor;

                document.getElementById("barra" + id).style.width =
                    Math.min(valor, 100) + "%";

                document.getElementById("barra" + id).textContent =
                    valor;
            }
        });

        document.getElementById("habilidades").innerHTML =
            pokemon.abilities.map(function(item) {
                return '<span class="badge bg-secondary me-1">' +
                    item.ability.name + '</span>';
            }).join("");

    } catch (erro) {
        alert("Pokémon não encontrado! Verifique o nome e tente novamente.");
    }
}

document.getElementById("pokemon").addEventListener("keydown",
    function(event) {
        if (event.key === "Enter") {
            buscarPokemon();
        }
    }
);

buscarPokemon();
