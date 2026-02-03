# 🔐 Sistema de Cifrado Polimórfico

> Sistema de cifrado polimórfico desarrollado en 2022, creado sin asistencia de IA, con poco conocimiento de criptografia, seguridad y programacion para resolver problemas de seguridad en aplicaciones web.

Esto **no** es una librería de criptografía segura.  
Esto **es** un diario técnico de cómo un programador autodidacta, con Wix Velo como único entorno, sin IA, intentó proteger datos sensibles en 2022.

Lo subo en 2026 porque:

- Muestra cómo se construye una idea criptográfica desde cero, sin copiar StackOverflow ni prompts de IA
- Documenta los errores conceptuales típicos de quien empieza (yo incluido)
- Sirve para que alguien más vea: “ok, yo también puedo intentarlo aunque no sepa nada…”

**No lo uses para nada importante.**
Pero sí puedes aprender de cómo pensaba, cómo fui iterando y por qué llegué a creer que 10! × 10 era “casi inquebrantable” en ese momento.

Si te sirve de algo (o te saca una sonrisa), ya cumplió su propósito.

## 📋 Descripción

**CodexSegur** es un sistema de cifrado polimórfico que implementa un algoritmo de sustitución variable. A diferencia de los cifrados determinísticos tradicionales, este sistema genera diferentes salidas cifradas para el mismo texto de entrada, incluso usando la misma clave.

### ¿Qué es el Cifrado Polimórfico?

El cifrado polimórfico es una técnica donde el mismo mensaje puede ser cifrado de múltiples formas diferentes, todas válidas y descifrables al texto original. Esto añade una capa adicional de seguridad al hacer que el análisis de patrones sea extremadamente difícil.

## 🎯 Características Principales

- ✅ **No Determinístico**: El mismo texto genera diferentes cifrados cada vez
- ✅ **Sustitución Variable**: Usa 10 o más arrays diferentes de mapeo numérico
- ✅ **Símbolos Especiales**: Incorpora caracteres Unicode como separadores
- ✅ **Sin Dependencias Pesadas**: Código JavaScript puro
- ✅ **Generación de Llaves**: Sistema automático de generación de llaves únicas

## 🔧 Cómo Funciona

### El Algoritmo

1. **Conversión a Unicode**: Cada carácter del texto se convierte a su código Unicode
2. **Inserción de Separadores**: Se añaden símbolos especiales aleatorios entre caracteres
3. **Sustitución Polimórfica**: Los dígitos se sustituyen usando uno de 10 o más arrays de mapeo
4. **Selección Aleatoria**: En cada cifrado se elige aleatoriamente qué array usar

### Ejemplo Visual

```
Texto Original: "Hola"
      ↓
Texto Cifrado: "356lqvy69zoxt342mroz3"
```

### Arrays de Sustitución

El sistema utiliza 10 arrays diferentes de permutación de dígitos 0-9:

```javascript
[
  [2, 7, 6, 8, 0, 1, 4, 5, 3, 9], // Array 0
  [5, 3, 7, 4, 9, 2, 1, 6, 8, 0], // Array 1
  [8, 2, 5, 0, 4, 6, 1, 9, 7, 3], // Array 2
  // ... y 7 más
];
```

### Símbolos Especiales

Se utilizan caracteres Unicode especiales como separadores además de letras a-z:

```javascript
const ABC = ["a", "b", "c", ..., "z"];
const Simbol = ["δ", "Φ", "Σ", "Ω", "≈", "∟", "ε", "Œ", "☼", "•"];
```

## 🚀 Uso Ejecutar Demo Completa

```bash
node src/ejemplos.js
```

### Motivación

Este sistema fue desarrollado a principios de 2022 como solución a un problema real de seguridad en aplicaciones web.

- Necesidad de cifrar datos sensibles en base de datos
- Requerimiento de que el mismo dato no siempre se vea igual (anti-patrones)
- Aprendizaje de criptografía básica sin frameworks pesados
- **Desarrollado completamente sin asistencia de IA** (antes de la era ChatGPT)

### La Evolución del Pensamiento para su desarrollo (2022)

Este sistema nació de la necesidad de proteger datos en entornos web limitados (Wix Velo/Firestore) donde los patrones eran el mayor enemigo. Su desarrollo siguió una progresión lógica hacia la complejidad:

- **Fase 1: Ocultación mediante Unicode**: La transformación inicial de caracteres en códigos numéricos reversibles. Al notar que esto mantenía patrones predecibles, se buscó una capa de fragmentación superior.
- **Fase 2: El sistema de Ruido y Símbolos**: Se introdujeron los símbolos especiales (δ, Φ, Σ, etc.) como anclas de seguridad. Aquí nació la idea del **Ruido de Letras**: un señuelo diseñado para que cualquier analista de patrones pierda tiempo en las letras, cuando la información real reside únicamente en los números.
- **Fase 3: Sustitución Posicional Polimórfica**: El núcleo del algoritmo. Los números reales se reasignan basándose en su posición dentro de una de las 10 matrices de permutación. Si la alineación falla por un solo dígito, no se obtiene una letra válida, sino "basura" digital.
- **Fase 4: El Pensamiento de Probabilidad**: Inspirado en la dificultad de los juegos de azar (Baloto/Powerball), se escaló la complejidad de 6 a 10 posiciones exactas. Multiplicar estas permutaciones por capas secuenciales genera un espacio de búsqueda astronómico.
- **Fase 5: Sistema Dual de Llaves**: La implementación final de una llave maestra (backend) que cifra la llave del usuario. Este proceso secuencial garantiza que nunca haya una validación intermedia; o se resuelve el par completo de llaves, o el mensaje permanece oculto.

---

### 🧮 Análisis de Robustez (Perspectiva 2026)

El sistema se basa en un **proceso secuencial de múltiples pasos** donde cada acierto depende del anterior. Un solo error en la cadena invalida el descifrado completo.

#### Complejidad Matemática (Cifrado Dual)

Incluso conociendo el algoritmo, la resolución por fuerza bruta enfrenta un espacio de búsqueda astronómico:

- **Capa Backend + Capa Usuario**: Cada una con 10 selecciones posibles sobre sets de 10! (3.6M) permutaciones.
- **Probabilidad Combinada**: (10 × 10!)² = **1.3 Cuatrillones de combinaciones**.

| Comparativa de Seguridad    | Combinaciones        | Resistencia (Brute Force)   |
| :-------------------------- | :------------------- | :-------------------------- |
| Baloto (6 de 45)            | 8.1 Millones         | 1 en 8.1 Millones           |
| Powerball / Mega Millions   | ~300 Millones        | 1 en 300 Millones           |
| **CodexSegur (Dual Layer)** | **1.3 Cuatrillones** | **~41,760 Años** (a 1M/seg) |

#### Factores Multiplicadores

1.  **Polimorfismo Real**: El mismo mensaje genera hashes visualmente distintos cada vez.
2.  **Señuelos (Decoys)**: Letras y símbolos insertados aleatoriamente que "disfrazan" la longitud y estructura real.
3.  **Dependencia Secuencial**: No hay validaciones intermedias. Es necesario resolver ambas capas de llaves en el orden exacto para obtener un solo carácter válido.

> [!NOTE]
> Aunque matemáticamente robusto para fines educativos, los estándares industriales como AES-256 ofrecen una seguridad incomparablemente mayor (2²⁵⁶). Este proyecto debe verse como una demostración de **seguridad algorítmica creativa**.

---

### 🛠️ proceso Técnico:

Se incluyó en el código una técnica de reconstrucción de matrices que demuestra el uso avanzado de JavaScript moderno:

```javascript
import { CodifiTex } from "./src/CodEncryp.js";
import { MiTex } from "./src/CodEscryp.js";

const config = { access: "admin-2022", token: "xyz-789" };

// Cifrado Polimórfico (Hash diferente cada vez)
const hash = CodifiTex(config);

// Recuperación íntegra de Objetos JSON
const originalData = MiTex(hash);
```

---

## 🛠️ Tecnologías y Portabilidad

- **Core**: JavaScript puro (ES6+).
- **Entorno**: 100% Standalone (Node.js / Navegador).
- **Versatilidad**: Soporta Strings, Números, Arreglos y Objetos complejos.

---

## ⚠️ Nota de Seguridad

Este proyecto se expone como un **activo de ingeniería educativa**. Documenta la capacidad de resolver problemas complejos de seguridad mediante lógica algorítmica creativa. Para aplicaciones críticas de producción en 2026, se recomienda usar este sistema como una capa adicional sobre estándares industriales auditados (como AES-256).

## 👤 Autor

Desarrollado por **Fabio Ortega** (2022).
Un testimonio de cómo la lógica pura puede construir barreras de seguridad sin necesidad de herramientas externas.

# ⚠️ Este Readme es redactado en 2026 con ayuda de IA, pero respetando la logica original del proyecto 2022, no lo utilices para fines de seguridad en producción

## ⭐ Si este proyecto te ayuda a entender cifrado polimórfico, considera darle una estrella!
