# mdlinks - Analizador de enlaces en archivos Markdown

## Índice

- [1. Resumen del proyecto](#1-resumen-del-proyecto)
- [2. Consideraciones técnicas](#2-Instalacion)
- [3. Usabilidad](#3-Uso)

---

## 1. Resumen del proyecto

mdlinks es una herramienta de línea de comandos y una librería de Node.js que te permite analizar archivos Markdown en busca de enlaces (URLs) y reportar estadísticas sobre ellos. Esta herramienta es útil para verificar la integridad de los enlaces en tus documentos Markdown, identificar enlaces rotos y obtener información sobre los enlaces, como su estado y texto anclado.

## 2. Instalacion

Para utilizar mdlinks como librería en tus proyectos o como una herramienta de línea de comandos, sigue estos pasos:

npm install Kaquev/md-links

Tambien puedes usar opciones para personalizar la salida, como --validate para verificar la validez de los enlaces y --stats para obtener estadísticas sobre los enlaces.

## 3. Uso

Para analizar un archivo Markdown y obtener un informe de los enlaces contenidos en él, ejecute el siguiente comando en su terminal:

mdlinks ./example/archivodeprueba.md

La librería procesará la información y devolverá:

Una ruta absoluta del archivo.
Confirmación o negación de la existencia del archivo en la computadora.
Un arreglo de archivos Markdown encontrados.
Cada archivo Markdown encontrado contendrá las siguientes propiedades:

file: Ruta del archivo donde se encontró el link.
href: URL encontrada.
text: Texto que aparecía dentro del link (<a>).

Ejemplo de resultado:

./example/archivodeprueba.md https://www.google.com Google

Podemos observar que me entrega las propiedades mencionadas.

file: ./example/archivodeprueba.md
href: https://www.google.com
texto: Google

# Opciones

Puedes usar varias opciones para personalizar la salida, como --validate para verificar la validez de los enlaces y --stats para obtener estadísticas sobre los enlaces.

--validate: Verifica la validez de los enlaces (status HTTP) y muestra el resultado.

Ejemplo, mdlinks ./example/archivodeprueba.md --validate

Resultado:

./example/probando3.md https://www.google.com Google 200 ok
./example/probando3.md https://www.openai.com OpenAI 200 ok
./example/probando3.md https://github.com GitHub 200 ok

--stats: Muestra estadísticas sobre los enlaces encontrados en el archivo.

Ejemplo, mdlinks ./example/archivodeprueba.md --stats

Resultado:

Cantidad de links: 3
Enlaces válidos: 0
Enlaces rotos: 0
Enlaces únicos: 3
