/**
 * Removes all HTML tags, including anchor tags, from each string in the provided array.
 * @param {string[]} textArr - Array of strings potentially containing HTML.
 * @returns {string[]} Array of strings with HTML tags removed.
 */
export function removeHTML(textArr) {
  return textArr.map((x) =>
    x.replace(/<\s*a[^>]*>(.*?)<\s*\/\s*a>/g, "").replace(/<[^>]*>/g, ""),
  );
}

/**
 * Removes Hebrew vowel marks (niqqud) from the input string.
 * @param {string} rawString - String containing Hebrew text with possible vowel marks.
 * @returns {string} String with vowel marks removed.
 */
export function stripVowels(rawString) {
  return rawString.replace(/[\u0591-\u05C7]/g, "");
}

/**
 * Randomly shuffles the elements of the given array.
 * @param {any[]} array - Array to be shuffled.
 * @returns {any[]} The shuffled array.
 */
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Removes Hebrew cantillation marks (te'amim), maqaf (־), parsha/sedra markers (e.g., (פ), (ס)), and bracketed text (e.g., [text])
 * from the input string.
 * @param {string} words - String containing Hebrew text with cantillation marks, maqaf, parsha markers, and bracketed text.
 * @returns {string} String with cantillation marks, maqaf, parsha markers, and bracketed text removed.
 */
export function stripCantillation(words) {
  return words.replace(/[\u0591-\u05AF\u05c0]|\(פ\)|\(ס\)|\[(.*?)]/g, "");
}

/**
 * Replaces specific Hebrew divine names in a given string with alternative forms.
 *
 * @param {string} words - The input string potentially containing divine names.
 * @returns {string} The modified string with divine names replaced.
 */
export function replaceDivineNames(words) {
  const replacements = [
    { regex: /יְהֹוָה|יהֹוָה/g, replacement: "יקוק" },
    { regex: /אֱלֹהִים/g, replacement: "אלוקים" },
    { regex: /(?<=\s)אֵל(?=\s)/g, replacement: "אֵ־ל" },
  ];

  for (const { regex, replacement } of replacements) {
    words = words.replace(regex, replacement);
  }
  return words;
}

/**
 * Cleans the input text by removing cantillation marks, replacing divine names,
 * and splitting the result into an array of words.
 *
 * @param {string} words - The input text to be cleaned.
 * @returns {string[]} An array of cleaned words.
 */
export function cleanText(words) {
  return replaceDivineNames(stripCantillation(words)).split(/[\s\u05BE]+/);
}
