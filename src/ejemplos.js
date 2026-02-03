/*********
 * Demo del Sistema Original (2022) - Carpeta Original
 * Este archivo intenta ejecutar la lógica compleja original.
 * NOTA: Es probable que falle inicialmente debido a las dependencias de Wix.
 * ejecutar con: node src/ejemplos.js
 *********/

import { CodifiTex, Keys } from './CodEncryp.js'
import { MiTex } from './CodEscryp.js'

    console.log('\x1b[36m%s\x1b[0m', '╔════════════════════════════════════════════════════════╗')
    console.log('\x1b[36m%s\x1b[0m', '║   DEMO: SISTEMA DE CIFRADO POLIMÓRFICO (2022)          ║')
    console.log('\x1b[36m%s\x1b[0m', '║         Ingeniería Original Standalone                 ║')
    console.log('\x1b[36m%s\x1b[0m', '╚════════════════════════════════════════════════════════╝')

    try {
        // Se puede codificar cualquier tipo de dato: strings, números, objetos, arreglos, etc.
        let data, tipoDato = "object" // Cambia aquí: "string" | "number" | "object" | "array"
        
        if(tipoDato === "string") { data = 'micorreo@gmail.com'}
        else if(tipoDato === "number") { data = 2022}
        else if(tipoDato === "array") { data = [10, 20, 30, 40, 50]}
        else if(tipoDato === "object") { 
            data = {
                id: "B-2022",
                usuario: "Fabio Ortega",
                correo: "micorreo@gmail.com",
                rol: "Product Engineer",
                activo: true
            }
        }
        
        console.log('\n\x1b[33m%s\x1b[0m', '1. DATO ORIGINAL A PROCESAR:')
        console.dir(data, { depth: null, colors: true })

        console.log('\n\x1b[35m%s\x1b[0m', '2. PROCESO DE CIFRADO 1 (Generando Hash Polimórfico)...')
        const hash1 = CodifiTex(data)
        console.log('\x1b[32m%s\x1b[0m', '   ➜ HASH 1:', hash1)

        console.log('\n\x1b[35m%s\x1b[0m', '3. PROCESO DE CIFRADO 2 (Diferente matriz y ruido)...')
        const hash2 = CodifiTex(data)
        console.log('\x1b[32m%s\x1b[0m', '   ➜ HASH 2:', hash2)

        console.log('\n\x1b[34m%s\x1b[0m', '¿Son diferentes los hashes?')
        console.log(hash1 !== hash2 ? '   ✅ SÍ: El polimorfismo cambió la estructura.' : '   ❌ NO: Hubo un error en la aleatoriedad.')

        console.log('\n\x1b[33m%s\x1b[0m', '4. VERIFICACIÓN DE DESCIFRADO:')
        
        const descifrado1 = MiTex(hash1)
        const descifrado2 = MiTex(hash2)

        console.log('\x1b[32m%s\x1b[0m', '   ➜ DESCIFRADO 1:', (typeof descifrado1 === 'object' ? 'Objeto recuperado' : descifrado1))
        console.log('\x1b[32m%s\x1b[0m', '   ➜ DESCIFRADO 2:', (typeof descifrado2 === 'object' ? 'Objeto recuperado' : descifrado2))

        const originalStr = JSON.stringify(data);
        const exito = originalStr === JSON.stringify(descifrado1) && originalStr === JSON.stringify(descifrado2);

        if (exito) {
            console.log('\n\x1b[42m\x1b[30m %s \x1b[0m', ' PRUEBA EXITOSA: Datos recuperados íntegramente. ')
        } else {
            console.log('\n\x1b[41m %s \x1b[0m', ' ERROR: Loss datos finales no coinciden con el original. ')
        }

    } catch (error) {
        console.error('\n\x1b[31m%s\x1b[0m', '❌ ERROR EN EL DEMO:')
        console.error(error)
    }
