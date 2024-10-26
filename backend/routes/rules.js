const express = require('express');
const router = express.Router();
const db = require('../db'); 

router.get('/', (req, res) => {
  const query = 'SELECT * FROM rules';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching rules:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json(results);
  });
});

module.exports = router;
