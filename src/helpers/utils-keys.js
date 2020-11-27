
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
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
  const exportedAsString = ab2str(exported);
  const exportedAsBase64 = btoa(exportedAsString);
  const pemExported = `-----BEGIN PRIVATE KEY-----\n${exportedAsBase64}\n-----END PRIVATE KEY-----`;

  console.log(pemExported)
  return await Promise.resolve(pemExported)
}

export const exportPublicCryptoKey = async (key) => {
  const exported = await crypto.subtle.exportKey(
    "spki",
    key
  );
  const exportedAsString = ab2str(exported);
  const exportedAsBase64 = btoa(exportedAsString);
  const pemExported = `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`;

  console.log(pemExported)
  return await Promise.resolve(pemExported)
}

export const signData = async (privateKey, data) => {
  const signature = await crypto.subtle.sign(
      {
          name: "RSA-PSS",
          saltLength: 128, //the length of the salt
      },
      privateKey, //from generateKey or importKey above
      data //ArrayBuffer of data you want to sign
  )

  console.log('signature: ', signature);
  console.log(new Uint8Array(signature));
  return await Promise.resolve(new Uint8Array(signature))
}

/**

window.crypto.subtle.verify(
    {
        name: "RSA-PSS",
        saltLength: 128, //the length of the salt
    },
    publicKey, //from generateKey or importKey above
    signature, //ArrayBuffer of the signature
    data //ArrayBuffer of the data
)
.then(function(isvalid){
    //returns a boolean on whether the signature is true or not
    console.log(isvalid);
})
.catch(function(err){
    console.error(err);
});

 */