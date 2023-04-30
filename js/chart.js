export async function chartAvis() {
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
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
            ],
            borderWidth: 1
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
    new Chart(
        document.querySelector("#graphique-avis"),
        config,
    )
}
export async function chartFree() {
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
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)'
            ],
            borderWidth: 1
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
    new Chart(
        document.querySelector("#graphique-dispo"),
        config,
    )
}