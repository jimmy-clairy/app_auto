const url = new URL(document.location)
const id = Number(url.searchParams.get("id"))
// console.log(id);
async function fetchData() {
    const res = await fetch("../db.json")
    if (res.ok === true) {
        return await res.json()
    }
    throw new Error("Connection impossible server")
}

const data = await fetchData()
const pieces = data.pieces
const piece = pieces.filter(piece => piece.id === id)
// console.log(piece);

const Allcomments = data.avis
const comments = Allcomments.filter(comments => comments.pieceId === id)
// console.log(comments);

const productHeading = document.querySelector(".product__heading")
productHeading.textContent = piece[0].nom

const productImgWrapper = document.querySelector(".product__img-wrapper")

const newPiece = document.createElement("div")
if (piece[0].newPiece) {
    newPiece.setAttribute("class", "card__new animatedALerte")
    newPiece.innerText = "Nouveau"
}

const productImg = document.querySelector(".product__img")
productImg.src = `../${piece[0].image}`
productImg.alt = piece[0].nom

const productDescription = document.querySelector(".product__description")
productDescription.textContent = piece[0].description ?? "Pas de description pour le moment."

const productPrice = document.querySelector(".product__price")
productPrice.textContent = `Prix: ${piece[0].prix}€`

const productAvailable = document.querySelector(".product__available")
productAvailable.textContent = piece[0].disponibilite ? "En stock" : "Rupture"
if (piece[0].disponibilite) {
    productAvailable.classList.add('stock')
    productAvailable.classList.remove('rupture')
} else {
    productAvailable.classList.remove('stock')
    productAvailable.classList.add('rupture')
}
const productAdd = document.querySelector('.product__add')
if (!piece[0].disponibilite) productAdd.setAttribute("disabled", "")

const prodcutComments = document.querySelector(".product__comments")
for (const comment of comments) {
    let nbEtoiles = ""
    switch (comment.nbEtoiles) {
        case 1:
            nbEtoiles = "⭐"
            break;
        case 2:
            nbEtoiles = "⭐⭐"
            break;
        case 3:
            nbEtoiles = "⭐⭐⭐"
            break;
        case 4:
            nbEtoiles = "⭐⭐⭐⭐"
            break;
        case 5:
            nbEtoiles = "⭐⭐⭐⭐⭐"
            break;

        default:
            break;
    }
    const p = document.createElement('p')
    p.setAttribute("class", "product__comment")
    p.innerHTML = `${nbEtoiles}<br><b>${comment.utilisateur}:</b> ${comment.commentaire}`

    productImgWrapper.append(newPiece)
    prodcutComments.append(p)
}