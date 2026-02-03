/*********
 * Codificador de texto general - Sistema de Cifrado Polimórfico
 * Desarrollado en 2022
 *********/

// Imports locales
import { MyKeys } from './CodEscryp.js'

    

 
//variables globales
    let Simbol, Keyes, KeyGen, Mikey, Org
 //--------------------Codificador de texto en BD
    //llaves de ejemplo
    let key = {
        'K1' : [
            [2,7,6,8,0,1,4,5,3,9], [5,3,7,4,9,2,1,6,8,0],
            [8,2,5,0,4,6,1,9,7,3], [4,3,5,6,9,2,8,1,0,7],
            [3,2,6,1,0,7,8,9,4,5], [1,0,2,5,3,7,9,4,6,8],
            [8,7,5,6,0,4,1,3,2,9], [3,6,9,5,0,4,8,1,2,7],
            [2,3,8,0,5,7,4,6,1,9], [7,0,1,4,6,9,8,3,2,5]
        ],
        'S1' : ["δ",'Φ','Σ','Ω','≈','∟','ε','Œ','☼','•'],
        // Llaves serializadas para demostración educativa del Parser
        'KeyString' : '2768014539,5374921680,8250461973,4356928107,3261078945,1025379468,8756041329,3695048127,2380574619,7014698325,δΦΣΩ≈∟εŒ☼•,4Φ0Σ1Ω5Φ3≈6∟7ε1Œ4☼6•'
    }
    const ABC = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", 
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ];
    
    export function Keys () {
        if(Keyes === null || Keyes === undefined){
            /* 
                RECONSTRUCCIÓN DE MATRIZ DESDE STRING
                Se incluyó esta lógica para mostrar cómo procesar llaves que vienen serializadas.
            */
            const keysIn = key.KeyString // llave en texto plano
            let kesCod = keysIn.split(',') // separa la llave en un array
            KeyGen = kesCod.pop()                // Extrae la llave maestra (último dato)
            Simbol = Array.from(kesCod.pop())    // Extrae y separa los símbolos
            // Convierte el array de strings en una matriz numérica 2D
            Keyes = Array.from(kesCod, x => Array.from(x, b => parseInt(b)))
        }
        return [Keyes, Simbol, KeyGen]
    }

    export function DecoKey(codekey) {
        Org = 1
        if(!codekey) { codekey = Mikey }
        else { 
            Mikey = MyKeys(codekey)
         }
        return Mikey
    }
    
    export function CodifiTex(tex, key) {
        Keys()
        DecoKey(key)
        tex = converaTex(tex)
        //Separa por simbolos el codigo de letras
        let pretex = ""
        for (let index = 0; index < tex.length; index++) {
            const letra = tex[index];
            const cantidadAleatoria = Math.floor(Math.random() * 4) + 1;
            const prelet = letra + '•'.repeat(cantidadAleatoria);
            pretex += prelet;
        }
        return CodexNumer(pretex)
    }

     //Estrae el codigo numerico de cada letra y el simbolo lo combierte en letra
    export function CodexNumer(texco) {
        let texaNum = ""
        for (let index = 0; index < texco.length; index++) {
            let valNum = texco.charAt(index)
            
            if(valNum === "•"){
                const iAlet = Math.floor(Math.random() * ABC.length);
                const letraAlet = ABC[iAlet];
                texaNum += letraAlet;
            } else {
                let letra = String(valNum.codePointAt(0))
                texaNum = texaNum + letra
            }
        }
        return CriptoTex(texaNum)
    }
    //Codifica los valores numericos acorde a la llave dada
    export function CriptoTex(texaNum) {       
        const numKey = Math.floor(Math.random() * 10); // 0-9
        const key0 =  Keyes[numKey]
        let texencrip = ""
        for (let index = 0; index < texaNum.length; index++) {
            let val0 = texaNum.charAt(index);
            if(ABC.includes(val0)) {
                texencrip = texencrip + val0
            } else {
                let cifra =  key0[val0]
                texencrip = texencrip + cifra
            } 
        }
        const iAlet = Math.floor(Math.random() * ABC.length);
        let hash = texencrip + ABC[iAlet] + String(numKey)
        return hash
    }
//fin

export function converaTex(text) {
    try {
      const tex = JSON.stringify(text)
      return tex
      
    } catch (error) {
      // Si ocurre un error al analizar el JSON, se devuelve un objeto con el tipo 'otro'.
      console.log("error: " + error)
      return String(text);
    }
  }