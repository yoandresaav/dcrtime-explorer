Dcrtime Explorer
==========

[![ISC License](https://img.shields.io/badge/license-ISC-blue.svg)](http://copyfree.org)

## Resumen
**Dcrtime Explorer es una aplicación que permite firmar, registrar y verificar la existencia de archivos digitales en la cadena de bloques de Decred. Inspirado y desarrollado sobre Dcrtime. Un servicio que permite hacer sellado genérico de tiempo. La novedad radica en agregar un sistema de firma digital y un verificador de hash.**  
Este proyecto fue creado en el marco del evento Blockchain Learning Challenge Latinoamerica 2020.

## Demo

Si desea ver el proyecto en funcionamiento [Dcrtime Explorer](https://dcrtime-explorer.herokuapp.com/) 

## Detalles Técnicos

- Este servicio, dcrtime and Decred usan la función hash sha256.
- **Los archivos no se guardan en un servidor**. Usamos 
[dcrtime](https://github.com/decred/dcrtime) como backend para guardar y anclar los hash firmados de los archivos.
- Esta aplicación usa [dcrtimejs](https://github.com/tiagoalvesdulce/dcrtimejs) para comunicarse con las APIS de dcrtime.
- Las llaves privadas y públicas se generan usando librerias  criptográficas nativas de los navegadores [Crypto](https://developer.mozilla.org/es/docs/Web/API/Crypto).
- El servicio de firmado usa el algoritmo RSA-PSS para generar las llaves [Ejemplo](https://github.com/diafygi/webcrypto-examples#rsa-pss).
- Su desarrollo se basó en [Create React App](https://github.com/facebook/create-react-app).

## Requisitos

- node v12.1.0 o superior.
- git 2.28.0 o superior.
- yarn 1.22.4
## Pasos de instalación
```bash
git clone https://github.com/yoandresaav/dcrtime-explorer.git
yarn install
yarn run start (to run in mainnet)
yarn run start-test (to run in testnet)
```
## Recomendaciones a seguir desarrollando

- Incrustar el Archivo de Verificación en el archivo.
- Desarrollar un servicio de custodia de documentos, claves y Pruebas de Firmado.

## Preview

Vista de la pantalla de comprobar el Archivo de Verificación.

![](/preview.png)

## Notas

Incluir notas aqui