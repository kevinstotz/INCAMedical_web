
require('dotenv').config();
const config = require('./config');

var express = require('express');
const app = express();
const prod = config.getProperties('prod');

app.listen(prod.web_port), () => console.log('Listening on port: ' + prod.web_port);

app.use(express.static(__dirname )); //__dir and not _dir
app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
