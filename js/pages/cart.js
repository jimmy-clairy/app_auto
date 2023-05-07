import { addBasket, deleteProduct, getBasket, saveBasket, showTotal } from "../function.js";

const basket = getBasket()
const cartHeading = document.querySelector(".cart__heading")

if (basket.length === 0) {
    cartHeading.innerText = "Panier vide"
    cartHeading.style.fontSize = '36px'
} else {

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
        inputQuantity.addEventListener("input", (e) => {
            const quantity = Number(e.target.value)
            const basket = getBasket()
            const foundProduct = basket.find(p => p.id === piece.id)
            foundProduct.quantity = quantity
            saveBasket(basket)
            showTotal()
            const priceTotal = cardClone.querySelector(".card__price-total")
            priceTotal.textContent = `Prix total : ${quantity * piece.prix} €`
        })

        const price = cardClone.querySelector(".card__price")
        price.textContent = `Prix : ${piece.prix} €`

        const priceTotal = cardClone.querySelector(".card__price-total")
        priceTotal.textContent = `Prix total : ${piece.quantity * piece.prix} €`

        const btnDelete = cardClone.querySelector(".card__delete")
        btnDelete.addEventListener("click", () => {
            const modal = document.querySelector(".modal")
            modal.dataset.id = btnDelete.closest(".card").dataset.id
            modal.style.display = "flex"
        })
        cards.append(cardClone)
    }
    showTotal()

    const btnYes = document.querySelector(".modal__btn-yes")
    btnYes.addEventListener("click", () => {
        const modal = document.querySelector(".modal")
        const id = Number(modal.dataset.id)

        deleteProduct(id)
        showTotal()
        modal.style.display = "none"

        const basket = getBasket()
        if (basket.length === 0) {
            cartHeading.innerText = "Panier vide"
            cartHeading.style.fontSize = '36px'
        }
    })

    const btnNo = document.querySelector(".modal__btn-no")
    btnNo.addEventListener("click", () => {
        const modal = document.querySelector(".modal")
        modal.style.display = "none"
    })
}