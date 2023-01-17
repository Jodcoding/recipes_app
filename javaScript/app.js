const APP_ID = 'a07bfde8'
const APP_KEY = '74753a35d4b11a3629831ab336e70a31'



let tab = []

const recipes_container = document.querySelector('.recipes-container')

const logModal = (e) => {

    e.preventDefault()
    const description = e.currentTarget.parentElement
    const modal_closed = description.querySelector('.close')
    const modal = description.querySelector('.modal')

    if (modal_closed) {
        const openButtonList = document.querySelectorAll('.open')
        tab = Array.from(openButtonList)
        if (tab.length < 1) {
            modal.classList.remove('close')
            modal.classList.add('open')
            // description.querySelector('.modal p').innerText = 'Bonjour ULYSSE'

        }
        else
            alert('Fermez d\'abord la boîte modale!')

    }

}


const closeModal = (e) => {
    // e.preventDefault()
    const parent = e.currentTarget.parentElement // the modal div which is the parent of the button
    const firstParent = parent.parentElement // the description div which is the parent of the modal div

    const modal_closed = firstParent.querySelector('.close')
    const modal = firstParent.querySelector('.modal')
    if (!modal_closed) {
        modal.classList.remove('open')
        modal.classList.add('close')
    }

}

const createRecipe = (data) => {

    recipes_container.innerHTML = ``
    const hits = data.hits

    if (hits.length !== 0) {
        // console.log(data.hits)
        hits.map(item => {

            const divRecipeItem = document.createElement('div')
            divRecipeItem.setAttribute('class', 'item')
            divRecipeItem.innerHTML = `
                <div class="item-img"><img src="${item.recipe.image}" alt=""></div>
                <div class="item-description">
                    <p class="text">${item.recipe.label}</p>
                    <button class="recipe-link"><a href="#" >See +</a></button>
                    <div class="modal close">
                        <button class="close-modal">X</button>
                    </div>
                </div>
            `

            recipes_container.append(divRecipeItem)
            let mod = divRecipeItem.querySelector('.modal')

            for (const ingredient of item.recipe.ingredients) {
                let ingredients = document.createElement('p')
                ingredients.innerText = '-' + ingredient.text
                mod.append(ingredients)
            }

        })
    }
    else
        logError('No result found!')

}

/**
 * 
 * @param {String} errorMessage 
 */
const logError = (errorMessage) => {

    const error = document.createElement('div')
    error.setAttribute('class', 'error')
    error.innerText = errorMessage
    recipes_container.prepend(error)

}

const form = document.querySelector('form')

form.addEventListener('submit', e => {

    e.preventDefault()
    const data = new FormData(form).get('search-input')

    if (data === '') {
        alert('You may type something first!')
    } else {
        // console.log(data)
        fetchRecipe(data)
    }

    form.reset()

})

/**
 * Elle fait appel a l'API en donnant comme requette la donnee fournie par l'utilisateur
 * @param {string} recipe 
 */
const fetchRecipe = async (recipe) => {

    const url = `https://api.edamam.com/search?q=${recipe}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`

    const response = await fetch(url)
    const data = await response.json()
    createRecipe(data)

    const viewMoreButtons = document.querySelectorAll('.recipe-link')
    viewMoreButtons.forEach(button => button.addEventListener('click', logModal))
    document.querySelectorAll('.close-modal').forEach(close => close.addEventListener('click', closeModal))

}


