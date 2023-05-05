import { postAvis } from "./avis.js"
import { Card } from "./Card.js"
import { prixMax } from "./function.js"

let pieces = window.localStorage.getItem("Les bonnes Piéces - Pieces")
if (pieces === null) {
    const res = await fetch("./dataBase/pieces.json")
    if (res.ok !== true) {
        throw new Error("Connexion serveur impossible")
    }
    pieces = await res.json()
    localStorage.setItem("Les bonnes Piéces - Pieces", JSON.stringify(pieces))
    console.log("Appel API")

} else { pieces = JSON.parse(pieces) }

const cards = document.querySelector(".cards")
function showCard(pieces) {
    for (const piece of pieces) {
        cards.appendChild(new Card(piece))
    }
}
showCard(pieces)
postAvis()

// Filter -----------------------------------------------------------
const btnTry = document.querySelector(".filtres .btn-try")
btnTry.addEventListener("click", () => {
    // const piecesTry = Array.from(pieces) Autre methode
    const piecesTry = [...pieces]
    piecesTry.sort((a, b) => a.prix - b.prix)
    cards.innerHTML = ""
    showCard(piecesTry)
})

const btnDetry = document.querySelector(".filtres .btn-detry")
btnDetry.addEventListener("click", () => {
    const piecesDetry = [...pieces]
    piecesDetry.sort((a, b) => b.prix - a.prix)
    cards.innerHTML = ""
    showCard(piecesDetry)
})

const btnDispo = document.querySelector(".filtres .btn-dispo")
btnDispo.addEventListener("click", () => {
    const piecesFilter = pieces.filter((piece) => piece.disponibilite)
    cards.innerHTML = ""
    showCard(piecesFilter)
})

const btnNew = document.querySelector(".filtres .btn-new")
btnNew.addEventListener("click", () => {
    const piecesFilter = pieces.filter((piece) => piece.newPiece)
    cards.innerHTML = ""
    showCard(piecesFilter)
})

// Permet d"ajuster le prix sur le range avec la piece la plus chere
const rangePriceMax = document.querySelector(".rangePrice__max")
const rangePrice = document.getElementById("rangePrice")
const value = document.querySelector("#rangePricevalue")
rangePriceMax.innerText = prixMax(pieces)
rangePrice.max = prixMax(pieces)
rangePrice.value = prixMax(pieces)
value.textContent = prixMax(pieces)
rangePrice.addEventListener("input", (event) => {
    value.textContent = event.target.value
})

rangePrice.addEventListener("change", () => {
    const piecesFilter = pieces.filter((piece) => piece.prix <= rangePrice.value)
    cards.innerHTML = ""
    showCard(piecesFilter)
})

// Données ----------------------------------------------------------------------------
const btnUpdate = document.querySelector(".filtres .btn-maj")
btnUpdate.addEventListener("click", () => localStorage.removeItem("Les bonnes Piéces - Pieces"))

// Form
// Modifie le nombre input.max selon le nombre de pieces
const inputIdPiece = document.getElementById("form__pieceId")
inputIdPiece.max = pieces.length