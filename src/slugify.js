/**
 * Exemple de fonction pure, à remplacer par le code de votre application.
 *
 * Transforme un texte libre en identifiant lisible pour une URL ou un nom
 * de fichier : minuscules, accents retirés, séparateurs normalisés.
 *
 *   slugify("Été à Paris !") === "ete-a-paris"
 *
 * @param {string} text - Texte à convertir.
 * @param {object} [options]
 * @param {string} [options.separator="-"] - Séparateur entre les mots.
 * @param {number} [options.maxLength=Infinity] - Longueur maximale du résultat.
 * @returns {string}
 */
export function slugify(text, { separator = "-", maxLength = Infinity } = {}) {
  if (typeof text !== "string") {
    throw new TypeError("slugify attend une chaîne de caractères");
  }
  if (typeof maxLength !== "number" || !(maxLength >= 0)) {
    throw new RangeError("maxLength doit être un nombre positif ou nul");
  }

  const slug = text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // retire les diacritiques
    .replace(/[œŒ]/g, "oe")
    .replace(/[æÆ]/g, "ae")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, separator)
    .split(separator)
    .filter(Boolean)
    .join(separator);

  if (slug.length <= maxLength) {
    return slug;
  }

  // Coupe sans laisser de séparateur pendant en fin de chaîne.
  return slug
    .slice(0, maxLength)
    .split(separator)
    .filter(Boolean)
    .join(separator);
}
