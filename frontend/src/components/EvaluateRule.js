import React, { useState, useEffect } from 'react';
import '../styles/EvaluateRule.css';

const EvaluateRule = () => {
  const [rules, setRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState('');
  const [inputValues, setInputValues] = useState({});
  const [message, setMessage] = useState('');
  const [evaluationResult, setEvaluationResult] = useState(null);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/rules');
        const data = await response.json();
        setRules(data);
      } catch (error) {
        setMessage('Error fetching rules from server.');
      }
    };
    fetchRules();
  }, []);

  const handleRuleChange = (e) => {
    const rule = e.target.value;
    setSelectedRule(rule);
    setInputValues({});

    const match = rule.match(/(\w+)\s*([<>=!]+)\s*(\w+|["'][^"']*["'])/g);
    if (match) {
      const initialValues = {};
      match.forEach(cond => {
        const parts = cond.split(/\s*[<>=!]+\s*/);
        const key = parts[0].trim();
        initialValues[key] = '';
      });
      setInputValues(initialValues);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const evaluateRule = () => {
    setMessage('');

    if (!selectedRule) {
      setMessage('Please select a rule.');
      return;
    }

    const inputArray = Object.entries(inputValues);
    if (inputArray.some(([, value]) => value === '')) {
      setMessage('Please fill all input fields.');
      return;
    }

    try {
      const isRuleSatisfied = (rule, inputs) => {
        const orConditions = rule.split(' OR ').map(cond => cond.trim());
        return orConditions.some(condition => {
          const andConditions = condition.split(' AND ').map(cond => cond.trim());
          return andConditions.every(cond => evaluateCondition(cond, inputs));
        });
      };

      const evaluateCondition = (cond, inputs) => {
        const [key, operator, value] = cond.match(/(\w+)\s*([<>=!]+)\s*(.+)/).slice(1);
        const userValue = inputs[key];

        const cleanedValue = value.replace(/['"]/g, '');
        const parsedUserValue = isNaN(userValue) ? userValue : Number(userValue);
        const parsedCleanedValue = isNaN(cleanedValue) ? cleanedValue : Number(cleanedValue);

        switch (operator) {
          case '<':
            return parsedUserValue < parsedCleanedValue;
          case '<=':
            return parsedUserValue <= parsedCleanedValue;
          case '>':
            return parsedUserValue > parsedCleanedValue;
          case '>=':
            return parsedUserValue >= parsedCleanedValue;
          case '==':
          case '===':
            return parsedUserValue === cleanedValue;
          case '!=':
          case '!==':
            return parsedUserValue !== cleanedValue;
          default:
            return false;
        }
      };

      const result = isRuleSatisfied(selectedRule, inputValues);
      setEvaluationResult(result ? 'Rule applies to the input data.' : 'Rule does not apply to the input data.');
    } catch (error) {
      setMessage('Error: Please ensure your inputs are valid.');
    }
  };

  return (
    <div>
      <h2>Evaluate Rule</h2>
      {message && <p>{message}</p>}

      <label htmlFor="ruleSelect">Select Rule:</label>
      <select
        id="ruleSelect"
        value={selectedRule}
        onChange={handleRuleChange}
      >
        <option value="">-- Select a rule --</option>
        {rules.map((rule) => (
          <option key={rule.id} value={rule.rule_text}>
            {rule.rule_text}
          </option>
        ))}
      </select>

      {selectedRule && Object.keys(inputValues).map((key) => (
        <div key={key}>
          <label htmlFor={key}>{key}:</label>
          <input
            type={isNaN(inputValues[key]) ? 'text' : 'number'}
            id={key}
            name={key}
            value={inputValues[key]}
            onChange={handleInputChange}
            placeholder={`Enter ${key}`}
          />
        </div>
      ))}

      <button onClick={evaluateRule}>Evaluate</button>

      {evaluationResult && (
        <div>
          <h3>Evaluation Result:</h3>
          <p>{evaluationResult}</p>
        </div>
      )}
    </div>
  );
};

export default EvaluateRule;
