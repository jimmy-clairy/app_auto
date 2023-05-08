import { addBasket, deleteProduct, getBasket, saveBasket, showTotal } from "../function.js";

const basket = getBasket()
const cartHeading = document.querySelector(".cart__heading")

if (basket.length === 0) {
    cartHeading.style.display = "block"
    cartHeading.innerText = "Panier vide"
    cartHeading.style.fontSize = '36px'
} else {
    cartHeading.style.display = "none"

    /** Crée les Cards */
    const cards = document.querySelector(".cards")
    for (const piece of basket) {
        const cardClone = document.getElementById("card-tmp").content.firstElementChild.cloneNode(true)
        cardClone.dataset.id = piece.id

        const img = cardClone.querySelector(".card__img")
        img.src = `../${piece.image}`

        const heading = cardClone.querySelector(".card__heading")
        heading.textContent = piece.nom

        const inputQuantity = cardClone.querySelector(".card__quantity")
        inputQuantity.parentElement.setAttribute("for", `card__quantity-${piece.id}`)
        inputQuantity.setAttribute("id", `card__quantity-${piece.id}`)
        inputQuantity.setAttribute("name", `card__quantity-${piece.id}`)

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

    const form = document.querySelector(".form");
    form.style.display = "block"

    const btnYes = document.querySelector(".modal__btn-yes")
    btnYes.addEventListener("click", () => {
        const modal = document.querySelector(".modal")
        const id = Number(modal.dataset.id)

        deleteProduct(id)
        showTotal()
        modal.style.display = "none"

        const basket = getBasket()
        if (basket.length === 0) {
            cartHeading.style.display = "block"
            cartHeading.innerText = "Panier vide"
            cartHeading.style.fontSize = '36px'
            form.style.display = "none"
        }
    })

    const btnNo = document.querySelector(".modal__btn-no")
    btnNo.addEventListener("click", () => {
        const modal = document.querySelector(".modal")
        modal.style.display = "none"
    })

    // FORMULAIRE *********************************************************************************
    function showMsgError(element, verif, txt = "Champ") {
        const msgError = element.parentElement.querySelector(".msg-error")
        if (verif) {
            msgError.innerText = ""
        } else {
            msgError.innerText = `${txt} incorrect`
        }
    }

    const verif = []
    // FORM FIRST NAME --------------------------------------------------------
    form.firstName.addEventListener("input", () => {
        verif[0] = /^[A-Za-z][A-Za-z\é\è\ê\ë\ä\à\ï\ç\ \-]+$/.test(firstName.value.trim());
        showMsgError(firstName, verif[0], "Prénom")
    })
    // FORM LAST NAME ---------------------------------------------------------
    form.lastName.addEventListener("input", () => {
        verif[1] = /^[A-Za-z][A-Za-z\é\è\ê\ë\ä\à\ï\ç\ \-]+$/.test(lastName.value.trim());
        showMsgError(lastName, verif[1], "Nom")
    })
    // FORM ADDRESS -----------------------------------------------------------
    form.address.addEventListener("input", () => {
        verif[2] = /^[A-Za-z0-9\é\è\ê\ë\ä\à\ï\ç\ \,\'\-]+$/.test(address.value.trim());
        showMsgError(address, verif[2], "Adresse")
    })
    // FORM CITY --------------------------------------------------------------
    form.city.addEventListener("input", () => {
        verif[3] = /^[A-Za-z][A-Za-z\é\è\ê\ë\ä\à\ï\ç\ \-]+$/.test(city.value.trim());
        showMsgError(city, verif[3], "Ville")
    })
    // // FORM EMAIL --------------------------------------------------------------
    form.email.addEventListener("input", () => {
        verif[4] = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value.trim());
        showMsgError(email, verif[4], "Ville")
    })

    // ORDER FINAL -------------------------------------------------------------
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        console.log(verif);

        // CHECK IF ALL TRUE
        const checkVerif = verif.find(v => v === false)
        if (checkVerif === undefined) {
            const orderFinal = {
                userInfo: {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    address: address.value,
                    city: city.value,
                    email: email.value
                },
                products: getBasket()
            }

            console.log(orderFinal);

            localStorage.setItem("orderFinal", JSON.stringify(orderFinal))
            window.location = "confirm.html"
            localStorage.clear(basket);
        }
    })
}




// form.addEventListener("submit", (e) => {
//     e.preventDefault()
//     console.log("submit");
//     // CHECK IF ALL TRUE
//     if (verifFirstName && verifLastName && verifAddress && verifCity && verifEmail) {

//         for (const product of basket) {
//             productId.push(product._id)
//         }

//         orderFinal = {
//             contact: {
//                 firstName: firstName.value,
//                 lastName: lastName.value,
//                 address: address.value,
//                 city: city.value,
//                 email: email.value
//             },
//             products: productId
//         };

//         fetch("http://localhost:3000/api/products/order", {
//             method: "POST",
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(orderFinal)
//         })
//             .then(response => response.json())
//             .then(data => {
//                 window.location = "confirmation.html?orderId=" + data.orderId;
//             });
//         localStorage.clear(basket);

//     } else {
//         document.querySelector("#order").value = "Veuillez valider tous les champs.";
//     }
// })