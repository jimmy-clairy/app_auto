import { fetchData } from "../fetchData.js"
import { addBasket, totalBasket } from "../function.js"

const url = new URL(document.location)
const id = Number(url.searchParams.get("id"))

const pieces = await fetchData("../dataBase/pieces.json")
const foundPiece = pieces.filter(piece => piece.id === id)
const piece = foundPiece[0]

const allAvis = await fetchData("../dataBase/avis.json")
const avis = allAvis.filter(a => a.pieceId === id).reverse()


/**
 * Crée un produit a partir des données
 */
const productHeading = document.querySelector(".product__heading")
productHeading.textContent = piece.nom

const newPiece = document.querySelector(".card__new")
if (piece.newPiece) newPiece.style.display = "block"

const productImg = document.querySelector(".product__img")
productImg.src = `../${piece.image}`
productImg.alt = piece.nom

const productDescription = document.querySelector(".product__description")
productDescription.textContent = piece.description ?? "Pas de description pour le moment."

const productPrice = document.querySelector(".product__price")
productPrice.textContent = `Prix: ${piece.prix}€`

const productAvailable = document.querySelector(".product__available")
productAvailable.textContent = piece.disponibilite ? "En stock" : "Rupture"
if (piece.disponibilite) {
    productAvailable.classList.add('stock')
    productAvailable.classList.remove('rupture')
} else {
    productAvailable.classList.remove('stock')
    productAvailable.classList.add('rupture')
}

const productAdd = document.querySelector('.product__add')
if (!piece.disponibilite) productAdd.setAttribute("hidden", "")

/**
 * Ouvre une modale si le client veut ajouter un produit au panier
 */
productAdd.addEventListener("click", () => {
    const modal = document.querySelector(".modal")
    modal.classList.add("modal-visible")
})

const btnYes = document.querySelector(".modal__yes")
btnYes.addEventListener("click", () => {
    addBasket(piece)
    showTotal.innerText = `${totalBasket()} €`
    const modal = document.querySelector(".modal")
    modal.classList.remove("modal-visible")
})

const btnNo = document.querySelector(".modal__no")
btnNo.addEventListener("click", () => {
    const modal = document.querySelector(".modal")
    modal.classList.remove("modal-visible")
})

const showTotal = document.querySelector(".showTotal")
showTotal.innerText = `${totalBasket()} €`


/**
 * Aperçus des avis
 */
const productComments = document.querySelector(".product__comments")
for (const comment of avis) {
    let nbEtoiles = ""
    switch (comment.nbEtoiles) {
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
    const p = document.createElement('p')
    p.setAttribute("class", "product__comment")
    p.innerHTML = `${nbEtoiles}<br><b>${comment.utilisateur}:</b> ${comment.commentaire}`

    productComments.append(p)
}