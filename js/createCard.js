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
        console.log(piece);
        const card = document.createElement("div")
        card.setAttribute("class", "card")
        card.setAttribute("data-id", piece.id)

        const newPiece = document.createElement("div")
        if (piece.newPiece) {
            newPiece.setAttribute("class", "newPiece")
            newPiece.innerText = "Nouveau"
        }

        const content = document.createElement("div")
        content.setAttribute("class", "card__content border")

        const img = document.createElement("img")
        img.setAttribute("class", "card__img")
        img.src = piece.image

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
        btnAvis.setAttribute("class", "card__btn btn border")
        btnAvis.innerHTML = "Afficher les avis"

        card.append(newPiece, content)
        content.append(img, title, idPiece, price, categorie, description, disponible, btnAvis)

        return card
    }
}