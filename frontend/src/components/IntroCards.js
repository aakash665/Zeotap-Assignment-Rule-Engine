import React, { useState, useEffect } from 'react';
import '../styles/IntroCards.css'; 

const IntroCards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  
  const cards = [
    {
      title: "Create Rule",
      description: "With the 'Create Rule' feature, you can easily define custom rules tailored to your specific needs. Simply enter the rule text in a user-friendly form, and our system will validate and store your rules for future use. Create simple or complex conditions to match your criteria.",
    },
    {
      title: "Combine Rules",
      description: "The 'Combine Rules' functionality allows you to select multiple rules and merge them into a single, comprehensive rule. This is useful for building complex logical statements. Choose your rules from a list, and let our engine handle the combining process for more powerful evaluations.",
    },
    {
      title: "Evaluate Data",
      description: "Utilize the 'Evaluate Data' feature to input your data and check it against the rules you've created. Enter relevant data such as age, salary, and experience, and see if your data meets the conditions of the selected rules. This will help you make informed decisions based on your custom criteria.",
    },
  ];

  const nextCard = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      window.location.href = '/create-rule'; 
    }
  };

  return (
    <div className="intro-cards">
      <div className="card">
        <h2>{cards[currentCard].title}</h2>
        <p>{cards[currentCard].description}</p>
        <button onClick={nextCard}>
          {currentCard < cards.length - 1 ? "Next" : "Get Started"}
        </button>
      </div>
    </div>
  );
};

export default IntroCards;
