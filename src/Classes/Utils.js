export default class Utils{

    removeHTML(textArr){
        return textArr.map(x => x.replace(/<\s*a[^>]*>(.*?)<\s*\/\s*a>/g,"").replace(/<[^>]*>/g,""));

    }

    stripVowels(rawString) {
        return rawString.replace(/[\u0591-\u05C7]/g,"")
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }


}