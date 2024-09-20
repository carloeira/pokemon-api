const apiURL = 'https://pokeapi.co/api/v2/pokemon/';
let currentId = 1;

const renderDetails = (details) => {
    const container = document.getElementById('container');
    container.innerHTML = `
        <div class="card">
            <img src="${details.sprites.other.home.front_default}"/>
            <h2>${details.name}</h2>
            <p>#${details.id}</p>
        </div>
    `;
}

// Função assíncrona que faz o carregamento de dados do Pokemon usando o ID
const loadPokemonData = async (nextId) => {
    const response = await fetch(apiURL + nextId);
    const data = await response.json();
    currentId = +nextId;
    renderDetails(data);
}

// Função que define os eventos de ações para os botões de navegação e busca.
const loadActionEvents = () => {
    const previusButton = document.getElementById('previus');
    const nextButton = document.getElementById('next');
    const searchForm = document.getElementById('search-form');

    nextButton.addEventListener('click', () => {
        loadPokemonData(currentId + 1);
    });

    previusButton.addEventListener('click', () => {
        loadPokemonData(currentId - 1);
    });

    searchForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const input = document.getElementById('search-input');
        loadPokemonData(input.value);
    });
}

loadPokemonData(currentId);
loadActionEvents();
