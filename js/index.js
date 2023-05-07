import { postAvis } from "./formAvis.js"
import { Card } from "./Card.js"
import { prixMax, totalBasket } from "./function.js"
import { fetchData } from "./fetchData.js"

// Recupere les data piece 
const pieces = await fetchData("./dataBase/pieces.json")
// Recupere les data avis 
const avis = await fetchData("./dataBase/avis.json")

// Crée les cards
const cards = document.querySelector(".cards")
function showCard(pieces, avis) {
    for (const piece of pieces) {
        cards.appendChild(new Card(piece, avis))
    }
}
showCard(pieces, avis)

postAvis()

const showTotal = document.querySelector(".showTotal")
showTotal.innerText = `${totalBasket()} €`

// Filter -----------------------------------------------------------
const btnTry = document.querySelector(".filtres .btn-try")
btnTry.addEventListener("click", () => {
    // const piecesTry = Array.from(pieces) Autre methode
    const piecesTry = [...pieces]
    piecesTry.sort((a, b) => a.prix - b.prix)
    cards.innerHTML = ""
    showCard(piecesTry, avis)
})

const btnDetry = document.querySelector(".filtres .btn-detry")
btnDetry.addEventListener("click", () => {
    const piecesDetry = [...pieces]
    piecesDetry.sort((a, b) => b.prix - a.prix)
    cards.innerHTML = ""
    showCard(piecesDetry, avis)
})

const btnDispo = document.querySelector(".filtres .btn-dispo")
btnDispo.addEventListener("click", () => {
    const piecesFilter = pieces.filter((piece) => piece.disponibilite)
    cards.innerHTML = ""
    showCard(piecesFilter, avis)
})

const btnNew = document.querySelector(".filtres .btn-new")
btnNew.addEventListener("click", () => {
    const piecesFilter = pieces.filter((piece) => piece.newPiece)
    cards.innerHTML = ""
    showCard(piecesFilter, avis)
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
    showCard(piecesFilter, avis)
})

// Formulaire // Modifie le nombre input.max selon le nombre de pieces
const inputIdPiece = document.getElementById("form__pieceId")
inputIdPiece.max = pieces.length