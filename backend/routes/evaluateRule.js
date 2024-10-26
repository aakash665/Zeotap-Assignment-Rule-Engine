const express = require('express');
const router = express.Router();
const db = require('../db'); 

const evaluateRuleAST = (ast, data) => {
  
  let conditionsMet = true;

  const conditions = ast.split('AND').map(cond => cond.trim());

  conditions.forEach(condition => {
    const [left, operator, right] = condition.split(' ');

    const attribute = left.trim();
    const value = right.replace(/['"]+/g, '').trim(); 

    if (operator === '>') {
      conditionsMet = conditionsMet && data[attribute] > Number(value);
    } else if (operator === '=') {
      conditionsMet = conditionsMet && data[attribute] === value;
    } else if (operator === '<') {
      conditionsMet = conditionsMet && data[attribute] < Number(value);
    }
  });

  return conditionsMet;
};

router.post('/', (req, res) => {
  const { data } = req.body; 

  if (!data) {
    return res.status(400).json({ message: 'User data is required' });
  }

  const query = 'SELECT combined_ast FROM combined_rules WHERE id = 1'; 
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching AST:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No combined rule found' });
    }

    const ast = results[0].combined_ast; 

    try {
      const isValid = evaluateRuleAST(ast, data); 
      res.json({ isValid });
    } catch (err) {
      console.error('Error evaluating rule:', err);
      res.status(500).json({ message: 'Error evaluating rule' });
    }
  });
});

module.exports = router;
