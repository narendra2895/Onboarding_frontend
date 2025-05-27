import React, { useState } from 'react';
import '../App.css';

function Step7_VATRegistration({ next, prev, data }) {
  const [form, setForm] = useState({
    vatStatus: data.vatStatus || '',
    vatNumber: data.vatNumber || '',
    vatStartDate: data.vatStartDate || '',
    lastReturnEndDate: data.lastReturnEndDate || '',
    lastReturnBoxFive: data.lastReturnBoxFive || '',
    firstReturnStartDate: data.firstReturnStartDate || '',
    usedMTD: data.usedMTD || '',
    vatScheme: data.vatScheme || '',
    vatAccountingMethod: data.vatAccountingMethod || '',
    vatFilingFrequency: data.vatFilingFrequency || '',
    flatRateSector: data.flatRateSector || '',
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
      <h2>VAT Registration</h2>

      <div className="form-group">
        <label>Is your business registered for VAT?</label>
        <div className="radio-group">
          <label>
            <input type="radio" name="vatStatus" value="have_details" checked={form.vatStatus === 'have_details'} onChange={handleChange} required />
            Yes, I have my details ready
          </label>
          <label>
            <input type="radio" name="vatStatus" value="no_details" checked={form.vatStatus === 'no_details'} onChange={handleChange} />
            Yes, but I haven't got my details at the moment
          </label>
          <label>
            <input type="radio" name="vatStatus" value="not_needed" checked={form.vatStatus === 'not_needed'} onChange={handleChange} />
            No, and I don't need to be
          </label>
          <label>
            <input type="radio" name="vatStatus" value="register_me" checked={form.vatStatus === 'register_me'} onChange={handleChange} />
            No, please get me registered
          </label>
          <label>
            <input type="radio" name="vatStatus" value="need_info" checked={form.vatStatus === 'need_info'} onChange={handleChange} />
            I'd like more information
          </label>
        </div>
      </div>

      {form.vatStatus === 'have_details' && (
        <>
          <div className="form-group">
            <label>VAT Number</label>
            <span className="tooltip">This is 11 digits long and found on your VAT certificate</span>
            <input type="text" name="vatNumber" value={form.vatNumber} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>VAT registration start date</label>
            <input type="date" name="vatStartDate" value={form.vatStartDate} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>End date of last filed VAT return</label>
            <input type="date" name="lastReturnEndDate" value={form.lastReturnEndDate} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Box 5 amount from last VAT return</label>
            <span className="tooltip">Found on your last return; used for MTD setup</span>
            <input type="text" name="lastReturnBoxFive" value={form.lastReturnBoxFive} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Start date of first VAT return Crunch will file</label>
            <input type="date" name="firstReturnStartDate" value={form.firstReturnStartDate} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Have you filed VAT via Making Tax Digital (MTD)?</label>
            <div className="radio-group">
              <label><input type="radio" name="usedMTD" value="Yes" checked={form.usedMTD === 'Yes'} onChange={handleChange} /> Yes</label>
              <label><input type="radio" name="usedMTD" value="No" checked={form.usedMTD === 'No'} onChange={handleChange} /> No</label>
            </div>
          </div>

          <div className="form-group">
            <label>VAT Scheme</label>
            <div className="radio-group">
              <label><input type="radio" name="vatScheme" value="Standard" checked={form.vatScheme === 'Standard'} onChange={handleChange} /> Standard</label>
              <label><input type="radio" name="vatScheme" value="Flat" checked={form.vatScheme === 'Flat'} onChange={handleChange} /> Flat</label>
            </div>
          </div>

          {form.vatScheme === 'Flat' && (
            <div className="form-group">
              <label>Flat Rate VAT sector</label>
              <select name="flatRateSector" value={form.flatRateSector} onChange={handleChange}>
                <option value="">-- Select sector --</option>
                <option value="IT Services">IT Services</option>
                <option value="Consulting">Consulting</option>
                <option value="Design">Design</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <label>VAT Accounting Method</label>
            <div className="radio-group">
              <label><input type="radio" name="vatAccountingMethod" value="Cash" checked={form.vatAccountingMethod === 'Cash'} onChange={handleChange} /> Cash</label>
              <label><input type="radio" name="vatAccountingMethod" value="Accruals" checked={form.vatAccountingMethod === 'Accruals'} onChange={handleChange} /> Accruals</label>
            </div>
          </div>

          <div className="form-group">
            <label>VAT Filing Frequency</label>
            <div className="radio-group">
              <label><input type="radio" name="vatFilingFrequency" value="Quarterly" checked={form.vatFilingFrequency === 'Quarterly'} onChange={handleChange} /> Quarterly</label>
              <label><input type="radio" name="vatFilingFrequency" value="Annual" checked={form.vatFilingFrequency === 'Annual'} onChange={handleChange} /> Annual</label>
            </div>
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

export default Step7_VATRegistration;
