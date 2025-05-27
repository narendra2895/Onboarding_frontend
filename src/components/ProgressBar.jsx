import React from 'react';
import '../App.css';

function ProgressBar({ step, totalSteps }) {
  const percent = Math.round((step / totalSteps) * 100);

  return (
    <div className="progress-wrapper">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="progress-label">
        Step {step} of {totalSteps}
      </p>
    </div>
  );
}

export default ProgressBar;
