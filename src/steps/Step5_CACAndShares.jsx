import React, { useState } from 'react';
import '../App.css';

function Step5_CACAndShares({ next, prev, data }) {
  const [form, setForm] = useState({
    cacCode: data.cacCode || '',
    shareValue: data.shareValue || '',
    shareChanges: data.shareChanges || '',
    prevAccountantName: data.prevAccountantName || '',
    prevAccountantPhone: data.prevAccountantPhone || '',
    prevAccountantEmail: data.prevAccountantEmail || '',
    contactPermissionDate: data.contactPermissionDate || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    next(form);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Company Authentication Code & Shares</h2>

      <div className="form-group">
        <label>Company Authentication Code (CAC)</label>
        <span className="tooltip">This is 6 characters long and can be a mix of letters and numbers. Leave blank if unsure.</span>
        <input
          type="text"
          name="cacCode"
          value={form.cacCode}
          onChange={handleChange}
          maxLength={6}
        />
      </div>

      <div className="form-group">
        <label>How much is one share in your company worth? (in GBP)</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>£</span>
          <input
            type="number"
            name="shareValue"
            value={form.shareValue}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Have there been any share changes in the current company year?</label>
        <span className="tooltip">This could include adding/removing shareholders or shares, or changing share value.</span>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="shareChanges"
              value="Yes"
              checked={form.shareChanges === 'Yes'}
              onChange={handleChange}
              required
            /> Yes
          </label>
          <label>
            <input
              type="radio"
              name="shareChanges"
              value="No"
              checked={form.shareChanges === 'No'}
              onChange={handleChange}
              required
            /> No
          </label>
        </div>
      </div>

      <h3>Previous Accountant</h3>
      <p className="tooltip">
        We'll contact them to request professional clearance. Please advise when we can do so.
      </p>

      <div className="form-group">
        <label>Accountant's Name</label>
        <input
          type="text"
          name="prevAccountantName"
          value={form.prevAccountantName}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Accountant's Phone</label>
        <input
          type="tel"
          name="prevAccountantPhone"
          value={form.prevAccountantPhone}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Accountant's Email</label>
        <input
          type="email"
          name="prevAccountantEmail"
          value={form.prevAccountantEmail}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Date you're happy for us to contact them from</label>
        <input
          type="date"
          name="contactPermissionDate"
          value={form.contactPermissionDate}
          onChange={handleChange}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
        <button type="button" className="primary-btn" onClick={prev}>Back</button>
        <button type="submit" className="primary-btn">Next</button>
      </div>
    </form>
  );
}

export default Step5_CACAndShares;
