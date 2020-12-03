Dcrtime Explorer
==========

[![ISC License](https://img.shields.io/badge/license-ISC-blue.svg)](http://copyfree.org)

## Resumen

**Dcrtime Explorer is an application that allows you to sign, register and verify the existence of digital files in the Decred block chain. Inspired and developed on Dcrtime. A service that allows to make generic time stamping. The novelty lies in adding a digital signature system and a hash verifier.**  
This project was created within the Blockchain Learning Challenge Latinoamerica 2020 event.

## Demo

If you want to see the project in action [Dcrtime Explorer](https://dcrtime-explorer.herokuapp.com/).
If you have any problem the first time you access please reload the page . [Heroku official note](https://devcenter.heroku.com/articles/dynos#dyno-sleeping)

## Technical Details

- This application, Dcrtime and Decred use the sha256 hash function.
- **Files are not saved on a server**. This application uses 
[dcrtime](https://github.com/decred/dcrtime) as a backend to save and anchor the signed hashes of the files.
- This application uses [dcrtimejs](https://github.com/tiagoalvesdulce/dcrtimejs) to communicate with dcrtime's APIS.
- Private and public keys are generated using native cryptographic libraries of the browsers [Crypto](https://developer.mozilla.org/es/docs/Web/API/Crypto).
- The signature service uses the RSA-PSS algorithm to generate the keys [Ejemplo](https://github.com/diafygi/webcrypto-examples#rsa-pss).
- Its development was based on [Create React App](https://github.com/facebook/create-react-app) and [Material-UI](https://material-ui.com/).

## Requirements

- node v12.1.0 or greater.
- git 2.28.0 or greater.
- yarn 1.22.4 or greater
## Installation steps
```bash
git clone https://github.com/yoandresaav/dcrtime-explorer.git
yarn install
yarn run start (to run in mainnet)
yarn run start-test (to run in testnet)
```
## Recommendations for further development

- Embed the Verification File in metadata of generated file.
- Develop a service for the custody of documents, keys and Signature Proofs.
- Solve the problem of having to wait 30 minutes for the document to be anchored in the Decred blockchain.

## Preview

View of the check file screen.

![](/preview.png)

## Note

Waiting 30 minutes can be a long time to test the verification system. You can use this pre-signed file for testing. ![Verify File](/Firmed-0.jpeg.json)

## Meme Explainer

Fun time

![](/meme-dcrtime-explorer.png)