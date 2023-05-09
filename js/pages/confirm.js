import { getBasket } from "../function.js";
/**
 * Calcule le total
 * @returns {number}
 */
function totalPrice(quantity, price) {
    let result = 0
    return result = quantity * price
}

const contact = getBasket("contact")
console.log(contact);

const name = document.querySelector(".name")
name.innerText = `${contact.firstName} ${contact.lastName}`

const address = document.querySelector(".address")
address.innerText = contact.address

const city = document.querySelector(".city")
city.innerText = `${contact.city} ${contact.postal}`

const email = document.querySelector(".email")
email.innerText = contact.email

const basket = getBasket("basket")
console.log(basket);
const tbody = document.getElementById("tbody")
let allPrice = 0
for (const product of basket) {
    const tmpTr = document.getElementById("tmp__tr").content.firstElementChild.cloneNode(true)
    const description = tmpTr.querySelector(".tr__description")
    description.innerText = product.nom

    const price = tmpTr.querySelector(".tr__price")
    price.innerText = product.prix + " €"

    const quantity = tmpTr.querySelector(".tr__quantity")
    quantity.innerText = product.quantity

    const total = tmpTr.querySelector(".tr__total")
    total.innerText = totalPrice(product.quantity, product.prix) + " €"
    allPrice += totalPrice(product.quantity, product.prix)
    tbody.append(tmpTr)
}

const allTotal = document.querySelector(".all__total")
allTotal.innerHTML = `<td><b>Total: </b> ${allPrice} €</td>`