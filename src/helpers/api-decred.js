import axios from 'axios';

export const checkIfDocumentExistInDecred = async digestFirmed => {
  const url = 'https://time-testnet.decred.org:59152/v2/verify/batch';
  const json = JSON.stringify({
    "id":"dcrtime cli",
	  "digests":[
        digestFirmed
    ]
  })
  const response = await axios.post(url, json);
  console.log(response.data)
  return Promise.resolve(response.data.digests);
} 