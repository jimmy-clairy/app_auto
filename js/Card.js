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
        // console.log(piece);
        const card = document.createElement("a")
        card.setAttribute("class", "card")
        card.setAttribute("data-id", piece.id)
        card.href = `./html/product.html?id=${piece.id}`

        const newPiece = document.createElement("div")
        if (piece.newPiece) {
            newPiece.setAttribute("class", "card__new animatedALerte")
            newPiece.innerText = "Nouveau"
        }

        const content = document.createElement("div")
        content.setAttribute("class", "card__content border")

        const img = document.createElement("img")
        img.setAttribute("class", "card__img")
        img.src = piece.image
        img.alt = piece.nom
        img.width = 700
        img.height = 400

        const title = document.createElement("h3")
        title.innerText = piece.nom

        const idPiece = document.createElement("p")
        idPiece.innerText = `Identifiant : ${piece.id}`

        const price = document.createElement("p")
        price.setAttribute("class", "font-bold")
        price.innerText = `Prix: ${piece.prix} €`

        const categorie = document.createElement("p")
        categorie.innerText = piece.categorie ?? "(aucune catégorie)"

        const description = document.createElement("p")
        description.innerText = piece.description ?? "Pas de description pour le moment."

        const disponible = document.createElement("p")
        disponible.setAttribute("class", "font-bold")
        disponible.innerText = piece.disponibilite ? "En stock" : "Rupture"
        if (piece.disponibilite) {
            disponible.classList.add("stock")
            disponible.classList.remove("rupture")
        } else {
            disponible.classList.remove("stock")
            disponible.classList.add("rupture")
        }

        const btnAvis = document.createElement("button")
        btnAvis.setAttribute("class", "card__btn btn border")
        btnAvis.innerHTML = "Afficher les 3 derniers avis"

        card.append(newPiece, content)
        content.append(img, title, idPiece, price, categorie, description, disponible, btnAvis)

        return card
    }
}