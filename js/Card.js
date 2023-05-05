export class Card {
    /**
    * Crée une card avec les data de piece
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
        const cardClone = document.getElementById("card-tmp").content.firstElementChild.cloneNode(true)
        cardClone.setAttribute("data-id", piece.id)

        const cardLink = cardClone.querySelector(".card__link")
        cardLink.href = `./html/product.html?id=${piece.id}`

        const cardNew = cardClone.querySelector(".card__new")
        if (!piece.newPiece) cardNew.style.display = "none"

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

        return cardClone
    }

    /** @param {PointerEvent} e */
    async showAvis(e) {
        const card = e.target.closest(".card")
        const id = Number(card.dataset.id)

        const cardAvis = card.querySelector(".card__avis")
        cardAvis.classList.toggle("visible")

        if (cardAvis.innerHTML === "") {
            const res = await fetch("./dataBase/avis.json")
            const avis = await res.json()
            console.log("Appel API");

            // Cherche les avis par rapport à l'ID et retourne le tableau
            const avisIdReverse = avis.filter(a => a.pieceId === id).reverse()
            // Selectionne les 3 dernier avis
            const last3Avis = []
            for (let i = 0; i < 3; i++) {
                last3Avis.push(avisIdReverse[i])
            }

            let nbEtoiles = ""
            for (const avis of last3Avis) {
                switch (avis.nbEtoiles) {
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
                cardAvis.innerHTML += `${nbEtoiles}<br> <b>${avis.utilisateur}:</b> ${avis.commentaire} <br><br>`
            }
        }
    }
}

// Methode 2 create element

// export class Card {
//     /**
//     * Create card with data piece
//     * @param {{id:number,
//     *          image:string,
//     *          nom:string,
//     *          prix:number,
//     *          categorie:string,
//     *          description:string,
//     *          disponibilite:boolean}} piece
//     * @returns {HTMLElement}
//     */
//     constructor(piece) {
//         const card = document.createElement("div")
//         card.setAttribute("class", "card")
//         card.setAttribute("data-id", piece.id)

//         const cardContainer = document.createElement("div")
//         cardContainer.setAttribute("class", "card__container border")

//         const cardLink = document.createElement("a")
//         cardLink.setAttribute("class", "card__link")
//         cardLink.href = `./html/product.html?id=${piece.id}`

//         const cardNew = document.createElement("div")
//         if (piece.newPiece) {
//             cardNew.setAttribute("class", "card__new animatedALerte")
//             cardNew.innerText = "Nouveau"
//         }

//         const cardImg = document.createElement("img")
//         cardImg.setAttribute("class", "card__img")
//         cardImg.src = piece.image
//         cardImg.alt = piece.nom
//         cardImg.width = 500
//         cardImg.height = 130


//         const cardBody = document.createElement("div")
//         cardBody.setAttribute("class", "card__body")

//         const heading = document.createElement("h3")
//         heading.setAttribute("class", "card__heading")
//         heading.innerText = piece.nom

//         const cardId = document.createElement("p")
//         cardId.innerText = `Identifiant : ${piece.id}`

//         const cardPrice = document.createElement("p")
//         cardPrice.setAttribute("class", "font-bold")
//         cardPrice.innerText = `Prix: ${piece.prix} €`

//         const cardCategory = document.createElement("p")
//         cardCategory.setAttribute("class", "card__category")
//         cardCategory.innerText = piece.categorie ?? "(aucune catégorie)"

//         const cardDescription = document.createElement("p")
//         cardDescription.setAttribute("class", "card__description")
//         cardDescription.innerText = piece.description ?? "Pas de description pour le moment."

//         const cardAvailable = document.createElement("p")
//         cardAvailable.setAttribute("class", "card__available font-bold")
//         cardAvailable.innerText = piece.disponibilite ? "En stock" : "Rupture"
//         if (piece.disponibilite) {
//             cardAvailable.classList.add("stock")
//             cardAvailable.classList.remove("rupture")
//         } else {
//             cardAvailable.classList.remove("stock")
//             cardAvailable.classList.add("rupture")
//         }

//         const cardBtn = document.createElement("button")
//         cardBtn.setAttribute("class", "card__btn btn border")
//         cardBtn.innerHTML = "Afficher les 3 derniers avis"
//         cardBtn.addEventListener("click", (e) => {
//             this.showAvis(e)
//         })

//         const cardAvis = document.createElement("div")
//         cardAvis.setAttribute("class", "card__avis")

//         card.append(cardContainer, cardAvis)
//         cardContainer.append(cardNew, cardImg, cardBody, cardBtn)
//         cardBody.append(heading, cardId, cardPrice, cardCategory, cardDescription, cardAvailable)

//         return card
//     }

//     async showAvis(e) {
//         const btn = e.target
//         const card = btn.closest(".card")
//         const id = Number(card.dataset.id)
//         const cardAvis = card.querySelector(".card__avis")
//         cardAvis.classList.toggle("visible")

//         if (cardAvis.innerHTML === "") {
//             const res = await fetch("./dataBase/avis.json")
//             const avis = await res.json()
//             console.log("Appel API");

//             // Cherche les avis par rapport à l'ID et retourne le tableau
//             const avisIdReverse = avis.filter(a => a.pieceId === id).reverse()
//             // Selectionne les 3 dernier avis
//             const last3Avis = []
//             for (let i = 0; i < 3; i++) {
//                 last3Avis.push(avisIdReverse[i])
//             }

//             let nbEtoiles = ""
//             for (const avis of last3Avis) {
//                 switch (avis.nbEtoiles) {
//                     case 1:
//                         nbEtoiles = "⭐"
//                         break
//                     case 2:
//                         nbEtoiles = "⭐⭐"
//                         break
//                     case 3:
//                         nbEtoiles = "⭐⭐⭐"
//                         break
//                     case 4:
//                         nbEtoiles = "⭐⭐⭐⭐"
//                         break
//                     case 5:
//                         nbEtoiles = "⭐⭐⭐⭐⭐"
//                         break

//                     default:
//                         break
//                 }
//                 cardAvis.innerHTML += `${nbEtoiles}<br> <b>${avis.utilisateur}:</b> ${avis.commentaire} <br><br>`
//             }
//         }
//     }
// }