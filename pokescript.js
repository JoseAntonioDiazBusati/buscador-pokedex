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
    
}

function mostrarError(message){
    const div = document.getElementById('mostrar');

}