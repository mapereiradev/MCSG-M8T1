const express = require('express');
const signup = require('./routes/signup');
const login = require('./routes/login');
const bodyParser = require('body-parser');
const ejs = require('ejs');


const app = express();

app.use(bodyParser.json());

app.use('/', express.static('public', {
  index: 'index.html'
}));

app.post('/signup', signup);

app.post('/login', login);

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.get('/qrcode', (req, res) => {
  const { qrCode, secret } = req.body;
  ejs.render(__dirname + '/public/qrcode.html', {qrCode: qrCode, secret: secret});
});


app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});