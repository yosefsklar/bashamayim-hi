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
     * Removes Hebrew cantillation marks (te'amim), maqaf (־), parsha/sedra markers (e.g., (פ), (ס)), and bracketed text (e.g., [text])
     * from the input string.
     * @param {string} words - String containing Hebrew text with cantillation marks, maqaf, parsha markers, and bracketed text.
     * @returns {string} String with cantillation marks, maqaf, parsha markers, and bracketed text removed.
     */
    stripCantillation(words) {
        return words.replace(/[\u0591-\u05AF\u05c0]|\(פ\)|\(ס\)|\[(.*?)]/g, "");
    }

    // replaceDivineNames(words) {
    //     let replacement_name = "יקוק"
    //     let replacement_name_2 = "אלוקים";
    //     return words.replace(/יְהֹוָה|יהֹוָה/g, replacement_name).replace(/אֱלֹהִים/g, replacement_name_2);
    // }

    /**
     * Replaces specific Hebrew divine names in a given string with alternative forms.
     *
     * @param {string} words - The input string potentially containing divine names.
     * @returns {string} The modified string with divine names replaced.
     */
    replaceDivineNames(words) {
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
    cleanText(words) {
        return this.replaceDivineNames(this.stripCantillation(words)).split(/[\s\u05BE]+/);
    }
};
