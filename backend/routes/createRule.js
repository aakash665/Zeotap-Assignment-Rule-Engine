const express = require('express');
const router = express.Router();
const db = require('../db'); 
console.log("Create rule received.............");

function isValidAST(rule) {
  const astPattern = /^(?:\w+\s*([<>=!]+)\s*['"]?\w+['"]?)(\s+(AND|OR)\s+(?:\w+\s*([<>=!]+)\s*['"]?\w+['"]?))*$/;
  return astPattern.test(rule);
}

router.post('/', (req, res) => {
  const { rule_text } = req.body;

  if (!rule_text) {
    return res.status(400).json({ message: 'Rule text is required' });
  }

  console.log('Received rule text:', rule_text);

  if (!isValidAST(rule_text)) {
    return res.status(400).json({ message: 'Not a valid AST representation' });
  }

  const query = 'INSERT INTO rules(rule_text) VALUES (?)';
  db.query(query, [rule_text], (err, results) => {
    if (err) {
      console.error('Error inserting rule:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    console.log(`Rule inserted with ID: ${results.insertId}`);
    res.status(201).json({ message: 'Rule created successfully', id: results.insertId });
  });
});

module.exports = router;
