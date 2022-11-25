export default class Utils {

    removeHTML(textArr) {
        return textArr.map(x => x.replace(/<\s*a[^>]*>(.*?)<\s*\/\s*a>/g, "").replace(/<[^>]*>/g, ""));

    }

    /*
    * Takes in string returns string
    * */

    stripVowels(rawString) {
        return rawString.replace(/[\u0591-\u05C7]/g, "")
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    /*
    * words:: Array of strings
    * returns:: Array of Strings
    * */

    stripCantillationAndDivineNames = (words) => {
        let replacement_name = "יקוק"
        let word_string = words.join(" ")
        return word_string.replace(/[\u0591-\u05AF\u05c0]|\(פ\)|\(ס\)|\[(.*?)]/g, "")
            .replace(/יְהֹוָה|יהֹוָה/g, replacement_name)
            .split(/[\s\u05BE]+/);

    };

};