import React, { useState, useEffect } from 'react';
import '../App.css';

function Step3_DirectorShareholderDetails({ next, prev, data }) {
  const [form, setForm] = useState({
    role: data.role || '',
    salaryFromCompany: 'No',
    salaryAboveNI: 'No',
    taxCode: data.taxCode || '',
    directorStartDate: data.directorStartDate || '',
    isShareholder: false,
    sharesOwned: data.sharesOwned || '',
    sharePrice: data.sharePrice || '',
    shareholderSince: data.shareholderSince || '',
    statusOnApril6th: data.statusOnApril6th || '',
  });

  const isIncorporated = data.incorporated === 'Yes';
  const intendedStartDate = data.incorporationDate || '';
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isIncorporated && intendedStartDate) {
      if (form.role === 'Director' || form.role === 'Both') {
        setForm(prev => ({
          ...prev,
          directorStartDate: prev.directorStartDate || intendedStartDate,
        }));
      }
      if (form.role === 'Shareholder' || form.role === 'Both') {
        setForm(prev => ({
          ...prev,
          shareholderSince: prev.shareholderSince || intendedStartDate,
        }));
      }
    }

    setForm(prev => ({
      ...prev,
      isShareholder: prev.role === 'Shareholder' || prev.role === 'Both',
    }));
  }, [form.role, isIncorporated, intendedStartDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    next(form);
  };

  const roleSelected = !!form.role;

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Your role in the company</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="role"
              value="Director"
              checked={form.role === 'Director'}
              onChange={handleChange}
              required
            /> Director
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="Shareholder"
              checked={form.role === 'Shareholder'}
              onChange={handleChange}
              required
            /> Shareholder
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="Both"
              checked={form.role === 'Both'}
              onChange={handleChange}
              required
            /> Director and Shareholder
          </label>
        </div>
      </div>

      {(form.role === 'Director' || form.role === 'Both') && (
        <>
          <div className="form-group">
            <label>When did you become a Director?</label>
            <input
              type="date"
              name="directorStartDate"
              value={form.directorStartDate}
              onChange={handleChange}
              required
            />
            {!isIncorporated && (
              <span className="tooltip">
                Defaulted to your intended incorporation date. You can update it if needed.
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Have you received any salary from the limited company?</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="salaryFromCompany"
                  value="Yes"
                  checked={form.salaryFromCompany === 'Yes'}
                  onChange={handleChange}
                  disabled={!isIncorporated}
                /> Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="salaryFromCompany"
                  value="No"
                  checked={form.salaryFromCompany === 'No'}
                  onChange={handleChange}
                  disabled={!isIncorporated}
                /> No
              </label>
            </div>
            {!isIncorporated && (
              <span className="tooltip">Automatically set to "No" for not-yet incorporated companies.</span>
            )}
          </div>

          <div className="form-group">
            <label>Was the salary above the National Insurance threshold?</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="salaryAboveNI"
                  value="Yes"
                  checked={form.salaryAboveNI === 'Yes'}
                  onChange={handleChange}
                  disabled={!isIncorporated}
                /> Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="salaryAboveNI"
                  value="No"
                  checked={form.salaryAboveNI === 'No'}
                  onChange={handleChange}
                  disabled={!isIncorporated}
                /> No
              </label>
            </div>
            {!isIncorporated && (
              <span className="tooltip">Automatically set to "No" for not-yet incorporated companies.</span>
            )}
          </div>

          <div className="form-group">
            <label>
              Current Tax Code <span className="tooltip">(Optional – you can provide this later)</span>
            </label>
            <input
              name="taxCode"
              value={form.taxCode}
              onChange={handleChange}
              placeholder="e.g. 1257L"
            />
          </div>
        </>
      )}

      {form.isShareholder && (
        <>
          <div className="form-group">
            <label>When did you become a shareholder?</label>
            <input
              type="date"
              name="shareholderSince"
              value={form.shareholderSince}
              onChange={handleChange}
              required
            />
            {!isIncorporated && (
              <span className="tooltip">
                Defaulted to your intended incorporation date. You can update it if needed.
              </span>
            )}
          </div>

          <div className="form-group">
            <label>How many shares do you own?</label>
            <input
              type="number"
              name="sharesOwned"
              value={form.sharesOwned}
              onChange={handleChange}
              required
              min="1"
            />
          </div>

          <div className="form-group">
            <label>What is the price per share (in GBP)?</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>£</span>
              <input
                type="number"
                name="sharePrice"
                value={form.sharePrice}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
              />
            </div>
          </div>
        </>
      )}

      {roleSelected && (
        <div className="form-group">
          <label>
            Which of the following statements applies to you as of the 6th April this year?
            <span className="tooltip">
              This helps us understand how your employment status affects how you’ll use Crunch.
            </span>
          </label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="statusOnApril6th"
                value="A"
                checked={form.statusOnApril6th === 'A'}
                onChange={handleChange}
                required
              /> A - I have not been employed during the current tax year
            </label>
            <label>
              <input
                type="radio"
                name="statusOnApril6th"
                value="B"
                checked={form.statusOnApril6th === 'B'}
                onChange={handleChange}
                required
              /> B - I have been employed during this tax year but now I am not
            </label>
            <label>
              <input
                type="radio"
                name="statusOnApril6th"
                value="C"
                checked={form.statusOnApril6th === 'C'}
                onChange={handleChange}
                required
              /> C - I am still employed
            </label>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button type="button" className="primary-btn" onClick={prev}>Back</button>
        <button type="submit" className="primary-btn">Next</button>
      </div>
    </form>
  );
}

export default Step3_DirectorShareholderDetails;
