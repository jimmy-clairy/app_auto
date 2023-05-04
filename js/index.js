import { postAvis } from "./avis.js"
import { Card } from "./Card.js"
import { prixMax } from "./function.js"

let pieces = window.localStorage.getItem("Les bonnes Piéces - Pieces")
if (pieces === null) {
    const res = await fetch("db.json")
    let data = await res.json()
    pieces = data.pieces
    localStorage.setItem("Les bonnes Piéces - Pieces", JSON.stringify(pieces))
    console.log("appel Api")
} else { pieces = JSON.parse(pieces) }


const cards = document.querySelector(".cards")

function showCard(pieces) {
    for (const piece of pieces) {
        cards.appendChild(new Card(piece))
    }


}
showCard(pieces)

const btns = cards.querySelectorAll(".card__btn")
btns.forEach(btn => btn.addEventListener("click", async (e) => {
    e.preventDefault()
    const card = btn.closest(".card")
    const id = Number(card.dataset.id)

    const res = await fetch("db.json")
    const data = await res.json()
    // Reverse le tabeleau pour avoir les derniers commentaires
    const avis = data.avis.reverse()

    if (card.querySelector(".card__avis")) {
        const avisElement = card.querySelector(".card__avis")
        avisElement.remove()
    } else {
        const avisElement = document.createElement("p")
        avisElement.setAttribute("class", "card__avis")

        // Affiche les 3 dernier avis
        const maxAvis = 3
        let nbAvis = 0
        for (const avi of avis) {
            if (avi.pieceId === id) {
                if (nbAvis === maxAvis) {
                    return card.appendChild(avisElement)
                }
                let nbEtoiles = ""
                console.log(avi.nbEtoiles)
                switch (avi.nbEtoiles) {
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
                avisElement.innerHTML += `${nbEtoiles}<br> <b>${avi.utilisateur}:</b> ${avi.commentaire} <br><br>`
                nbAvis++
            }
        }
        card.appendChild(avisElement)
    }
}))

postAvis()

// Filter -----------------------------------------------------------
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
const rangePrice = document.getElementById("rangePrice")
const rangePriceMax = document.querySelector(".rangePrice__max")
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