import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateRule.css'; 


const CreateRule = () => {
  const [ruleText, setRuleText] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ruleText) {
      setMessage('Rule text cannot be empty.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/createRule', { rule_text: ruleText });
      setMessage(response.data.message);
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'An error occurred while creating the rule.';
      setMessage(errorMessage);
    }
  };

  return (
    <div>
      <h2>Create Rule</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ruleText}
          onChange={(e) => setRuleText(e.target.value)}
          placeholder="Enter your rule"
        />
        <button type="submit">Create Rule</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateRule;
