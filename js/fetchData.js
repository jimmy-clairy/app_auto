/**
 * Retourne les données au format JSON
 * @param {string} url 
 * @returns 
 */
export async function fetchData(url) {
    const res = await fetch(url)
    if (res.ok === true) {
        return await res.json()
    }
    throw new Error("Connexion serveur impossible")
}