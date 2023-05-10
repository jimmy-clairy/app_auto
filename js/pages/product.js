import { fetchData } from "../fetchData.js"
import { addBasket, addStars, getBasket, showTotal } from "../function.js"
import { chartAvis } from "../chart.js"

const url = new URL(document.location)
const id = Number(url.searchParams.get("id"))

const pieces = await fetchData("../dataBase/pieces.json")
const foundPiece = pieces.filter(piece => piece.id === id)
const piece = foundPiece[0]

const allAvis = await fetchData("../dataBase/avis.json")
const avis = allAvis.filter(a => a.pieceId === id).reverse()

/** Crée un produit a partir des données */
const productHeading = document.querySelector(".product__heading")
productHeading.innerText = piece.nom

const newPiece = document.querySelector(".new")
if (piece.newPiece) newPiece.style.display = "block"

const productImg = document.querySelector(".product__img")
productImg.src = `../${piece.image}`
productImg.alt = piece.nom

const productDescription = document.querySelector(".product__description")
productDescription.innerText = piece.description ?? "Pas de description pour le moment."

const productPrice = document.querySelector(".product__price")
productPrice.innerText = `Prix: ${piece.prix} €`

const productAvailable = document.querySelector(".product__available")
productAvailable.innerText = piece.disponibilite ? "En stock" : "Rupture"
if (piece.disponibilite) {
    productAvailable.classList.add('stock')
    productAvailable.classList.remove('rupture')
} else {
    productAvailable.classList.remove('stock')
    productAvailable.classList.add('rupture')
}

const formAddCart = document.querySelector('.form__add-cart')
if (!piece.disponibilite) formAddCart.setAttribute("hidden", "")

showTotal()

/** Formulaire d'ajout du produit au panier */
const modal = document.querySelector(".modal")
formAddCart.addEventListener("submit", (e) => {
    e.preventDefault()
    // delete piece.prix
    piece.quantity = Number(formAddCart.quantity.value)

    const basket = getBasket("basket")
    const foundProduct = basket.find(p => p.id === piece.id)
    if (foundProduct) {
        modal.style.display = "flex"
    } else {
        const popUp = document.querySelector(".popUp")
        popUp.style.display = "block"
        setTimeout(() => {
            popUp.style.display = "none"
        }, 2000)
        addBasket(piece)
        showTotal()
    }
})

const btnYes = document.querySelector(".modal__btn-yes")
btnYes.addEventListener("click", () => {
    modal.style.display = "none"
    addBasket(piece)
    showTotal()
})

const btnNo = document.querySelector(".modal__btn-no")
btnNo.addEventListener("click", () => {
    modal.style.display = "none"
})

/** Graphique pour les avis */
const nbCommentaires = [0, 0, 0, 0, 0]
for (let commentaire of avis) {
    nbCommentaires[commentaire.nbEtoiles - 1]++
}
nbCommentaires.reverse()
const ctx = document.getElementById('myChart');
chartAvis(ctx, nbCommentaires)

/** Aperçus des avis */
let productComments = document.querySelector(".product__comments")
productComments.innerHTML = addStars(avis)