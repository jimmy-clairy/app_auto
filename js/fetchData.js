/**
 * Effectue une requête HTTP GET pour récupérer des données depuis l'URL spécifiée.
 * @param {string} url - L'URL à partir de laquelle récupérer les données.
 * @returns {Promise<any>} - Une promesse contenant les données récupérées au format JSON.
 * @throws {Error} - Une erreur est levée si la connexion au serveur est impossible.
 */
export async function fetchData(url) {
    const res = await fetch(url)
    if (res.ok === true) {
        return await res.json()
    }
    throw new Error("Connexion serveur impossible")
}