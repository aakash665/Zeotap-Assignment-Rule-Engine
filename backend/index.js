const express = require('express');
const cors = require('cors');
const db = require('./db'); 
const createRuleRouter = require('./routes/createRule'); 
const combineRuleRouter = require('./routes/combineRules'); 
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/createRule', createRuleRouter);

app.get('/api/rules', (req, res) => {
  console.log("Fetch rules received...........");
  const query = 'SELECT * FROM rules';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching rules:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json(results);
  });
});

app.use('/api/rules', combineRuleRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
