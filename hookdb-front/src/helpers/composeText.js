//Splits the given text into paragraphs based on a symbol
export function composeText(text) {
    const splitText = text.split("<(&)><(&)>");
    return splitText;
}

//Generates a unique key randomly
export function generateKey() {
    const letras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let key = "";

    for (let i = 0; i < 5; i++) {
        const indiceAleatorio = Math.floor(Math.random() * letras.length);
        key += letras.charAt(indiceAleatorio);
    }

    return key;
}

export function urlBeautify(urlText) {
    return urlText.replaceAll(" ", "_");
}
