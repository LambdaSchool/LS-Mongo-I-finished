const bodyParser = require('body-parser');
const express = require('express');

const User = require('./user.js');

const STATUS_USER_ERROR = 422;

const server = express();
server.use(bodyParser.json());

const queryAndRespond = (query, res) => {
  query.exec((err, result) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

server.get('/users', (req, res) => {
  queryAndRespond(User.find({}), res);
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  queryAndRespond(User.findById(id), res);
});

server.post('/users', (req, res) => {
  const { username, age } = req.body;
  const user = new User({ username, age });

  user.save((err) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
    } else {
      res.json(user);
    }
  });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id, (err, user) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
    } else if (!user) {
      res.status(STATUS_USER_ERROR);
      res.json({ error: 'Must provide a valid ID' });
    } else {
      res.json({ success: true });
    }
  });
});

server.listen(3000);
