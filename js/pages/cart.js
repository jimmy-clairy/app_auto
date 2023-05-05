import { deleteProduct, getBasket, totalBasket } from "../function.js";

const showTotal = document.querySelector(".showTotal")
showTotal.innerText = `${totalBasket()} €`

const basket = getBasket()

const cards = document.querySelector(".cards")
for (const piece of basket) {
    const cardClone = document.getElementById("card-tmp").content.firstElementChild.cloneNode(true)
    cardClone.dataset.id = piece.id

    const img = cardClone.querySelector(".card__img")
    img.src = `../${piece.image}`

    const heading = cardClone.querySelector(".card__heading")
    heading.textContent = piece.nom

    const inputQuantity = cardClone.querySelector(".card__quantity")
    inputQuantity.value = piece.quantity

    const price = cardClone.querySelector(".card__price")
    price.textContent = `Prix : ${piece.prix} €`

    const btnDelete = cardClone.querySelector(".card__delete")
    btnDelete.addEventListener("click", () => {
        const modal = document.querySelector(".modal")
        modal.dataset.id = btnDelete.closest(".card").dataset.id
        modal.classList.add("modal-visible")
    })

    cards.append(cardClone)
}


const btnYes = document.querySelector(".modal__yes")
btnYes.addEventListener("click", () => {
    const modal = document.querySelector(".modal")
    const id = Number(document.querySelector(".modal").dataset.id)
    deleteProduct(id)
    modal.classList.remove("modal-visible")
    showTotal.innerText = `${totalBasket()} €`
})

const btnNo = document.querySelector(".modal__no")
btnNo.addEventListener("click", () => {
    const modal = document.querySelector(".modal")
    modal.classList.remove("modal-visible")
})
