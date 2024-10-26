import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CreateRule from './components/CreateRule';
import CombineRule from './components/CombineRule';
import EvaluateRule from './components/EvaluateRule';
import IntroCards from './components/IntroCards';

function App() {
  return (
    <Router>
      <div>
        <div className="tabs">
          <Link to="/create-rule" className="tab">Create Rule</Link>
          <Link to="/combine-rule" className="tab">Combine Rule</Link>
          <Link to="/evaluate-rule" className="tab">Evaluate Rule</Link>
        </div>

        <div className="content">
          <Routes>
            <Route path="/" element={<IntroCards />} />
            <Route path="/create-rule" element={<CreateRule />} />
            <Route path="/combine-rule" element={<CombineRule />} />
            <Route path="/evaluate-rule" element={<EvaluateRule />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
