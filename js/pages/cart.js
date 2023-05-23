import { deleteProduct, getBasket, saveBasket, showTotal } from "../function.js";

const basket = getBasket("basket")
const modal = document.querySelector(".modal")
const cartHeading = document.querySelector(".cart__heading")

function emptyBasket() {
    cartHeading.style.display = "block"
    cartHeading.innerText = "Panier vide"
    cartHeading.style.fontSize = '36px'
}

if (basket.length === 0) {
    emptyBasket()
} else {
    cartHeading.style.display = "none"

    /** Crée les Cards */
    const cards = document.querySelector(".cards")
    for (const piece of basket) {
        const cardClone = document.getElementById("card-tmp").content.firstElementChild.cloneNode(true)
        cardClone.dataset.id = piece.id

        const img = cardClone.querySelector(".card__img")
        img.src = `../${piece.image}`
        img.alt = piece.nom

        const heading = cardClone.querySelector(".card__heading")
        heading.textContent = piece.nom

        const inputQuantity = cardClone.querySelector(".card__quantity")
        inputQuantity.parentElement.setAttribute("for", `card__quantity-${piece.id}`)
        inputQuantity.setAttribute("id", `card__quantity-${piece.id}`)
        inputQuantity.setAttribute("name", `card__quantity-${piece.id}`)
        inputQuantity.setAttribute("value", piece.quantity)

        inputQuantity.addEventListener("change", (e) => {
            let quantity = Number(e.target.value)
            if (quantity < 0) {
                alert('Quantité négative non autorisée quantité remise a 1')
                inputQuantity.value = 1
                quantity = 1
            } else if (quantity > 100) {
                alert('Quantité supérieur à 100 non autorisée quantité remise a 100')
                inputQuantity.value = 100
                quantity = 100
            }
            const basket = getBasket("basket")
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
            modal.dataset.id = btnDelete.closest(".card").dataset.id
            modal.style.display = "flex"
        })
        cards.append(cardClone)
    }
    showTotal()

    const form = document.querySelector(".form");
    form.style.display = "block"

    const btnYes = document.querySelector(".modal__btn-yes")
    btnYes.addEventListener("click", () => {
        const id = Number(modal.dataset.id)

        deleteProduct(id)
        showTotal()
        modal.style.display = "none"

        const basket = getBasket("basket")
        if (basket.length === 0) {
            emptyBasket()
            form.style.display = "none"
        }
    })

    const btnNo = document.querySelector(".modal__btn-no")
    btnNo.addEventListener("click", () => {
        modal.style.display = "none"
    })

    // FORMULAIRE *********************************************************************************
    function showMsgError(element, verif, txt = "Champ incorrect") {
        const msgError = element.parentElement.querySelector(".msg-error")
        if (verif) {
            msgError.innerText = ""
        } else {
            msgError.innerText = txt
        }
    }

    const verif = []
    // FORM FIRST NAME --------------------------------------------------------
    form.firstName.addEventListener("input", () => {
        verif[0] = /^[a-zA-ZéèêëôœîïûüàáâæçñÿýÌÏÎÙÚÛü]+\s?[a-zA-ZéèêëôœîïûüàáâæçñÿýÌÏÎÙÚÛü]*$/.test(firstName.value.trim());
        showMsgError(firstName, verif[0], "Prénom incorrect")
    })
    // FORM LAST NAME ---------------------------------------------------------
    form.lastName.addEventListener("input", () => {
        verif[1] = /^[a-zA-ZéèêëôœîïûüàáâæçñÿýÌÏÎÙÚÛü]+\s?[a-zA-ZéèêëôœîïûüàáâæçñÿýÌÏÎÙÚÛü]*$/.test(lastName.value.trim());
        showMsgError(lastName, verif[1], "Nom incorrect")
    })
    // FORM ADDRESS -----------------------------------------------------------
    form.address.addEventListener("input", () => {
        verif[2] = /^\d+\s[A-z]+\s[A-z]+/.test(address.value.trim());
        showMsgError(address, verif[2], "Adresse incorrecte")
    })
    // FORM CITY --------------------------------------------------------------
    form.city.addEventListener("input", () => {
        verif[3] = /^[A-Za-z][A-Za-z\é\è\ê\ë\ä\à\ï\ç\ \-]+$/.test(city.value.trim());
        showMsgError(city, verif[3], "Ville incorrecte")
    })
    // FORM POSTAL --------------------------------------------------------------
    form.postal.addEventListener("input", () => {
        verif[4] = /^\d{5}$/.test(postal.value.trim());
        showMsgError(postal, verif[4], "Code postal incorrect")
    })
    // // FORM EMAIL --------------------------------------------------------------
    form.email.addEventListener("input", () => {
        verif[5] = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        showMsgError(email, verif[5], "Email incorrect")
    })

    // ORDER FINAL -------------------------------------------------------------
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        console.log(verif);

        // CHECK IF ALL TRUE
        const checkVerif = verif.find(v => v === false)
        if (checkVerif === undefined) {
            const contact = {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                postal: postal.value,
                email: email.value
            }

            console.log(contact);

            localStorage.setItem("contact", JSON.stringify(contact))
            window.location = "confirm.html"
        }
    })
}