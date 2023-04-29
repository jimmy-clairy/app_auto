/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
export function postAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis")
    formulaireAvis.addEventListener("submit", function (event) {
        event.preventDefault()
        const avis = {
            pieceId: Number(formulaireAvis.pieceId.value),
            utilisateur: formulaireAvis.utilisateur.value,
            commentaire: formulaireAvis.commentaire.value,
            nbEtoiles: Number(formulaireAvis.nbEtoiles.value)
        }
        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(avis)
        })
    })
}

export async function afficherGraphiqueAvis() {
    const avis = await fetch("http://localhost:8081/avis").then(avis => avis.json())
    const nb_commentaires = [0, 0, 0, 0, 0]

    for (let commentaire of avis) {
        nb_commentaires[commentaire.nbEtoiles - 1]++
    }

    const labels = ["5", "4", "3", "2", "1"]
    // Données et personnalisation du graphique
    const data = {
        labels: labels,
        datasets: [{
            label: "Étoiles attribuées",
            data: nb_commentaires.reverse(),
            backgroundColor: "#5178eb",
        }],
    }
    // Objet de configuration final
    const config = {
        type: "bar",
        data: data,
        options: {
            indexAxis: "y",
        },
    }
    // Rendu du graphique dans l"élément canvas
    const graphiqueAvis = new Chart(
        document.querySelector("#graphique-avis"),
        config,
    )
}
export async function afficherGraphiqueDisponibles() {
    const pieces = await fetch("http://localhost:8081/pieces").then(pieces => pieces.json())
    const nb_piecesDispo = [0, 0]
    for (let piece of pieces) {
        piece.disponibilite ? nb_piecesDispo[0]++ : nb_piecesDispo[1]++
    }
    const labels = ["Disponible", "Non disponible"]

    // Données et personnalisation du graphique
    const data = {
        labels: labels,
        datasets: [{
            label: "Pieces disponible",
            data: nb_piecesDispo,
            backgroundColor: "#5178eb",
        }],
    }
    // Objet de configuration final
    const config = {
        type: "bar",
        data: data,
        options: {
            indexAxis: "x",
        },
    }
    // Rendu du graphique dans l"élément canvas
    const graphiqueAvis = new Chart(
        document.querySelector("#graphique-dispo"),
        config,
    )
}