const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/tokenPrice', async (req, res) => {
  try {
    const { query } = req;

    const options = {
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': process.env.COINGECKO_KEY,
      },
    };

    const responseOne = await axios.get(
      `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${query.addressOne}&vs_currencies=usd`,
      options
    );

    const responseTwo = await axios.get(
      `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${query.addressTwo}&vs_currencies=usd`,
      options
    );

    const usdPrices = {
      tokenOne: responseOne.data[query.addressOne]['usd'],
      tokenTwo: responseTwo.data[query.addressTwo]['usd'],
      ratio:
        responseOne.data[query.addressOne]['usd'] /
        responseTwo.data[query.addressTwo]['usd'],
    };

    res.status(200).json(usdPrices);
  } catch (error) {
    console.log('Error', error);
  }
});

app.get('/', () => {
  console.log(`Swap X API is running`);
});

app.listen(port, () => {
  console.log(`Listening for API Calls`);
});
