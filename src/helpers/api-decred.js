import dcrtime from "dcrtimejs";

dcrtime.setNetwork('mainnet'); //process.env.REACT_APP_NETWORK testnet
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

export const checkIfDocumentExistInDecred = async digestFirmed => {
  console.log('checkIfDocumentExistInDecred: ', digestFirmed)
  const res = await dcrtime.verify(digestFirmed);
  console.log('Veryfy', res)
  return Promise.resolve(res.digests);
} 

export const sendDigestToDecred = async digestFirmed => {
  console.log('sendDigestToDecred: ', digestFirmed)
  const res = await dcrtime.timestamp(digestFirmed, "data");
  if (res.error) throw res.error;
  return Promise.resolve(res);
}

export const isDigestAnchored = digest =>
  !!(digest.chaininformation && digest.chaininformation.chaintimestamp);

export const isDigestFound = digest => digest.result === 1;

export const isDigestAnchorPending = digest =>
  isDigestFound(digest) && !isDigestAnchored(digest);

export const isDigestNotAnchored = digest => !isDigestFound(digest);

export const getAnchoredDigests = digests => digests.filter(isDigestAnchored);

export const getPendingDigests = digests =>
  digests.filter(isDigestAnchorPending);

export const getNotAnchoredDigests = data => data.filter(isDigestNotAnchored);