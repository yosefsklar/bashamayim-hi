/**
 * Utility class providing various text manipulation methods.
 */
export default class Utils {

    /**
     * Removes all HTML tags, including anchor tags, from each string in the provided array.
     * @param {string[]} textArr - Array of strings potentially containing HTML.
     * @returns {string[]} Array of strings with HTML tags removed.
     */
    removeHTML(textArr) {
        return textArr.map(x => x.replace(/<\s*a[^>]*>(.*?)<\s*\/\s*a>/g, "").replace(/<[^>]*>/g, ""));
    }

    /**
     * Removes Hebrew vowel marks (niqqud) from the input string.
     * @param {string} rawString - String containing Hebrew text with possible vowel marks.
     * @returns {string} String with vowel marks removed.
     */
    stripVowels(rawString) {
        return rawString.replace(/[\u0591-\u05C7]/g, "");
    }

    /**
     * Randomly shuffles the elements of the given array.
     * @param {any[]} array - Array to be shuffled.
     * @returns {void}
     */
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    /**
     * Removes Hebrew cantillation marks, punctuation, and bracketed text from the input string,
     * then splits the cleaned string into an array of words.
     * @param {string} words - String containing Hebrew text with cantillation marks and punctuation.
     * @returns {string[]} Array of words with cantillation marks and punctuation removed.
     */
    stripCantillation(words) {
        return words.replace(/[\u0591-\u05AF\u05c0]|\(פ\)|\(ס\)|\[(.*?)]/g, "").split(/[\s\u05BE]+/);
    }
};
