import React, { useState, useEffect } from 'react';
import '../App.css';

function Step1_2_CompanyDetails({ next, prev, data }) {
  const [form, setForm] = useState({
    companyNumber: data.companyNumber || '',
    useVirtualAddress: data.useVirtualAddress === true ? 'Yes' : 'No',
    businessStreet: data.businessStreet || '',
    businessCity: data.businessCity || '',
    businessCountry: data.businessCountry || '',
    businessPostcode: data.businessPostcode || '',
    registeredStreet: data.registeredStreet || '',
    registeredCity: data.registeredCity || '',
    registeredCountry: data.registeredCountry || '',
    registeredPostcode: data.registeredPostcode || '',
    ir35: data.ir35 || '',
    turnover: data.turnover || '',
    utr: data.utr || '',
  });

  const isIncorporated = data.incorporated === 'Yes';
  const useVirtual = form.useVirtualAddress === 'Yes';

  useEffect(() => {
    if (useVirtual) {
      setForm(prev => ({
        ...prev,
        businessStreet: '3rd Floor 86-90 Paul Street',
        businessCity: 'London',
        businessCountry: 'United Kingdom',
        businessPostcode: 'EC2A 4NE',
        registeredStreet: '3rd Floor 86-90 Paul Street',
        registeredCity: 'London',
        registeredCountry: 'United Kingdom',
        registeredPostcode: 'EC2A 4NE',
      }));
    } else {
      setForm(prev => ({
        ...prev,
        businessStreet: '',
        businessCity: '',
        businessCountry: '',
        businessPostcode: '',
        registeredStreet: '',
        registeredCity: '',
        registeredCountry: '',
        registeredPostcode: '',
      }));
    }
  }, [form.useVirtualAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...form,
      useVirtualAddress: form.useVirtualAddress === 'Yes',
    };
    next(updated);
  };

  return (
    <form className="form-container " onSubmit={handleSubmit}>
      {isIncorporated && (
        <div className="form-group">
          <label>What's your company number?</label>
          <span className="tooltip">
            If you're unsure, you can look this up on Companies House by searching for your company name.
          </span>
          <input
            type="text"
            name="companyNumber"
            value={form.companyNumber}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <div className="form-group">
        <label>
          Would you like to use our virtual address service?
          <span className="tooltip">
            Included in premium package, additional for other packages.
          </span>
        </label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="useVirtualAddress"
              value="Yes"
              checked={form.useVirtualAddress === 'Yes'}
              onChange={handleChange}
            /> Yes
          </label>
          <label>
            <input
              type="radio"
              name="useVirtualAddress"
              value="No"
              checked={form.useVirtualAddress === 'No'}
              onChange={handleChange}
            /> No
          </label>
        </div>
      </div>

      {!useVirtual && (
        <>
          <div className="form-group">
            <label>Business Address</label>
            <input type="text" name="businessStreet" placeholder="Street" value={form.businessStreet} onChange={handleChange} required />
            <input type="text" name="businessCity" placeholder="City" value={form.businessCity} onChange={handleChange} required />
            <input type="text" name="businessCountry" placeholder="Country" value={form.businessCountry} onChange={handleChange} required />
            <input type="text" name="businessPostcode" placeholder="Postcode" value={form.businessPostcode} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Registered Office Address</label>
            <input type="text" name="registeredStreet" placeholder="Street" value={form.registeredStreet} onChange={handleChange} required />
            <input type="text" name="registeredCity" placeholder="City" value={form.registeredCity} onChange={handleChange} required />
            <input type="text" name="registeredCountry" placeholder="Country" value={form.registeredCountry} onChange={handleChange} required />
            <input type="text" name="registeredPostcode" placeholder="Postcode" value={form.registeredPostcode} onChange={handleChange} required />
          </div>
        </>
      )}

      <div className="form-group">
        <label>What's your IR35 status?</label>
        <span className="tooltip">
          This lets us know how your income needs to be treated. Follow the link for more info.
        </span>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="ir35"
              value="Within IR35"
              checked={form.ir35 === 'Within IR35'}
              onChange={handleChange}
              required
            /> Within IR35
          </label>
          <label>
            <input
              type="radio"
              name="ir35"
              value="Outside IR35"
              checked={form.ir35 === 'Outside IR35'}
              onChange={handleChange}
              required
            /> Outside IR35
          </label>
          <label>
            <input
              type="radio"
              name="ir35"
              value="Don't know"
              checked={form.ir35 === "Don't know"}
              onChange={handleChange}
              required
            /> Don't know
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Estimated Turnover in GBP</label>
        <span className="tooltip">
          This gives us an idea of what advice you may need, such as for VAT registration.
        </span>
        <input
          type="number"
          name="turnover"
          value={form.turnover}
          onChange={handleChange}
          required
        />
      </div>

      {isIncorporated && (
        <div className="form-group">
          <label>Corporation Tax UTR</label>
          <span className="tooltip">
            This will be 10 digits long. Be careful not to confuse with your Self Assessment UTR.
          </span>
          <input
            type="text"
            name="utr"
            value={form.utr}
            onChange={handleChange}
          />
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button type="button" className="primary-btn" onClick={prev}>Back</button>
        <button type="submit" className="primary-btn">Next</button>
      </div>
    </form>
  );
}

export default Step1_2_CompanyDetails;
