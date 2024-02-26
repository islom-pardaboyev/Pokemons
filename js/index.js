'use strict'
const elHeader = document.querySelector(".header");
const elList = document.querySelector(".list");
const elSelect = document.querySelector('.select');
const elInput = document.querySelector('.input');
const elForm = document.querySelector('.form')

const uniqueTypes = []
const list = JSON.parse(window.localStorage.getItem('filterpokemons')) || pokemons

// Render Pokemons
const renderPokemons = (arr, htmlElement) => {
    htmlElement.innerHTML = null;
    arr.forEach((pokemon) => {
        const newItem = document.createElement('li')
        const newImg = document.createElement('img')
        const newP = document.createElement('p')
        const newLi = document.createElement('li')
        const newSpan = document.createElement('span')


        newItem.textContent = pokemon.name
        newP.textContent = pokemon.type

        htmlElement.append(newLi)
        newLi.append(newImg, newSpan, newItem, newP)


        newImg.setAttribute('src', pokemon.img)
        newImg.setAttribute('class', 'w-[150px] h-[150px]')
        newSpan.setAttribute('class', 'w-[100%] bg-[black] my-[10px] block h-[2px]')
        newImg.setAttribute('class', 'mx-auto')
        newLi.setAttribute('class', 'bg-[white] rounded-md border border-[black] w-[270px] h-[270px] p-3')

    })
}

// Generate Type
const generateType = (arr) => {
    arr.map((pokemon) => pokemon.type.forEach((type) => {
        if (!uniqueTypes.includes(type)) {
            uniqueTypes.push(type);
        }
    }));
};



// Render Type
const renderType = (arr, htmlElement) => {
    arr.map((type) => {
        const newOption = document.createElement('option')
        newOption.setAttribute('value', type)
        newOption.textContent = type
        htmlElement.append(newOption)
    })
}

// Filter Select
const filterSelect = (arr, htmlElement) => {
    elList.innerHTML = null

    const selectValue = htmlElement.value

    const filteredPokemons = []

    arr.forEach(pokemon => {
        if (pokemon.type.includes(selectValue)) {
            filteredPokemons.push(pokemon)
        }
    })

    localStorage.setItem('filterpokemons', JSON.stringify(filteredPokemons))
    renderPokemons(filteredPokemons, elList)  
    return filteredPokemons
}

// Filter Input
const filterInput = (arr, htmlElement) => {
    elList.innerHTML = null
    const inputValue = htmlElement.value

    const filteredPokemonsByName = []
    const errorStatuss = []

    arr.forEach(pokemon => {
        if (pokemon.name.includes(inputValue)) {
            filteredPokemonsByName.push(pokemon)
        }
    })

    arr.forEach(errorStatus => {
        if (!errorStatus.name.includes(inputValue)) {
            document.querySelector('.modal').classList.remove('invisible')
            errorStatuss.push(errorStatus)
        }
    })
    localStorage.setItem('filterpokemons', JSON.stringify(filteredPokemonsByName))
}

// Form DOM
elForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const filteredPokemons = filterInput(pokemons, elInput)
    renderPokemons(filteredPokemons, elList)
})

// Select DOM
elSelect.addEventListener('change', () => {
    const filteredPokemons = filterSelect(pokemons, elSelect)
    renderPokemons(filteredPokemons, elList)
});

renderPokemons(list, elList)
generateType(pokemons);
renderType(uniqueTypes, elSelect)