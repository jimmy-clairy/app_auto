/**
 * Donne le plus elevé en entier avec une dixaine superieur ex: 141.5 => 150
 * @param {Object} objet
 * @returns {number}
 */
export function prixMax(objet) {
    const piecesTry = [...objet]
    piecesTry.sort((a, b) => b.prix - a.prix)
    return Math.round(((piecesTry[0].prix + 4.99) / 10)) * 10
}