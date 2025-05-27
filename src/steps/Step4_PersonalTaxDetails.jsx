import React, { useState } from 'react';
import '../App.css';

function Step4_PersonalTaxDetails({ next, prev, data }) {
  const [form, setForm] = useState({
    saChoice: data.saChoice || '',
    otherCompany: data.otherCompany || '',
    personalUTR: data.personalUTR || '',
    otherCompanyName: data.otherCompanyName || '',
    otherCompanyStart: data.otherCompanyStart || '',
    otherCompanyShares: data.otherCompanyShares || '',
    otherCompanyIncome: data.otherCompanyIncome || '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'saChoice' && value !== "already_registered" ? { personalUTR: '' } : {}),
      ...(name === 'otherCompany' && value !== 'Yes'
        ? {
            otherCompanyName: '',
            otherCompanyStart: '',
            otherCompanyShares: '',
            otherCompanyIncome: '',
          }
        : {}),
    }));

    if (name === 'personalUTR') {
      if (value && !/^\d{10}$/.test(value)) {
        setError('UTR must be exactly 10 digits');
      } else {
        setError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.saChoice === 'already_registered' && !/^\d{10}$/.test(form.personalUTR)) {
      setError('Please enter a valid 10-digit UTR');
      return;
    }

    next(form);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Would you like Crunch to register you with HMRC for Self Assessment?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="saChoice"
              value="not_interested"
              checked={form.saChoice === 'not_interested'}
              onChange={handleChange}
              required
            /> I'm not interested in Crunch handling this
          </label>
          <label>
            <input
              type="radio"
              name="saChoice"
              value="not_registered"
              checked={form.saChoice === 'not_registered'}
              onChange={handleChange}
              required
            /> Yes please, I'm not registered
          </label>
          <label>
            <input
              type="radio"
              name="saChoice"
              value="will_do_myself"
              checked={form.saChoice === 'will_do_myself'}
              onChange={handleChange}
              required
            /> No thanks, I'll do it myself
          </label>
          <label>
            <input
              type="radio"
              name="saChoice"
              value="already_registered"
              checked={form.saChoice === 'already_registered'}
              onChange={handleChange}
              required
            /> No thanks, I'm already registered
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>
          Are you a director and/or shareholder in any other limited companies?
          <span className="tooltip">
            This can affect the accounting advice we give and is required for HMRC registrations.
          </span>
        </label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="otherCompany"
              value="Yes"
              checked={form.otherCompany === 'Yes'}
              onChange={handleChange}
              required
            /> Yes
          </label>
          <label>
            <input
              type="radio"
              name="otherCompany"
              value="No"
              checked={form.otherCompany === 'No'}
              onChange={handleChange}
              required
            /> No
          </label>
        </div>
      </div>

      {form.otherCompany === 'Yes' && (
        <>
          <div className="form-group">
            <label>
              What is the name of the other company you're involved in?
              <span className="tooltip">
                Please provide this exactly as it's registered with Companies House.
              </span>
            </label>
            <input
              type="text"
              name="otherCompanyName"
              value={form.otherCompanyName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>What date did your involvement begin?</label>
            <input
              type="date"
              name="otherCompanyStart"
              value={form.otherCompanyStart}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              If applicable, what percentage of shares do you hold in this company?
              <span className="tooltip">
                Need help? Click here to see our Help Centre article about shares.
              </span>
            </label>
            <input
              type="text"
              name="otherCompanyShares"
              value={form.otherCompanyShares}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Do you receive a salary or dividends from the other business?</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="otherCompanyIncome"
                  value="Yes"
                  checked={form.otherCompanyIncome === 'Yes'}
                  onChange={handleChange}
                  required
                /> Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="otherCompanyIncome"
                  value="No"
                  checked={form.otherCompanyIncome === 'No'}
                  onChange={handleChange}
                  required
                /> No
              </label>
            </div>
          </div>
        </>
      )}

      {form.saChoice === 'already_registered' && (
        <div className="form-group">
          <label>Your personal Self Assessment UTR</label>
          <span className="tooltip">
            This will be 10 digits long. Be careful not to confuse it with your company UTR.
          </span>
          <input
            type="text"
            name="personalUTR"
            value={form.personalUTR}
            onChange={handleChange}
            maxLength={10}
            required
          />
          {error && <p className="error">{error}</p>}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button type="button" className="primary-btn" onClick={prev}>Back</button>
        <button type="submit" className="primary-btn">Next</button>
      </div>
    </form>
  );
}

export default Step4_PersonalTaxDetails;
