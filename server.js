
var express = require('express');


const app = express();

app.listen(10101, () => console.log('Gator app listening on port 10101!'));

app.use(express.static(__dirname )); //__dir and not _dir
app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
