import React, { useState } from 'react';
import Form from './pages/Form';
import './App.css';

function App() {
  const [start, setStart] = useState(false);

  return start ? (
    <Form />
  ) : (
    <div className="landing-background">
      <div className="landing">
        <img
          src="https://cdn.prod.website-files.com/64104989294ba00431b916de/64108eacccaabfaf580a6981_crunch%20logo.svg"
          alt="Crunch Logo"
          style={{ maxWidth: '100rem', marginBottom: '1rem' }}
        />
        <h1>Onboarding Form</h1>
        <p>Welcome to your personalized Crunch onboarding experience.</p>
        <button onClick={() => setStart(true)}>Begin Questionnaire</button>
      </div>
    </div>
  );
}

export default App;
