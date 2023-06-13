import { getBasket } from "../function.js";

/**
 * Récupération des informations de contact depuis le panier en utilisant la clé "contact"
 * @type {Object}
 */
const contact = getBasket("contact");
console.log(contact);

const name = document.querySelector(".name");
name.innerText = `${contact.firstName ?? "Prenom"} ${contact.lastName ?? "Nom"}`;

const address = document.querySelector(".address");
address.innerText = contact.address ?? "Adresse";

const city = document.querySelector(".city");
city.innerText = `${contact.city ?? "Ville"} ${contact.postal ?? "Postal"}`;

const email = document.querySelector(".email");
email.innerText = contact.email ?? "Email";

/**
 * Fonction pour calculer le prix total d'un produit en fonction de sa quantité et de son prix unitaire
 * @param {number} quantity - La quantité du produit
 * @param {number} price - Le prix unitaire du produit
 * @returns {number} - Le prix total du produit
 */
function totalPrice(quantity, price) {
    let result = 0;
    return result = quantity * price;
}

/**
 * Récupération du panier en utilisant la clé "basket"
 * @type {Array}
 */
const basket = getBasket("basket");
console.log(basket);

const tbody = document.getElementById("tbody");

/**
 * Variable pour stocker le prix total de tous les produits
 * @type {number}
 */
let allPrice = 0;

/**
 * Parcours de tous les produits du panier
 */
for (const product of basket) {
    if (product.quantity !== 0) {
        const tmpTr = document.getElementById("tmp__tr").content.firstElementChild.cloneNode(true);

        const description = tmpTr.querySelector(".tr__description");
        description.innerText = product.nom;

        const price = tmpTr.querySelector(".tr__price");
        price.innerText = product.prix + " €";

        const quantity = tmpTr.querySelector(".tr__quantity");
        quantity.innerText = product.quantity;

        const total = tmpTr.querySelector(".tr__total");
        total.innerText = totalPrice(product.quantity, product.prix) + " €";
        allPrice += totalPrice(product.quantity, product.prix);

        tbody.append(tmpTr);
    }
}

const allTotal = document.querySelector(".all__total");
allTotal.innerHTML = `<td><b>Total: </b> ${allPrice} €</td>`;


localStorage.clear();