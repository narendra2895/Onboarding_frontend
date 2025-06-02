import React, { useState } from 'react';
import '../App.css';

function Step1_CompanyDetails({ next, data }) {
  const [form, setForm] = useState({
    incorporated: data.incorporated || '',
    companyName: data.companyName || '',
    incorporationDate: data.incorporationDate || '',
    activity: data.activity || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Regex to validate company name
    const companyNameValid = /(Ltd|Limited)\.?$/i.test(form.companyName.trim());

    if (!companyNameValid) {
      setErrors(prev => ({
        ...prev,
        companyName: 'Company name must end with "Ltd", "LTD", "Limited", or "LIMITED".',
      }));
      return;
    }

    setErrors({});
    next(form);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Have you already incorporated your business?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="incorporated"
              value="Yes"
              checked={form.incorporated === 'Yes'}
              onChange={handleChange}
              required
            /> Yes
          </label>
          <label>
            <input
              type="radio"
              name="incorporated"
              value="No"
              checked={form.incorporated === 'No'}
              onChange={handleChange}
              required
            /> No
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>
          What's your business going to be called?
          {form.incorporated === 'No' && (
            <span className="tooltip">
              Please provide the exact spelling of your business name,
              including if it's going to be Limited or Ltd.
            </span>
          )}
        </label>
        <input
          type="text"
          name="companyName"
          value={form.companyName}
          onChange={handleChange}
          required
        />
        {errors.companyName && (
          <p className="error-message">{errors.companyName}</p>
        )}
      </div>

      {form.incorporated && (
        <div className="form-group">
          <label>
            {form.incorporated === 'Yes'
              ? 'On what date was the company incorporated?'
              : 'When do you intend to start working through the business?'}
          </label>
          <input
            type="date"
            name="incorporationDate"
            value={form.incorporationDate}
            onChange={handleChange}
            required
            min={form.incorporated === 'No' ? new Date().toISOString().split('T')[0] : undefined}
          />
        </div>
      )}

      <div className="form-group">
        <label>Brief description of your trading activity:</label>
        <textarea
          name="activity"
          value={form.activity}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>

      <button className="primary-btn" type="submit">Next</button>
    </form>
  );
}

export default Step1_CompanyDetails;
