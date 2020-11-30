
export function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

function arrayBufferToBase64(arrayBuffer) {
  var byteArray = new Uint8Array(arrayBuffer);
  var byteString = '';
  for(var i=0; i < byteArray.byteLength; i++) {
      byteString += String.fromCharCode(byteArray[i]);
  }
  var b64 = window.btoa(byteString);

  return b64;
}

export function base64StringToArrayBuffer(b64str) {
  var byteStr = atob(b64str);
  var bytes = new Uint8Array(byteStr.length);
  for (var i = 0; i < byteStr.length; i++) {
    bytes[i] = byteStr.charCodeAt(i);
  }
  return bytes.buffer;
}

export function bufferToArrayBuffer(buf) {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
      view[i] = buf[i];
  }
  return ab;
}

function textToArrayBuffer(str) {
  var buf = unescape(encodeURIComponent(str)); // 2 bytes for each char
  var bufView = new Uint8Array(buf.length);
  for (var i=0; i < buf.length; i++) {
    bufView[i] = buf.charCodeAt(i);
  }
  return bufView;
}

export function str2ab(str) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}


function convertPemToBinary(pem) {
  var lines = pem.split('\n');
  var encoded = '';
  for (var i = 0; i < lines.length; i++) {
      if (lines[i].trim().length > 0 &&
          lines[i].indexOf('-----BEGIN RSA PRIVATE KEY-----') < 0 &&
          lines[i].indexOf('-----BEGIN RSA PUBLIC KEY-----') < 0 &&
          lines[i].indexOf('-----BEGIN PUBLIC KEY-----') < 0 &&
          lines[i].indexOf('-----END PUBLIC KEY-----') < 0 &&
          lines[i].indexOf('-----BEGIN PRIVATE KEY-----') < 0 &&
          lines[i].indexOf('-----END PRIVATE KEY-----') < 0 &&
          lines[i].indexOf('-----END RSA PRIVATE KEY-----') < 0 &&
          lines[i].indexOf('-----END RSA PUBLIC KEY-----') < 0) {
          encoded += lines[i].trim();
      }
  }
  return base64StringToArrayBuffer(encoded);
}


function addNewLines(str) {
  var finalString = '';
  while(str.length > 0) {
      finalString += str.substring(0, 64) + '\n';
      str = str.substring(64);
  }
  return finalString;
}


function toPem(privateKey, prefixIni, prefixEnd) {
  var b64 = addNewLines(arrayBufferToBase64(privateKey));
  var pem = `${prefixIni}\n` + b64 + `${prefixEnd}`;
  return pem;
}


export const generateKey = async () => {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "RSA-PSS",
      // Consider using a 4096-bit key for systems that require long-term security
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"]
  )
  return await Promise.resolve(keyPair)
}


export const exportPrivateCryptoKey = async (key) => {
  const exported = await crypto.subtle.exportKey(
    "pkcs8",
    key
  );
  // 
  var pem = toPem(exported, '-----BEGIN PRIVATE KEY-----', '-----END PRIVATE KEY-----');
  return Promise.resolve(pem);
}

export const exportPublicCryptoKey = async (key) => {
  const exported = await crypto.subtle.exportKey(
    "spki",
    key
  );
  var pem = toPem(exported, '-----BEGIN PUBLIC KEY-----', '-----END PUBLIC KEY-----');
  return Promise.resolve(pem);
}


export const signData = async (privateKey, data) => {
  const signature = await crypto.subtle.sign(
      {
          name: "RSA-PSS",
          saltLength: 128, //the length of the salt
      },
      privateKey, //from generateKey or importKey above
      data, //ArrayBuffer of data you want to sign
  );

  return await Promise.resolve(new Uint8Array(signature))
}


export const importPrivateKey = async base64 => {

  const pemKey = atob(base64);
  // remove new line
  const peem = pemKey.replace(/[^\x20-\x7E]/gmi, "") 
  
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  
  const pemContents = peem.substring(pemHeader.length, peem.length - pemFooter.length);
  const binaryDerString = convertPemToBinary(pemContents)
  
  const key = await crypto.subtle.importKey(
    "pkcs8", 
    binaryDerString, 
    {   //these are the algorithm options
      name: "RSA-PSS",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
    }, 
    true, 
    ["sign"]
  );
  return await Promise.resolve(key);
}


export const importPublicKey = async textPlain => {

  // remove new line
  const peem = textPlain.replace(/[^\x20-\x7E]/gmi, "") 
  
  const pemHeader = "-----BEGIN PUBLIC KEY-----";
  const pemFooter = "-----END PUBLIC KEY-----";
  
  const cleanText = peem.substring(pemHeader.length, peem.length - pemFooter.length);
  const binaryDerString = convertPemToBinary(cleanText)
  
  const key = await crypto.subtle.importKey(
    "spki", 
    binaryDerString, 
    {   //these are the algorithm options
      name: "RSA-PSS",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
    }, 
    true, 
    ["verify"]
  );
  return await Promise.resolve(key);
}


export const verifyFirmed = async (publicKey, signature, data) => {
  const isValid = await window.crypto.subtle.verify(
    {
        name: "RSA-PSS",
        saltLength: 128, //the length of the salt
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: {name: "SHA-256"},
    },
    publicKey, //from generateKey or importKey above
    signature, //ArrayBuffer of the signature
    data //ArrayBuffer of the data
  )
  return await Promise.resolve(isValid);
} 