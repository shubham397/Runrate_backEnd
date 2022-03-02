const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const userRoute = require('./routes/users');
const contactRoute = require('./routes/contacts');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

require("./config/database").connect();

app.use('/api/v1/user', userRoute);
app.use('/api/v1/contact', contactRoute);

app.use('*', function(req, res){
    res.status(404).send('Page Not Found');
  });


app.listen(4000, () => console.log('Listening on port 4000!'));