/**
 * Calcule le total du panier
 * @returns {number}
 */
export function totalBasket() {
    const basket = getBasket("basket")
    let result = 0

    for (const product of basket) {
        result += product.quantity * product.prix
    }
    return result
}

/** Affiche le total */
export function showTotal() {
    const showTotal = document.querySelector(".showTotal")
    showTotal.innerText = `${totalBasket()} €`
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
 * @param {string} key
 * @returns {object | null}
 */
export function getBasket(key) {
    const basket = localStorage.getItem(key)
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
    const basket = getBasket("basket")
    // Verifie dans le panier si le produit est là
    const foundProduct = basket.find(p => p.id === product.id)
    if (foundProduct === undefined) {
        basket.push(product);
    } else {
        foundProduct.quantity += product.quantity
    }
    saveBasket(basket)
}

/**
 * Supprime un produit dans le localStorage et le HTML
 * @param {number} id 
 */
export function deleteProduct(id) {
    const basket = getBasket("basket")
    const card = document.querySelector(`.card[data-id="${id}"]`)
    const newBasket = basket.filter(b => b.id !== id)
    saveBasket(newBasket)
    card.remove()
}

/**
 * Ajoute les étoiles aux avis
 * @param {{nbEtoiles:number}} allAvis 
 * @returns 
 */
export function addStars(allAvis) {
    let textContent = ""
    for (const avis of allAvis) {
        let nbEtoiles = ""
        switch (avis.nbEtoiles) {
            case 1:
                nbEtoiles = "⭐"
                break
            case 2:
                nbEtoiles = "⭐⭐"
                break
            case 3:
                nbEtoiles = "⭐⭐⭐"
                break
            case 4:
                nbEtoiles = "⭐⭐⭐⭐"
                break
            case 5:
                nbEtoiles = "⭐⭐⭐⭐⭐"
                break

            default:
                break
        }
        textContent += `${nbEtoiles}<br> <b>${avis.utilisateur}:</b> ${avis.commentaire} <br><br>`
    }
    return textContent
}