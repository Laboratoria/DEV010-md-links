# MD-LINKS

Se desarrolló una libreria que funciona como una herramienta para analizar links dentro de archivos Markdown, y se ejecuta directamente desde la terminal.

Esta aplicación es compatible con documentos de las siguientes extensiones: .md, .mkd, .mdwn, .mdown, .mdtxt, .mdtext, .markdown, .text.

El objetivo de la libreria es obtener los links que se encuetran del archivo, debido a que al actualizar documentación de proyectos se encuentran una gran cantidad de links y para verificar que cada uno siga funcionando resulta poco eficiente revisar cada uno de los enlaces. Por lo anterior, esta libreria retorna los links, la ruta del archivo leido y el texto anclado para facilitar el trabajo. Adicionalmente, usando el parametro validate se puede obtener el código de status de las llamadas http para corroborar que los sitios web sigan en funcionamiento y se envié al usuario a las páginas correctas.

![md-links](https://i.ibb.co/sWt3R3P/libreria.jpg)
**Figura 1.** Funcionamiento de la libreria md-links.

## Autora

- [@Kari-Navarro](https://www.github.com/Kari-Navarro)

## Documentación

El primer paso para elaborar la libreria fue crear un diagrama de flujo para visualizar la lógica de los pasos a seguir. Se comienza con la entrada de un parametro que es la ruta del archivo a leer. La libreria solo acepta rutas absolutas, por lo que si es relativa se transforma a absoluta utilizando el método path.isAbsolute(route) de node. Se verifica que exita en la computadora y que sea compatible con las extensiones de los archivos .md, .mkd, .mdwn, .mdown, .mdtxt, .mdtext, .markdown, .text.

![Diagrama de flujo del proyecto md-links](https://i.ibb.co/9qxpwJz/Diagrama-mdlinks-2.png)
**Figura 2.** Diagrama realizado para el flujo del proyecto md-links.

Depúes,  se lee el arvhico usando fs.readFile de node que es un método asincrono y se buscan los links a través de expresiones regulares y se extraen para arrojar un objeto que contiene las propiedades del url, el texto y la dirección del archivo.

La función general también acepta un segundo parámetro que es opcional, validate. Al utilizar validate se empleo axios y se buscó verificar el status code de los links para conocer si las páginas web colocadas en el archivo aún funcionan o presentan errores y de ser asi, se pueden modificar con nuevas ligas que contengan la información que es relevante para las usuarias.

A continuación se muestran imagenes del funcionamiento de la libreria.

![Extraer links de los archivos compatibles](https://i.ibb.co/CWb6XzD/fun-pura.jpg)
**Figura 3.** Funcionamiento de la libreria usando solo la ruta del archivo como parámetro.


![Verificar el código de estatus de los links](https://i.ibb.co/7gWcy6T/Statuscode.jpg)
**Figura 4.** Funcionamiento de la libreria usando la ruta del archivo y el parámetro opcional validate.

## Tests
Para verificar la calidad del código se realizaron test unitarios de las funciones puras de verificar si la ruta es absoluta o no y transformar la ruta a una absoluta, verificar que existan los archivos en el computador, revisar las extansiones, leer y extraer los enlaces y construir un objeto con las propiedades y valores requeridos.

También se testeo la función getStatus que verifica las llamadas HTTP status code utilizando mocks de axios para las promesas obtenidas.

Se obtuvieron los siguientes resultados:
![Test](https://i.ibb.co/cxLrWZN/test.jpg)
**Figura 5.** Los resultados cubren el mínimo de 70% en statements, functions, lines y branches.
