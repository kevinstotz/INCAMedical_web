require('dotenv').config();
const path = require('path');
const config = require('./config');
var express = require('express');
const app = express();
const prod = config.getProperties('prod');

app.listen(config.getProperties().web_port, () => console.log('Listening on port: ' + config.getProperties().web_port));
app.use(express.static(__dirname));
app.use('/media', express.static(path.join(__dirname, "..", "API"))); //__dir and not _dir

app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
