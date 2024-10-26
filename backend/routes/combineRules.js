const express = require('express');
const router = express.Router();
const db = require('../db');

const combineRules = (rule1, rule2) => {
  return `(${rule1}) AND (${rule2})`;
};

router.post('/combine', async (req, res) => {
  const { ruleIds } = req.body;
  console.log("Received rule combination request.");
  console.log("Received rule IDs for combination:", ruleIds);
  if (!ruleIds || ruleIds.length !== 2) {
    console.error("Invalid rule IDs: Two rule IDs are required.");
    return res.status(400).json({ message: 'Two rule IDs are required.' });
  }
  console.log(`Fetching rule texts for rule IDs: ${ruleIds[0]} and ${ruleIds[1]}`);
  const query = 'SELECT rule_text FROM rules WHERE id IN (?, ?)';
  db.query(query, [ruleIds[0], ruleIds[1]], (err, results) => {
    if (err) {
      console.error('Database error during rule fetch:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (results.length !== 2) {
      console.error("Rule fetch error: Not all rule IDs were found in the database.");
      return res.status(400).json({ message: 'Invalid rule IDs.' });
    }

    const rule1Text = results[0].rule_text;
    const rule2Text = results[1].rule_text;
    console.log("Fetched rule texts:");
    console.log(`Rule 1: ${rule1Text}`);
    console.log(`Rule 2: ${rule2Text}`);
    const combinedRuleText = combineRules(rule1Text, rule2Text);
    console.log("Combined rule text:", combinedRuleText);

    const insertQuery = 'INSERT INTO rules (rule_text) VALUES (?)';
    console.log("Inserting combined rule into the database...");
    db.query(insertQuery, [combinedRuleText], (insertErr, insertResults) => {
      if (insertErr) {
        console.error('Database error during rule insertion:', insertErr);
        return res.status(500).json({ message: 'Failed to save combined rule.' });
      }

      console.log(`Combined rule inserted successfully with ID: ${insertResults.insertId}`);

      res.json({
        combinedRule: {
          id: insertResults.insertId,
          rule_text: combinedRuleText
        }
      });
      console.log("Response sent to frontend with combined rule data.");
    });
  });
});

module.exports = router;
