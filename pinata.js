var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');

REACT_APP_PINATA_KEY = "ff165804f384fd77d970",
REACT_APP_PINATA_SECRET = "267d3a7ba4bf6030746d9a126d45f9d322071592b7c96e363ef120c2a00521bc",

async function pinata(location) {



var data = new FormData();
data.append('file', fs.createReadStream(`/upload/images/${file.fieldname}_${Date.now()}_${file.originalname}`));
data.append('pinataOptions', '{"cidVersion": 1}');
data.append('pinataMetadata', '{"name": "MyFile", "keyvalues": {"company": "Pinata"}}');

var config = {
  method: 'post',
  url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
  headers: { 
    pinata_api_key: REACT_APP_PINATA_KEY, 
    pinata_secret_api_key: REACT_APP_PINATA_SECRET,
    'Content-Type': 'multipart/form-data; boundary='
  },
  data : data
};

const res = await axios(config);

console.log(res.data);

return res.data

}