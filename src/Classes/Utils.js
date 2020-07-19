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
    * Takes in string returns array of words
    * */

    stripCantillation = (words) => {
        return words.replace(/[\u0591-\u05AF\u05c0]|\(פ\)|\(ס\)|\[(.*?)]/g, "").split(/[\s\u05BE]+/);

    };


};