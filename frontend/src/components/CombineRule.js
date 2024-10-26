import React, { useState, useEffect } from 'react';
import '../styles/CombineRule.css';

const CombineRule = () => {
  const [rules, setRules] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]);
  const [message, setMessage] = useState('');
  const [combinedRule, setCombinedRule] = useState(null);

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

  const handleSelect = (ruleId) => {
    if (selectedRules.includes(ruleId)) {
      setSelectedRules(selectedRules.filter(id => id !== ruleId));
    } else if (selectedRules.length < 2) {
      setSelectedRules([...selectedRules, ruleId]);
    } else {
      setMessage('You can only select two rules.');
    }
  };

  const handleCombine = async () => {
    setMessage('');
    if (selectedRules.length !== 2) {
      setMessage('Please select two rules to combine.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/rules/combine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ruleIds: selectedRules }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Rules combined successfully.`);
        setCombinedRule(data.combinedRule);
        setSelectedRules([]);

        const updatedRulesResponse = await fetch('http://localhost:5000/api/rules');
        const updatedRules = await updatedRulesResponse.json();
        setRules(updatedRules);
      } else {
        setMessage('Failed to combine rules');
      }
    } catch (error) {
      setMessage('Error combining rules');
    }
  };

  return (
    <div>
      <h2>Combine Rule</h2>
      {message && <p>{message}</p>}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>Rule Text</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => (
              <tr key={rule.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRules.includes(rule.id)}
                    onChange={() => handleSelect(rule.id)}
                    disabled={
                      !selectedRules.includes(rule.id) && selectedRules.length >= 2
                    }
                  />
                </td>
                <td>{rule.id}</td>
                <td>{rule.rule_text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={handleCombine}>Combine Rule</button>

      {combinedRule && (
        <div>
          <pre>{JSON.stringify(combinedRule, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CombineRule;
