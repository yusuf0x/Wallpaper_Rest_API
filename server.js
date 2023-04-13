const app = require('./routes/route');
const axios = require('axios'); 
const rp = require('request-promise');
const cheerio = require('cheerio');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});

