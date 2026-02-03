/*********
 * Decodificador de texto general - Sistema de Cifrado Polimórfico
 * Desarrollado en 2021-2022
 *********/

//librerias
    //Internas
    

    //Bakend
    import {Keys} from './CodEncryp.js'

    const ABC = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", 
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ];
    let Keyes, Mikey
 //--------------------Codificador y Decodificador de texto en BD
    export function KeysIn () {
        if(Keyes === null || Keyes === undefined){
            let mikey =  Keys()
            Keyes = mikey[0]
        }
    }
    export function MyKeys(codekey) {
        KeysIn()
        let mikey = DeCodifiTex(codekey, true)
        Mikey = Array.from(mikey, (x) => parseInt(x))
        return Mikey
    }

    // decifrado
    export function MiTex(texCode, key) {
        KeysIn()
        if(!key) { Mikey = Keyes }
        else { MyKeys(key) }//en caso de ingresar una llave de BD
        return DeCodifiTex(texCode, false)
    }

    export function DeCodifiTex(cripTex, key) {// entra keys decodificada
        const hash = cripTex.slice(0, -2); // Utilizar slice para obtener todos los caracteres excepto los dos últimos
        const numKey = cripTex.slice(-1); // Utilizar slice para obtener el últimos caracteres
        let key0 =  Mikey[parseInt(numKey)]
        let texencrip = ""
        for (let index = 0; index < hash.length; index++) {
            const val0 = hash.charAt(index)
            
            if (ABC.includes(val0)) {
                texencrip += "•"
            } else {
                let cifra = key0.indexOf(parseInt(val0))
                texencrip += cifra
            }
        }
        
        //decodifica el codigo letra a letras para dat el texto
        let letra = "" , texto = "", cont = 0
        for (let index = 0; index < texencrip.length; index++) {
            let numCode = texencrip.charAt(index);
            if(numCode === "•" && cont === 0) {
                let letra0 = String.fromCodePoint(parseInt(letra))
                texto += letra0
                    letra = ""
                cont += 1 
            } else if (numCode !== "•"){
                //acumula los numeros que forman las letras
                letra += numCode
                cont = 0
            }
        }
        //console.log(texto)
        let resul = retorData(texto)
        return resul
    }


export function retorData(text) {
    try {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
            return parsed
        } else if (typeof parsed === 'object' && parsed !== null) {
            return parsed
        } else {
            //return text
            return parsed // Retorna el valor parseado (ej. el string sin comillas)
        }
    } catch (error) {
        // Si ocurre un error al analizar el JSON, se devuelve un objeto con el tipo 'otro'.
        console.log("error: " + error)
        return text
    }
}