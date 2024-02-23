'use strict'
const elHeader = document.querySelector(".header");
const elList = document.querySelector(".list");
const elSelect = document.querySelector('.select')

const uniqueTypes = []
const list = JSON.parse(window.localStorage.getItem('filterpokemons')) || pokemons
console.log(pokemons);

// Render Pokemons
const renderPokemons = (arr, htmlElement) => {
    htmlElement.innerHTML = null;
    arr.forEach((pokemon) => {
        const newItem = document.createElement('li')
        const newImg = document.createElement('img')
        const newP = document.createElement('p')

        newImg.setAttribute('src', pokemon.img)
        newImg.style.width = '250px'
        newImg.style.height = '350px'

        newItem.textContent = pokemon.name
        newP.textContent = pokemon.type

        htmlElement.append(newItem, newImg, newP)

    })
}

// Generate Type
const generateType = (arr) => {
    arr.forEach(pokemon => {
        pokemon.type.forEach(type => {
            if(!uniqueTypes.includes(type)){
                uniqueTypes.push(type)
            }
        })
    });
}


// Render Type
const renderType = (arr, htmlElement) => {
    arr.forEach((type) => {
        const newOption = document.createElement('option')
        newOption.setAttribute('value', type)
        newOption.textContent = type
        htmlElement.append(newOption)
    })
}

// Filter Select
const filterSelect = (arr, htmlElement) => {
    const selectValue = htmlElement.value;

    const filteredPokemons = arr.filter(pokemon => pokemon.type.includes(selectValue));

 
    return filteredPokemons;

}

elSelect.addEventListener('change', () => {
    const filteredPokemons = filterSelect(pokemons, elSelect);
    renderPokemons(filteredPokemons, elList);
});

renderPokemons(list, elList)
generateType(pokemons);
renderType(uniqueTypes, elSelect)