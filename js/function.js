/**
 * Donne le plus elevé en entier avec une dixaine superieur ex: 141.5 => 150
 * @param {Object} objet
 * @returns {number}
 */
export function prixMax(objet) {
    const piecesTry = [...objet]
    piecesTry.sort((a, b) => b.prix - a.prix)
    return Math.round(((piecesTry[0].prix + 4.99) / 10)) * 10
}

/**
 * Save object in localStorage
 * @param {object} product 
 */
export function saveBasket(product) {
    localStorage.setItem("basket", JSON.stringify(product))
}

/**
 * Get object in localStorage
 * @returns {object | null}
 */
export function getBasket() {
    const basket = localStorage.getItem("basket")
    if (basket === null) {
        return []
    }
    return JSON.parse(basket)
}

/**
 * Add object in localStorage
 * @param {object} product 
 */
export function addBasket(product) {
    const basket = getBasket()
    // Check in basket if product is there
    const foundProduct = basket.find(p => p.id === product.id)
    console.log(basket);
    console.log(foundProduct);
    if (foundProduct === undefined) {
        product.quantity = 1;
        basket.push(product);
    } else {
        foundProduct.quantity += 1
    }

    saveBasket(basket)
}


/**
 * Delete product in localStorage and HTML
 * @param {number} id 
 */
export function deleteProduct(id) {
    const basket = getBasket()
    const card = document.querySelector(`.card[data-id="${id}"]`)
    const newBasket = basket.filter(b => b.id !== id)
    saveBasket(newBasket)
    card.remove()
}