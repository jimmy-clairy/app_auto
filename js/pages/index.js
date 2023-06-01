import { fetchData } from "../fetchData.js";
import { Card } from "../Card.js";
import { totalBasket } from "../function.js";
import { chartAvis } from "../chart.js";

/**
 * Affiche les cartes des pièces.
 * @param {Object[]} pieces - Les données des pièces.
 * @param {Object[]} allAvis - Les données des avis.
 */
function showCard(pieces, allAvis) {
    const cards = document.querySelector(".cards");
    for (const piece of pieces) {
        cards.appendChild(new Card(piece, allAvis));
    }
}

/**
 * Affiche le prix total du panier.
 * @param {number} total - Le prix total.
 */
function showTotal(total) {
    const showTotal = document.querySelector(".showTotal");
    showTotal.innerText = `${total} €`;
}

/**
 * Trie les pièces par prix croissant.
 */
function sortPiecesByPriceAsc() {
    const cards = document.querySelector(".cards");
    const piecesTry = [...pieces];
    piecesTry.sort((a, b) => a.prix - b.prix);
    cards.innerHTML = "";
    showCard(piecesTry, allAvis);
}

/**
 * Trie les pièces par prix décroissant.
 */
function sortPiecesByPriceDesc() {
    const cards = document.querySelector(".cards");
    const piecesDetry = [...pieces];
    piecesDetry.sort((a, b) => b.prix - a.prix);
    cards.innerHTML = "";
    showCard(piecesDetry, allAvis);
}

/**
 * Filtre les pièces disponibles.
 */
function filterAvailablePieces() {
    const cards = document.querySelector(".cards");
    const piecesFilter = pieces.filter((piece) => piece.disponibilite);
    cards.innerHTML = "";
    showCard(piecesFilter, allAvis);
}

/**
 * Filtre les nouvelles pièces.
 */
function filterNewPieces() {
    const cards = document.querySelector(".cards");
    const piecesFilter = pieces.filter((piece) => piece.newPiece);
    cards.innerHTML = "";
    showCard(piecesFilter, allAvis);
}

/**
 * Récupère le prix maximum arrondi pour l'utilisation dans le range.
 * @param {Object[]} pieces - Les données des pièces.
 * @returns {number} Le prix maximum arrondi.
 */
function getPrixMax(pieces) {
    const piecesTry = [...pieces];
    piecesTry.sort((a, b) => b.prix - a.prix);
    return Math.round((piecesTry[0].prix + 4.99) / 10) * 10;
}

/**
 * Filtre les pièces en fonction de la valeur du range de prix.
 */
function filterPiecesByPrice() {
    const cards = document.querySelector(".cards");
    const rangePrice = document.querySelector("#rangePrice");
    const piecesFilter = pieces.filter((piece) => piece.prix <= rangePrice.value);
    cards.innerHTML = "";
    showCard(piecesFilter, allAvis);
}

/**
 * Initialise les graphiques des avis et des pièces.
 * @param {Object[]} allAvis - Les données des avis.
 * @param {Object[]} pieces - Les données des pièces.
 */
function initializeCharts(allAvis, pieces) {
    // Graphique pour les avis
    const nbCommentaires = [0, 0, 0, 0, 0];
    for (let avis of allAvis) {
        nbCommentaires[avis.nbEtoiles - 1]++;
    }
    nbCommentaires.reverse();
    const ctx = document.getElementById("graph-avis");
    chartAvis(ctx, nbCommentaires, "y");

    // Graphique pour les pièces
    const nbPiecesDispo = [0, 0];
    for (let piece of pieces) {
        piece.disponibilite ? nbPiecesDispo[0]++ : nbPiecesDispo[1]++;
    }
    const ctx1 = document.getElementById("graph-dispo");
    new Chart(ctx1, {
        type: "bar",
        data: {
            labels: ["Disponible", "Non disponible"],
            datasets: [
                {
                    label: "Pieces disponible",
                    data: nbPiecesDispo,
                    backgroundColor: ["#ff2a2a33", "#00000033"],
                    borderColor: ["#ff2a2a", "#000"],
                    borderWidth: 1,
                },
            ],
        },
    });
}

/**
 * Initialise le formulaire des avis.
 */
function initializeAvisForm() {
    const formulaireAvis = document.querySelector(".form");
    formulaireAvis.addEventListener("submit", function (event) {
        event.preventDefault();
        formulaireAvis.reset();
    });
}

/**
 * Met à jour la valeur maximale de l'input ID de pièce.
 * @param {number} max - La valeur maximale.
 */
function updateInputIdPieceMax(max) {
    const inputIdPiece = document.getElementById("form__pieceId");
    inputIdPiece.max = max;
}

/**
 * Appel des fonctions et exécution du code
 * @param {Object[]} pieces 
 * @param {Object[]} allAvis 
 */
function start(pieces, allAvis) {

    // Affiche les cartes des pièces
    showCard(pieces, allAvis);
    // Affiche le prix total du panier
    showTotal(totalBasket());
    // Trie les pièces par prix croissant
    const btnTry = document.querySelector(".filtres .btn-try");
    btnTry.addEventListener("click", sortPiecesByPriceAsc);
    // Trie les pièces par prix décroissant
    const btnDetry = document.querySelector(".filtres .btn-detry");
    btnDetry.addEventListener("click", sortPiecesByPriceDesc);
    // Filtre les pièces disponibles
    const btnDispo = document.querySelector(".filtres .btn-dispo");
    btnDispo.addEventListener("click", filterAvailablePieces);
    // Filtre les nouvelles pièces
    const btnNew = document.querySelector(".filtres .btn-new");
    btnNew.addEventListener("click", filterNewPieces);
    // Met à jour le range de prix
    const rangePriceMax = document.querySelector(".rangePrice__max");
    const rangePrice = document.querySelector("#rangePrice");
    const value = document.querySelector("#rangePricevalue");
    const maxPrice = getPrixMax(pieces);
    rangePriceMax.innerText = maxPrice;
    rangePrice.max = maxPrice;
    rangePrice.value = maxPrice;
    value.textContent = maxPrice;
    rangePrice.addEventListener("input", (event) => {
        value.textContent = event.target.value;
    });
    rangePrice.addEventListener("change", filterPiecesByPrice);
    // Initialise les graphiques
    initializeCharts(allAvis, pieces);
    // Initialise le formulaire des avis
    initializeAvisForm();
    // Met à jour la valeur maximale de l'input ID de pièce
    updateInputIdPieceMax(pieces.length);
}

/**
 * Les données des pièces.
 * @type {Object[]}
 */
let pieces = await fetchData("./dataBase/pieces.json");

/**
 * Les données des avis.
 * @type {Object[]}
 */
let allAvis = await fetchData("./dataBase/avis.json");

start(pieces, allAvis)