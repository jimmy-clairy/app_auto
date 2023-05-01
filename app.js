// import { postAvis } from "./js/avis.js"
import { Card } from "./js/createCard.js"

let pieces = window.localStorage.getItem("Les bonnes Piéces - Pieces")
if (pieces === null) {
    const res = await fetch("db.json")
    let data = await res.json()
    pieces = data.pieces
    localStorage.setItem("Les bonnes Piéces - Pieces", JSON.stringify(pieces))
    console.log("appel Api")
} else { pieces = JSON.parse(pieces) }

const fiches = document.querySelector(".fiches")
const cards = document.querySelector(".cards")

function showCard(pieces) {
    for (const piece of pieces) {
        cards.appendChild(new Card(piece))
    }

    const btns = cards.querySelectorAll(".card__btn")

    btns.forEach(btn => btn.addEventListener("click", async () => {
        const id = Number(btn.dataset.id)

        const content = btn.closest(".card")

        const res = await fetch("db.json");
        const data = await res.json();
        const avis = data.avis

        if (content.querySelector(".card__avis")) {
            const avisElement = content.querySelector(".card__avis")
            avisElement.remove()
        } else {
            const avisElement = document.createElement("p")
            avisElement.setAttribute("class", "card__avis")
            for (const avi of avis) {
                if (avi.pieceId === id) {
                    avisElement.innerHTML += `<b>${avi.utilisateur}:</b> ${avi.commentaire} <br>`
                }
            }
            content.appendChild(avisElement)
        }
    }))
}
showCard(pieces)

// postAvis()

const filterLabel = document.getElementById("rangePrice")
filterLabel.addEventListener("change", () => {
    const piecesFilter = pieces.filter((piece) => piece.prix <= filterLabel.value)
    cards.innerHTML = ""
    showCard(piecesFilter)
})

// Card pieces abordables
const piecesLowCost = pieces.filter((piece) => piece.prix <= 35)
const cardLowCost = document.getElementById("abordables")
for (const piece of piecesLowCost) {
    const li = document.createElement("li")
    li.innerText = `${piece.nom}`
    cardLowCost.appendChild(li)
}
// Card pieces disponible
const piecesFree = pieces.filter((piece) => piece.disponibilite)
const cardFree = document.getElementById("dispo")
for (const piece of piecesFree) {
    const li = document.createElement("li")
    li.innerText = `${piece.nom} - ${piece.prix}€`
    cardFree.appendChild(li)
}
const btnTry = document.querySelector(".filtres .btn-try")
btnTry.addEventListener("click", () => {
    // const piecesTry = Array.from(pieces) Other methode
    const piecesTry = [...pieces]
    piecesTry.sort((a, b) => a.prix - b.prix)
    cards.innerHTML = ""
    showCard(piecesTry)
})
const btnDetry = document.querySelector(".filtres .btn-detry")
btnDetry.addEventListener("click", () => {
    const piecesTry = [...pieces]
    piecesTry.sort((a, b) => b.prix - a.prix)
    cards.innerHTML = ""
    showCard(piecesTry)
})
const btnFilter = document.querySelector(".filtres .btn-filter")
btnFilter.addEventListener("click", () => {
    const piecesFilter = pieces.filter((piece) => piece.prix <= 35)
    cards.innerHTML = ""
    showCard(piecesFilter)
})
const btnFilterDesc = document.querySelector(".filtres .btn-filter-desc")
btnFilterDesc.addEventListener("click", () => {
    const piecesFilter = pieces.filter((piece) => piece.description)
    cards.innerHTML = ""
    showCard(piecesFilter)
})
const btnFilterDispo = document.querySelector(".filtres .btn-filter-dispo")
btnFilterDispo.addEventListener("click", () => {
    const piecesFilter = pieces.filter((piece) => piece.disponibilite)
    cards.innerHTML = ""
    showCard(piecesFilter)
})
const btnUpdate = document.querySelector(".filtres .btn-maj")
btnUpdate.addEventListener("click", () => localStorage.removeItem("Les bonnes Piéces - Pieces"))

// Modifie le nombre input.max selon le nombre de pieces
const inputIdPiece = document.getElementById("pieceId")
inputIdPiece.max = pieces.length