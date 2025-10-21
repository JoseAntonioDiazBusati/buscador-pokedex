document.getElementById('buscador').addEventListener('click', function(){
    const nombre = document.getElementById('nombrePokemon').value.toLowerCase().trim();
    const url = `https://pokeapi.co/api/v2/pokemon/${nombre}`;
    

    fetch(url).then(response=>{
        if (!response.ok){
            throw new Error('Pokémon desconocido');
        }
        return response.json();
    })
    .then(pokemon => mostrarPokemon(pokemon))
    .catch(error => mostrarError(error.message));
})

function mostrarPokemon(pokemon){
    const div = document.getElementById('mostrar');
    const pokeTypes = pokemon.types.map(t => t.type.name).join(', ');
    div.innerHTML = `
        <div class="pokemon-card">
            <div class="pokemon-img">
                <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
            </div>
            <div class="pokemon-info">
                <h2>${pokemon.name}</h2>
                <p>Tipo: ${pokeTypes}</p>
                <p>Peso: ${pokemon.weight} kg</p>
                <p>Altura: ${pokemon.height} m</p>
            </div>
        </div>
    `;
}

function mostrarError(message){
    const div = document.getElementById('mostrar');
    div.innerHTML = `<p style="color:red;">${message}</p>`;
}