export function postAvis() {
    const formulaireAvis = document.querySelector(".form")
    formulaireAvis.addEventListener("submit", function (event) {
        event.preventDefault()
        formulaireAvis.reset()
        // const avis = {
        //     pieceId: Number(formulaireAvis.pieceId.value),
        //     utilisateur: formulaireAvis.utilisateur.value,
        //     commentaire: formulaireAvis.commentaire.value,
        //     nbEtoiles: Number(formulaireAvis.nbEtoiles.value)
        // }
        // fetch("http://localhost:8081/avis", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(avis)
        // })
    })
}