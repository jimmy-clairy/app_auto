import { fetchData } from "../fetchData.js"
import { addBasket, getBasket, showTotal, totalBasket } from "../function.js"

const url = new URL(document.location)
const id = Number(url.searchParams.get("id"))

const pieces = await fetchData("../dataBase/pieces.json")
const foundPiece = pieces.filter(piece => piece.id === id)
const piece = foundPiece[0]

const allAvis = await fetchData("../dataBase/avis.json")
const avis = allAvis.filter(a => a.pieceId === id).reverse()

/** Crée un produit a partir des données */
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
productPrice.textContent = `Prix: ${piece.prix} €`

const productAvailable = document.querySelector(".product__available")
productAvailable.textContent = piece.disponibilite ? "En stock" : "Rupture"
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

/** Formualire d'ajout du produit au panier */
formAddCart.addEventListener("submit", (e) => {
    e.preventDefault()
    // delete piece.prix
    piece.quantity = Number(formAddCart.quantity.value)

    const basket = getBasket("basket")
    const foundProduct = basket.find(p => p.id === piece.id)
    if (foundProduct) {
        const modal = document.querySelector(".modal")
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
    const modal = document.querySelector(".modal")
    modal.style.display = "none"
    addBasket(piece)
    const showTotal = document.querySelector(".showTotal")
    showTotal.innerText = `${totalBasket()} €`
})

const btnNo = document.querySelector(".modal__btn-no")
btnNo.addEventListener("click", () => {
    const modal = document.querySelector(".modal")
    modal.style.display = "none"
})

/** Aperçus des avis */
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