
const express = require("express");
const server = express();
const fs = require("fs");
const bodyParser = require('body-parser');
const path = require("path");
const resultSaver = require('./saveResult');

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/', (req, res) => {
  res.render('login');
});

server.post('/test', (req, res) => {
  const { username } = req.body;
  const data = JSON.parse(fs.readFileSync('test.json', 'utf-8'));
  const quiz = Object.values(data);
  res.render('test', { username, questions: quiz });
});

server.post('/result', resultSaver, (req, res) => {
  res.render('result', { username: req.username, score: req.score, total: req.total });
});

const PORT = 80;
server.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});