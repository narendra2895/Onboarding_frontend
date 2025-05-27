import React, { useState } from 'react';
import '../App.css';

function Step6_PAYERegistration({ next, prev, data }) {
  const [form, setForm] = useState({
    isRegisteredForPAYE: data.isRegisteredForPAYE || '',
    payeReference: data.payeReference || '',
    accountsOfficeRef: data.accountsOfficeRef || '',
    payeSetupDate: data.payeSetupDate || '',
    crunchTakeoverDate: data.crunchTakeoverDate || '',
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
      <h2>PAYE Registration</h2>

      <div className="form-group">
        <label>Is your limited company currently registered for PAYE with HMRC?</label>
        <span className="tooltip">You won't be able to file a salary without one. If needed, we'll set one up for you.</span>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="isRegisteredForPAYE"
              value="Yes"
              checked={form.isRegisteredForPAYE === 'Yes'}
              onChange={handleChange}
              required
            /> Yes
          </label>
          <label>
            <input
              type="radio"
              name="isRegisteredForPAYE"
              value="No"
              checked={form.isRegisteredForPAYE === 'No'}
              onChange={handleChange}
              required
            /> No
          </label>
        </div>
      </div>

      {form.isRegisteredForPAYE === 'Yes' && (
        <>
          <div className="form-group">
            <label>What is the PAYE scheme reference?</label>
            <span className="tooltip">The reference should look like this: 123/AB123456</span>
            <input
              type="text"
              name="payeReference"
              value={form.payeReference}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Accounts Office Reference</label>
            <span className="tooltip">The reference should look like this: 123AB12345678</span>
            <input
              type="text"
              name="accountsOfficeRef"
              value={form.accountsOfficeRef}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>If known, when was your PAYE scheme set up?</label>
            <input
              type="date"
              name="payeSetupDate"
              value={form.payeSetupDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>When do you want Crunch to take over filing your PAYE?</label>
            <span className="tooltip">If moving from another firm, choose the date they will stop filing.</span>
            <input
              type="date"
              name="crunchTakeoverDate"
              value={form.crunchTakeoverDate}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
        <button type="button" className="primary-btn" onClick={prev}>Back</button>
        <button type="submit" className="primary-btn">Next</button>
      </div>
    </form>
  );
}

export default Step6_PAYERegistration;