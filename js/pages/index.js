import { fetchData } from "../fetchData.js"
import { Card } from "../Card.js"
import { totalBasket } from "../function.js"
import { chartAvis } from "../chart.js"

const pieces = await fetchData("./dataBase/pieces.json")
const allAvis = await fetchData("./dataBase/avis.json")

/** Cards */
const cards = document.querySelector(".cards")
// Crée les cards
function showCard(pieces, allAvis) {
    for (const piece of pieces) {
        cards.appendChild(new Card(piece, allAvis))
    }
}
showCard(pieces, allAvis)

/**Prix Panier */
const showTotal = document.querySelector(".showTotal")
showTotal.innerText = `${totalBasket()} €`

/** Filtres */
const btnTry = document.querySelector(".filtres .btn-try")
btnTry.addEventListener("click", () => {
    // const piecesTry = Array.from(pieces) Autre methode
    const piecesTry = [...pieces]
    piecesTry.sort((a, b) => a.prix - b.prix)
    cards.innerHTML = ""
    showCard(piecesTry, allAvis)
})

const btnDetry = document.querySelector(".filtres .btn-detry")
btnDetry.addEventListener("click", () => {
    const piecesDetry = [...pieces]
    piecesDetry.sort((a, b) => b.prix - a.prix)
    cards.innerHTML = ""
    showCard(piecesDetry, allAvis)
})

const btnDispo = document.querySelector(".filtres .btn-dispo")
btnDispo.addEventListener("click", () => {
    const piecesFilter = pieces.filter((piece) => piece.disponibilite)
    cards.innerHTML = ""
    showCard(piecesFilter, allAvis)
})

const btnNew = document.querySelector(".filtres .btn-new")
btnNew.addEventListener("click", () => {
    const piecesFilter = pieces.filter((piece) => piece.newPiece)
    cards.innerHTML = ""
    showCard(piecesFilter, allAvis)
})

/** Range */
/**
 * Donne le plus elevé en entier avec une dixaine superieur ex: 141.5 => 150
 * @param {Object} objet
 * @returns {number}
 */
function prixMax(objet) {
    const piecesTry = [...objet]
    piecesTry.sort((a, b) => b.prix - a.prix)
    return Math.round(((piecesTry[0].prix + 4.99) / 10)) * 10
}
// Permet d"ajuster le prix sur le range avec la piece la plus chere
const rangePriceMax = document.querySelector(".rangePrice__max")
const rangePrice = document.querySelector("#rangePrice")
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
    showCard(piecesFilter, allAvis)
})

/**Graphiques */
// Graphique pour les avis
const nbCommentaires = [0, 0, 0, 0, 0]
for (let avis of allAvis) {
    nbCommentaires[avis.nbEtoiles - 1]++
}
nbCommentaires.reverse()
const ctx = document.getElementById("graph-avis")
chartAvis(ctx, nbCommentaires, "y")

// Graphique pour les pieces
const nbPiecesDispo = [0, 0]
for (let piece of pieces) {
    piece.disponibilite ? nbPiecesDispo[0]++ : nbPiecesDispo[1]++
}
const ctx1 = document.getElementById("graph-dispo")
new Chart(ctx1, {
    type: "bar",
    data: {
        labels: ["Disponible", "Non disponible"],
        datasets: [{
            label: "Pieces disponible",
            data: nbPiecesDispo,
            backgroundColor: [
                "#ff2a2a33",
                "#00000033"
            ],
            borderColor: [
                "#ff2a2a",
                "#000"
            ],
            borderWidth: 1
        }]
    }
})

/** Formulaire Avis */
const formulaireAvis = document.querySelector(".form")
formulaireAvis.addEventListener("submit", function (event) {
    event.preventDefault()
    formulaireAvis.reset()
})

// Modifie le nombre input.max selon le nombre de pieces
const inputIdPiece = document.getElementById("form__pieceId")
inputIdPiece.max = pieces.length