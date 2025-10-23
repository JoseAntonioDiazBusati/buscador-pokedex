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

async function mostrarPokemon(pokemon){
    const div = document.getElementById('mostrar');
    const pokeTypes = pokemon.types.map(t => t.type.name).join(', ');

    const speciesRes = await fetch(pokemon.species.url);
    const speciesData = await speciesRes.json();
    const variedades = speciesData.varieties;

    div.innerHTML = `
        <div class="pokemon-card">
            <div class="pokemon-img">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            </div>
            <div class="pokemon-info">
                <h2>${pokemon.name}</h2>
                <p>Tipo: ${pokeTypes}</p>
                <p>Peso: ${pokemon.weight} kg</p>
                <p>Altura: ${pokemon.height} m</p>
            </div>
        </div>
        <div id="formas"></div>
    `;
    if (variedades.length > 1) {
        const formasDiv = document.getElementById('formas');
        formasDiv.innerHTML = '<div class="formas-container"></div>';
        const contenedor = formasDiv.querySelector('.formas-container');

        for (const variedad of variedades) {
            if (variedad.is_default) continue;

            const resp = await fetch(variedad.pokemon.url);
            const formData = await resp.json();
            const formTypes = formData.types.map(t => t.type.name).join(', ');

            contenedor.innerHTML += `
                <div class="forma-card">
                    <img src="${formData.sprites.front_default}" alt="${formData.name}">
                    <h2>${formData.name}</h2>
                    <p>Tipo: ${formTypes}</p>
                    <p>Peso: ${formData.weight} kg</p>
                    <p>Altura: ${formData.height} m</p>
                </div>
            `;
        }
    }
    
}

function mostrarError(message){
    const div = document.getElementById('mostrar');
    div.innerHTML = `<p style="color:red;">${message}</p>`;
}