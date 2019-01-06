require('dotenv').config();
const path = require('path');
const config = require('./config');
const fs = require('fs');
var express = require('express');
const app = express();
const prod = config.getProperties('prod');

var global_json = {
  "secure" : config.getProperties().secure,
  "insecure": config.getProperties().insecure,
  "web_port" : config.getProperties().web_port,
  "web_endpoint": config.getProperties().web_endpoint,
  "api_port" : config.getProperties().api_port,
  "api_endpoint": config.getProperties().api_endpoint,
  "client_id": config.getProperties().client_id
}

fs.writeFile("config/global.json", JSON.stringify(global_json), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});

app.listen(config.getProperties().web_port, () => console.log('Listening on port: ' + config.getProperties().web_port));
app.use(express.static(__dirname));
app.use('/media', express.static(path.join(__dirname, "..", "API"))); //__dir and not _dir

app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
