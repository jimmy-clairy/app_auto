import { addStars } from "./function.js"

export class Card {
    /**
    * Crée une card avec les data
    * @param {{id:number,
    *          image:string,
    *          nom:string,
    *          prix:number,
    *          categorie:string,
    *          description:string,
    *          disponibilite:boolean}} piece 
    * @param {string} avis 
    * @returns {HTMLElement}
    */
    constructor(piece, avis) {
        const cardClone = document.getElementById("card-tmp").content.firstElementChild.cloneNode(true)
        cardClone.setAttribute("data-id", piece.id)

        const cardLink = cardClone.querySelector(".card__link")
        cardLink.href = `./html/product.html?id=${piece.id}`

        const cardNew = cardClone.querySelector(".new")
        if (piece.newPiece) cardNew.style.display = "block"

        const cardImg = cardClone.querySelector(".card__img")
        cardImg.src = piece.image
        cardImg.alt = piece.nom

        const cardHeading = cardClone.querySelector(".card__heading")
        cardHeading.innerHTML = piece.nom

        const cardId = cardClone.querySelector(".card__id")
        cardId.innerHTML = `Identifiant : ${piece.id}`

        const cardPrice = cardClone.querySelector(".card__price")
        cardPrice.innerHTML = `Prix: ${piece.prix} €`

        const cardCategory = cardClone.querySelector(".card__category")
        cardCategory.innerHTML = piece.categorie ?? "(aucune catégorie)"

        const cardDescription = cardClone.querySelector(".card__description")
        cardDescription.innerHTML = piece.description ?? "Pas de description pour le moment."

        const cardAvailable = cardClone.querySelector(".card__available")
        cardAvailable.innerText = piece.disponibilite ? "En stock" : "Rupture"
        if (piece.disponibilite) {
            cardAvailable.classList.add("stock")
            cardAvailable.classList.remove("rupture")
        } else {
            cardAvailable.classList.remove("stock")
            cardAvailable.classList.add("rupture")
        }

        const cardBtn = cardClone.querySelector(".card__btn")
        cardBtn.addEventListener("click", (e) => {
            this.showAvis(e)
        })

        const id = Number(cardClone.dataset.id)
        let cardAvis = cardClone.querySelector(".card__avis")
        cardAvis.innerHTML = this.addAvis(id, avis)

        return cardClone
    }

    /**
     * Ajoute les 3 derniers avis
     * @param {number} id 
     * @param {string} avis 
     * @returns {HTMLElement}
     */
    addAvis(id, avis) {

        const avisIdReverse = avis.filter(a => a.pieceId === id).reverse()
        const last3Avis = []
        for (let i = 0; i < 3; i++) {
            last3Avis.push(avisIdReverse[i])
        }
        return addStars(last3Avis)
    }

    /** @param {PointerEvent} e */
    showAvis(e) {
        const card = e.target.closest(".card")

        const cardAvis = card.querySelector(".card__avis")
        cardAvis.classList.toggle("visible")
    }
}