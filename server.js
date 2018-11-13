
var express = require('express');


const app = express();

app.listen(10100, () => console.log('Gator app listening on port 10100!'));

app.use(express.static(__dirname )); //__dir and not _dir
app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
