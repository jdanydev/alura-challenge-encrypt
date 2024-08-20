const main = document.querySelector('.main');
const loader = document.querySelector('.loader');
const encrypt = document.querySelector('#encrypt');
const decrypt = document.querySelector('#decrypt');
const input = document.querySelector('#input');
const out = document.querySelector('.result__text__encrypt');
const outNoFound = document.querySelector('.result__text__nofound');
const outFound = document.querySelector('.result__text__found');
const copy = document.querySelector('.button_copy');
const desplazamiento = Math.floor(Math.random() * 10) + 1;

encrypt.addEventListener('click', encryptText);
copy.addEventListener('click', copyText);
decrypt.addEventListener('click', decryptText);


function encryptText() {
    const text = input.value;
    if(text === '') {
        alert('Ingresa un texto para encriptar');
        return;
    }else{
        out.innerHTML = caesarCipherEncrypt(text, desplazamiento);   
        outNoFound.style.display = 'none';
        outFound.style.display = 'flex';
    }
}

function copyText() {
    const text = out.innerHTML;
    
    const range = document.createRange();
    range.selectNode(out);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    navigator.clipboard.writeText(text);
}

function decryptText() {
    const text = input.value;
    if(text === '') {
        alert('Ingresa un texto para encriptar');
        return;
    }else{
        out.innerHTML = caesarCipherDecrypt(text, desplazamiento);   
        outNoFound.style.display = 'none';
        outFound.style.display = 'flex';
    }

}
// Función para encriptar texto usando Cifrado César
function caesarCipherEncrypt(text, shift) {
    // Convertimos el shift a un número válido dentro del rango del alfabeto
    const adjustedShift = shift % 26;
    // Variable para almacenar el texto encriptado
    let encryptedText = '';

    // Recorremos cada carácter del texto
    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        // Verificamos si el carácter es una letra
        if (char.match(/[a-z]/i)) {
            // Obtenemos el código ASCII de la letra
            const charCode = text.charCodeAt(i);
            let newCharCode;

            // Si es una letra mayúscula
            if (charCode >= 65 && charCode <= 90) {
                newCharCode = ((charCode - 65 + adjustedShift) % 26) + 65;
            } 
            // Si es una letra minúscula
            else if (charCode >= 97 && charCode <= 122) {
                newCharCode = ((charCode - 97 + adjustedShift) % 26) + 97;
            }

            // Convertimos el código ASCII de nuevo a un carácter y lo añadimos al texto encriptado
            encryptedText += String.fromCharCode(newCharCode);
        } 
        // Si no es una letra, lo añadimos tal cual
        else {
            encryptedText += char;
        }
    }

    return encryptedText;
}

// Función para desencriptar texto usando Cifrado César
function caesarCipherDecrypt(encryptedText, shift) {
    // Convertimos el shift a un número válido dentro del rango del alfabeto
    const adjustedShift = shift % 26;
    // Variable para almacenar el texto desencriptado
    let decryptedText = '';

    // Recorremos cada carácter del texto encriptado
    for (let i = 0; i < encryptedText.length; i++) {
        const char = encryptedText[i];

        // Verificamos si el carácter es una letra
        if (char.match(/[a-z]/i)) {
            // Obtenemos el código ASCII de la letra
            const charCode = encryptedText.charCodeAt(i);
            let newCharCode;

            // Si es una letra mayúscula
            if (charCode >= 65 && charCode <= 90) {
                newCharCode = ((charCode - 65 - adjustedShift + 26) % 26) + 65;
            } 
            // Si es una letra minúscula
            else if (charCode >= 97 && charCode <= 122) {
                newCharCode = ((charCode - 97 - adjustedShift + 26) % 26) + 97;
            }

            // Convertimos el código ASCII de nuevo a un carácter y lo añadimos al texto desencriptado
            decryptedText += String.fromCharCode(newCharCode);
        } 
        // Si no es una letra, lo añadimos tal cual
        else {
            decryptedText += char;
        }
    }

    return decryptedText;
}

function loading(){
    let myVar = setTimeout(showMain, 3000);

}
function showMain(){
    loader.style.display = "none";
    //main.style.display = "flex";
}