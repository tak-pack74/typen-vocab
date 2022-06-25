export default function listRandomSentences(maxLength: number) {
    var randoms: number[] = [];

    for (var i: number = 0; i < maxLength; i++) {
        while (true) {
            var tmp = intRandom(maxLength);
            if (!randoms.includes(tmp)) {
                randoms.push(tmp);
                break;
            }
        }
    }
    return randoms;
}

const intRandom:Function = (maxLength: number) => {
    return Math.floor(Math.random() * maxLength);
}