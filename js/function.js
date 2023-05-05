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
 * Calcule le total du panier
 * @returns {number}
 */
export function totalBasket() {
    const basket = getBasket()
    let result = 0

    for (const product of basket) {
        result += product.quantity * product.prix
    }
    return result
}

/**
 * Sauvegarde objet dans localStorage
 * @param {object} product 
 */
export function saveBasket(product) {
    localStorage.setItem("basket", JSON.stringify(product))
}

/**
 * recuper l'objet du localStorage
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
 * Ajoute un objet dans le localStorage
 * @param {object} product 
 */
export function addBasket(product) {
    const basket = getBasket()
    // Verifie dans le panier si le produit est là
    const foundProduct = basket.find(p => p.id === product.id)
    if (foundProduct === undefined) {
        product.quantity = 1;
        basket.push(product);
    } else {
        foundProduct.quantity += 1
    }
    saveBasket(basket)
}


/**
 * Supprime un produit dans le localStorage et le HTML
 * @param {number} id 
 */
export function deleteProduct(id) {
    const basket = getBasket()
    const card = document.querySelector(`.card[data-id="${id}"]`)
    const newBasket = basket.filter(b => b.id !== id)
    saveBasket(newBasket)
    card.remove()
}