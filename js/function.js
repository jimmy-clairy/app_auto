/**
 * Calcule le montant total du panier.
 * @returns {number} - Le montant total du panier.
 */
export function totalBasket() {
    const basket = getBasket("basket")
    let result = 0

    for (const product of basket) {
        result += product.quantity * product.prix
    }
    return result
}

/**
 * Affiche le total du panier dans l'élément avec la classe "showTotal".
 * @returns {void}
 */
export function showTotal() {
    const showTotal = document.querySelector(".showTotal")
    showTotal.innerText = `${totalBasket()} €`
}

/**
 * Enregistre le contenu du panier dans le stockage local.
 * @param {Array} product - Le contenu du panier à enregistrer.
 * @returns {void}
 */
export function saveBasket(product) {
    localStorage.setItem("basket", JSON.stringify(product))
}

/**
 * Récupère le contenu du panier à partir de la clé spécifiée.
 * @param {string} key - La clé d'accès au panier dans le stockage local.
 * @returns {Array} - Le contenu du panier sous forme de tableau d'objets.
 */
export function getBasket(key) {
    const basket = localStorage.getItem(key)
    if (basket === null) {
        return []
    }
    return JSON.parse(basket)
}

/**
 * Ajoute un produit au panier.
 * @param {Object} product - Le produit à ajouter.
 * @param {number} product.id - L'identifiant du produit.
 * @param {number} product.quantity - La quantité du produit.
 * @returns {void}
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
 * Supprime un produit du panier.
 * @param {number} id - L'identifiant du produit à supprimer.
 * @returns {void}
 */
export function deleteProduct(id) {
    const basket = getBasket("basket")
    const card = document.querySelector(`.card[data-id="${id}"]`)
    const newBasket = basket.filter(b => b.id !== id)
    saveBasket(newBasket)
    card.remove()
}

/**
 * Génère une chaîne de caractères représentant les avis avec des étoiles.
 * @param {Array} allAvis - Les avis à afficher.
 * @param {number} allAvis.nbEtoiles - Le nombre d'étoiles de l'avis.
 * @param {string} allAvis.utilisateur - L'utilisateur ayant laissé l'avis.
 * @param {string} allAvis.commentaire - Le commentaire de l'avis.
 * @returns {string} - La chaîne de caractères représentant les avis avec des étoiles.
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