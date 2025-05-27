import React, { useState, useEffect } from 'react';
import '../App.css';
import countryList from 'react-select-country-list';

function Step2_PersonalDetails({ next, prev, data }) {
  const [form, setForm] = useState({
    firstName: data.firstName || '',
    middleName: data.middleName || '',
    lastName: data.lastName || '',
    dob: data.dob || '',
    email: data.email || '',
    altEmail: data.altEmail || '',
    nationality: data.nationality || 'United Kingdom',
    hasNi: data.hasNi || '',
    niNumber: data.niNumber || '',
    phone: data.phone || '',
    altPhone: data.altPhone || '',
    homeStreet: data.homeStreet || '',
    homeCity: data.homeCity || '',
    homeCountry: data.homeCountry || '',
    homePostcode: data.homePostcode || '',
    movedInDate: data.movedInDate || '',
    prevStreet: data.prevStreet || '',
    prevCity: data.prevCity || '',
    prevCountry: data.prevCountry || '',
    prevPostcode: data.prevPostcode || '',
  });

  const [errors, setErrors] = useState({});
  const [showPreviousAddress, setShowPreviousAddress] = useState(false);

  useEffect(() => {
    if (form.movedInDate) {
      const movedIn = new Date(form.movedInDate);
      const threeYearsAgo = new Date();
      threeYearsAgo.setFullYear(new Date().getFullYear() - 3);
      setShowPreviousAddress(movedIn > threeYearsAgo);
    }
  }, [form.movedInDate]);

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
      case 'altEmail':
        return value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? 'Invalid email format'
          : '';
      case 'niNumber':
        return value && !/^[A-CEGHJ-PR-TW-Z]{2}\d{6}[A-D]$/.test(value)
          ? 'Invalid NI Number (e.g. QQ123456C)'
          : '';
      case 'homePostcode':
      case 'prevPostcode':
        if (form.nationality === 'United Kingdom') {
          return value &&
            !/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[ABD-HJLNP-UW-Z]{2}$/i.test(value)
            ? 'Invalid UK postcode'
            : '';
        }
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'hasNi' && value === 'No' ? { niNumber: '' } : {}), // clear NI if No
    }));

    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleNext = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(form).forEach(([key, val]) => {
      const err = validateField(key, val);
      if (err) newErrors[key] = err;
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    next(form);
  };

  const countries = countryList().getData();

  return (
    <form className="form-container" onSubmit={handleNext}>
      <div className="form-group">
        <label>First Name</label>
        <input name="firstName" value={form.firstName} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Middle Name(s)</label>
        <input name="middleName" value={form.middleName} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Last Name</label>
        <input name="lastName" value={form.lastName} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Date of Birth</label>
        <input type="date" name="dob" value={form.dob} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Email address</label>
        <input name="email" value={form.email} onChange={handleChange} required />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label>Alternative Email</label>
        <input name="altEmail" value={form.altEmail} onChange={handleChange} />
        {errors.altEmail && <p className="error">{errors.altEmail}</p>}
      </div>

      <div className="form-group">
        <label>Nationality</label>
        <select name="nationality" value={form.nationality} onChange={handleChange} required>
          {countries.map((c) => (
            <option key={c.label} value={c.label}>{c.label}</option>
          ))}
        </select>
      </div>

      {form.nationality === 'United Kingdom' && (
        <div className="form-group">
          <label>Do you have a National Insurance Number?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="hasNi"
                value="Yes"
                checked={form.hasNi === 'Yes'}
                onChange={handleChange}
                required
              /> Yes
            </label>
            <label>
              <input
                type="radio"
                name="hasNi"
                value="No"
                checked={form.hasNi === 'No'}
                onChange={handleChange}
                required
              /> No
            </label>
          </div>
        </div>
      )}

      {form.nationality === 'United Kingdom' && form.hasNi === 'Yes' && (
        <div className="form-group">
          <label>National Insurance Number</label>
          <input name="niNumber" value={form.niNumber} onChange={handleChange} />
          {errors.niNumber && <p className="error">{errors.niNumber}</p>}
        </div>
      )}

      <div className="form-group">
        <label>Phone Number</label>
        <input name="phone" value={form.phone} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Alternative Phone</label>
        <input name="altPhone" value={form.altPhone} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Residential Address</label>
        <input name="homeStreet" placeholder="Street" value={form.homeStreet} onChange={handleChange} required />
        <input name="homeCity" placeholder="City" value={form.homeCity} onChange={handleChange} required />
        <input name="homeCountry" placeholder="Country" value={form.homeCountry} onChange={handleChange} required />
        <input name="homePostcode" placeholder="Postcode" value={form.homePostcode} onChange={handleChange} required />
        {errors.homePostcode && <p className="error">{errors.homePostcode}</p>}
      </div>

      <div className="form-group">
        <label>When did you move to this address?</label>
        <input type="date" name="movedInDate" value={form.movedInDate} onChange={handleChange} required />
      </div>

      {showPreviousAddress && (
        <div className="form-group">
          <label>Previous Address (within last 3 years)</label>
          <input name="prevStreet" placeholder="Street" value={form.prevStreet} onChange={handleChange} required />
          <input name="prevCity" placeholder="City" value={form.prevCity} onChange={handleChange} required />
          <input name="prevCountry" placeholder="Country" value={form.prevCountry} onChange={handleChange} required />
          <input name="prevPostcode" placeholder="Postcode" value={form.prevPostcode} onChange={handleChange} required />
          {errors.prevPostcode && <p className="error">{errors.prevPostcode}</p>}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button type="button" className="primary-btn" onClick={prev}>Back</button>
        <button type="submit" className="primary-btn">Next</button>
      </div>
    </form>
  );
}

export default Step2_PersonalDetails;
