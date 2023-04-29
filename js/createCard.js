export class Card {
    /**
    * Create card with data piece
    * @param {{id:number,
    *          image:string,
    *          nom:string,
    *          prix:number,
    *          categorie:string,
    *          description:string,
    *          disponibilite:boolean}} piece 
    * @returns {HTMLElement}
    */
    constructor(piece) {
        const card = document.createElement("div")
        card.setAttribute("class", "card")
        card.setAttribute("data-id", piece.id)

        const img = document.createElement("img")
        img.setAttribute("class", "card__img")
        img.src = piece.image

        const content = document.createElement("div")
        content.setAttribute("class", "content effet-shadow effet-hover")

        const title = document.createElement("h3")
        title.innerText = piece.nom

        const idPiece = document.createElement("p")
        idPiece.setAttribute("class", "font-bold")
        idPiece.innerText = `Identifiant : ${piece.id}`

        const price = document.createElement("p")
        price.innerText = `Prix: ${piece.prix} € (${piece.prix < 35 ? "€" : "€€€"})`

        const categorie = document.createElement("p")
        categorie.innerText = piece.categorie ?? "(aucune catégorie)"


        const description = document.createElement("p")
        description.innerText = piece.description ?? "Pas de description pour le moment."

        const disponible = document.createElement("p")
        disponible.setAttribute("class", "font-bold")
        disponible.innerText = piece.disponibilite ? "En stock" : "Rupture"

        const btnAvis = document.createElement("button")
        btnAvis.setAttribute("data-id", piece.id)
        btnAvis.innerHTML = "Afficher les avis"
        btnAvis.addEventListener("click", (e) => this.showAvis(e))

        card.append(content)
        content.append(img, title, idPiece, price, categorie, description, disponible, btnAvis)

        return card
    }

    async showAvis(e) {
        const id = e.target.dataset.id
        const content = e.target.parentElement.parentElement

        const res = await fetch(`http://localhost:8081/pieces/${id}/avis`);
        const avis = await res.json();
        console.log(avis);
        if (document.querySelector('.card__avis')) {
            const avisElement = document.querySelector('.card__avis')
            avisElement.textContent = ''
            for (const avi of avis) {
                avisElement.innerHTML += `<b>${avi.utilisateur}:</b> ${avi.commentaire} <br>`
            }
            content.append(avisElement)
        } else {
            const avisElement = document.createElement('p')
            avisElement.setAttribute('class', 'card__avis')
            for (const avi of avis) {
                avisElement.innerHTML += `<b>${avi.utilisateur}:</b> ${avi.commentaire} <br>`
            }
            content.append(avisElement)
        }
        // localStorage.setItem(`Les bonnes Piéces - Avis-${id}`, JSON.stringify(avis))
    }
}