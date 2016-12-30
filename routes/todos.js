'use strict';

const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

router.get('/', (req, res) => {
  Todo.find( ( err, todos ) => {
    res.json(todos);
  });
});

router.post('/', (req, res) => {
  new Todo({
    text: req.body.text
  }).save( (err, todo) => {
    if (err)
      return res.status(500).json(err)
    return res.json(todo);
  });
});

router.put('/:id', (req, res) => {
  Todo.findByIdAndUpdate(
    req.params.id,
    { $set: { completed: req.body.completed }},
    { new: true },
    (err, todo) => { res.json(todo); }
  );
});

router.delete('/:id', (req, res) => {
  Todo.find( { _id: req.params.id }).remove( (err, todo) => {
    res.json(todo);
  });
});

module.exports = router;
