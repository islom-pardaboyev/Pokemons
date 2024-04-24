'use strict';

// DOM Element References
const elList = document.querySelector('.list');
const elSelect = document.querySelector('.select');
const elInput = document.querySelector('.input');
const elForm = document.querySelector('.form');

const uniqueTypes = [];
const storedPokemons = JSON.parse(localStorage.getItem('filterpokemons')) || [];
const pokemonsList = storedPokemons.length ? storedPokemons : pokemons;

// Function to render Pokémon list
const renderPokemons = (pokemons, targetElement) => {
    targetElement.innerHTML = ''; // Clear previous content

    pokemons.forEach((pokemon) => {
        const newLi = document.createElement('li');
        newLi.classList.add('bg-white', 'rounded-md', 'border', 'border-black', 'w-270px', 'h-270px', 'p-3');

        const newImg = document.createElement('img');
        newImg.src = pokemon.img;
        newImg.classList.add('w-150px', 'h-150px', 'mx-auto');

        const newSpan = document.createElement('span');
        newSpan.classList.add('w-full', 'bg-black', 'my-10px', 'block', 'h-2px');

        const newName = document.createElement('p');
        newName.textContent = pokemon.name;

        const newType = document.createElement('p');
        newType.textContent = pokemon.type.join(', ');

        newLi.append(newImg, newSpan, newName, newType);
        targetElement.appendChild(newLi);
    });
};

// Function to generate unique Pokémon types
const generateUniqueTypes = (pokemons) => {
    pokemons.forEach((pokemon) => {
        pokemon.type.forEach((type) => {
            if (!uniqueTypes.includes(type)) {
                uniqueTypes.push(type);
            }
        });
    });
};

// Function to render type options in a select element
const renderTypeOptions = (types, targetElement) => {
    // Add "All" option to show all Pokémon
    const allOption = document.createElement('option');
    allOption.value = 'All';
    allOption.textContent = 'All';
    targetElement.appendChild(allOption);

    types.forEach((type) => {
        const newOption = document.createElement('option');
        newOption.value = type;
        newOption.textContent = type;
        targetElement.appendChild(newOption);
    });
};

// Function to filter Pokémon by select type
const filterBySelect = (pokemons, selectElement) => {
    const selectedType = selectElement.value;
    if (selectedType === 'All') {
        return pokemons; // Return all Pokémon if "All" is selected
    }

    return pokemons.filter((pokemon) => pokemon.type.includes(selectedType));
};

// Function to filter Pokémon by input name
const filterByInput = (pokemons, inputElement) => {
    const inputValue = inputElement.value.trim().toLowerCase();
    return pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(inputValue));
};

// Event listener for form submit
elForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const filteredPokemons = filterByInput(pokemonsList, elInput);
    renderPokemons(filteredPokemons, elList);
    localStorage.setItem('filterpokemons', JSON.stringify(filteredPokemons));
});

// Event listener for select change
elSelect.addEventListener('change', () => {
    const filteredPokemons = filterBySelect(pokemonsList, elSelect);
    renderPokemons(filteredPokemons, elList);
    localStorage.setItem('filterpokemons', JSON.stringify(filteredPokemons));
});

// Initial setup
generateUniqueTypes(pokemonsList);
renderTypeOptions(uniqueTypes, elSelect); // Render unique Pokémon types with "All" option
renderPokemons(pokemonsList, elList); // Render initial Pokémon list
