import { afficherGraphiqueAvis, afficherGraphiqueDisponibles, postAvis } from "./js/avis.js"
import { Card } from "./js/createCard.js"

let pieces = window.localStorage.getItem("Les bonnes Piéces - Pieces")
if (pieces === null) {
    const response = await fetch("http://localhost:8081/pieces")
    pieces = await response.json()
    localStorage.setItem("Les bonnes Piéces - Pieces", JSON.stringify(pieces))
    console.log("appel Api")
} else { pieces = JSON.parse(pieces) }

const fiches = document.querySelector(".fiches")
const cards = document.querySelector(".cards")

function showCard(pieces) {
    for (const piece of pieces) {
        cards.appendChild(new Card(piece))
    }
}
showCard(pieces)
postAvis()
await afficherGraphiqueAvis()
await afficherGraphiqueDisponibles()

const filterLabel = document.getElementById("rangePrice")
filterLabel.addEventListener("change", () => {
    const piecesFilter = pieces.filter((piece) => piece.prix <= filterLabel.value)
    cards.innerHTML = ""
    showCard(piecesFilter)
})
// Card pieces abordables
const piecesLowCost = pieces.filter((piece) => piece.prix <= 35)
const cardLowCost = fiches.querySelector(".abordables")
for (const piece of piecesLowCost) {
    const li = document.createElement("li")
    li.innerText = `${piece.nom}`
    cardLowCost.appendChild(li)
}
// Card pieces disponible
const piecesFree = pieces.filter((piece) => piece.disponibilite)
const cardFree = fiches.querySelector(".dispo")
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