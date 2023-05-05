import { addBasket } from "../function.js"


const url = new URL(document.location)
const id = Number(url.searchParams.get("id"))
// console.log(id)
async function fetchPieces() {
    const res = await fetch("../dataBase/pieces.json")
    if (res.ok === true) {
        return await res.json()
    }
    throw new Error("Connection impossible server")
}
async function fetchAvis() {
    const res = await fetch("../dataBase/avis.json")
    if (res.ok === true) {
        return await res.json()
    }
    throw new Error("Connection impossible server")
}

const pieces = await fetchPieces()

const foundPiece = pieces.filter(piece => piece.id === id)
const piece = foundPiece[0]

const allAvis = await fetchAvis()
const avis = allAvis.filter(a => a.pieceId === id).reverse()


const productHeading = document.querySelector(".product__heading")
productHeading.textContent = piece.nom

const productImgWrapper = document.querySelector(".product__img-wrapper")

const newPiece = document.createElement("div")
if (piece.newPiece) {
    newPiece.setAttribute("class", "card__new animatedALerte")
    newPiece.innerText = "Nouveau"
}

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

productAdd.addEventListener("click", () => {
    const modal = document.querySelector(".modal")
    modal.classList.add("modal-visible")
})

const btnYes = document.querySelector(".modal__yes")
btnYes.addEventListener("click", () => {
    addBasket(piece)
    const modal = document.querySelector(".modal")
    modal.classList.remove("modal-visible")
})

const btnNo = document.querySelector(".modal__no")
btnNo.addEventListener("click", () => {
    const modal = document.querySelector(".modal")
    modal.classList.remove("modal-visible")
})

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

    productImgWrapper.append(newPiece)
    productComments.append(p)
}