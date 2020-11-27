import dcrtime from "dcrtimejs";

dcrtime.setNetwork('testnet'); //process.env.REACT_APP_NETWORK
export const digestPayload = dcrtime.getSHA256fromBase64;


export const createDigest = file => {
  return new Promise(resolve =>{
    const reader = new FileReader()
    reader.onload = event => {
      var data = event.target.result.split(',')[1];
      var encrypted = digestPayload( data );
      resolve(encrypted)
    }
    reader.readAsDataURL(file);

  })
}

/*

// processFiles adds the base64 payload into the file data
export const processFiles = files =>
  new Promise(resolve => {
    const processedFiles = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (f => event => {
        const payload = event.target.result.split(",")[1];
        const digest = digestPayload(payload);
        setDigestName(digest, f.name);
        processedFiles.push({
          name: f.name,
          payload,
          digest
        });
        if (processedFiles.length === files.length) resolve(processedFiles);
      })(file);
      reader.readAsDataURL(file);
    });
  });

*/