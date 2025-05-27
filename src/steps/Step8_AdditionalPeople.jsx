import React, { useState } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import '../App.css';

function Step8_AdditionalPeople({ next, prev, data }) {
  const [hasAdditional, setHasAdditional] = useState(data.hasAdditional || '');
  const [people, setPeople] = useState(data.additionalPeople || [{ firstName: '', lastName: '', email: '' }]);
  const [submitted, setSubmitted] = useState(false);
  const { width, height } = useWindowSize();

  const handleChange = (index, field, value) => {
    const updated = [...people];
    updated[index][field] = value;
    setPeople(updated);
  };

  const addPerson = () => {
    setPeople([...people, { firstName: '', lastName: '', email: '' }]);
  };

  const removePerson = (index) => {
    setPeople(people.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const onboardingId = window.location.pathname.split('/').pop();

    const fullData = {
      ...data,
      id: onboardingId,
      hasAdditional,
      additionalPeople: hasAdditional === 'Yes' ? people : [],

      // Add full fields from earlier onboarding steps
      companyName: data.companyName,
      isIncorporated: data.isIncorporated,
      incorporationDate: data.incorporationDate,
      tradingActivity: data.tradingActivity,
      companyUtr: data.companyUtr,
      companyNumber: data.companyNumber,
      ir35Status: data.ir35Status,
      estimatedTurnover: data.estimatedTurnover,
      businessStreet: data.businessStreet,
      businessCity: data.businessCity,
      businessCountry: data.businessCountry,
      businessPostcode: data.businessPostcode,
      registeredStreet: data.registeredStreet,
      registeredCity: data.registeredCity,
      registeredCountry: data.registeredCountry,
      registeredPostcode: data.registeredPostcode,

      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      dob: data.dob,
      nationality: data.nationality,
      niNumber: data.niNumber,
      email: data.email,
      altEmail: data.altEmail,
      phone: data.phone,
      altPhone: data.altPhone,

      homeStreet: data.homeStreet,
      homeCity: data.homeCity,
      homeCountry: data.homeCountry,
      homePostcode: data.homePostcode,
      movedInDate: data.movedInDate,
      prevStreet: data.prevStreet,
      prevCity: data.prevCity,
      prevCountry: data.prevCountry,
      prevPostcode: data.prevPostcode,

      isDirector: data.isDirector,
      isShareholder: data.isShareholder,
      shareholderType: data.shareholderType,
      salaryAboveNi: data.salaryAboveNi,
      salaryFromLtd: data.salaryFromLtd,
      shareAmount: data.shareAmount,
      shareValue: data.shareValue,

      otherCompany: data.otherCompany,
      otherCompanyName: data.otherCompanyName,
      otherCompanyStartDate: data.otherCompanyStartDate,
      otherCompanySharePercent: data.otherCompanySharePercent,
      otherCompanySalary: data.otherCompanySalary,

      selfAssessmentStatus: data.selfAssessmentStatus,
      selfAssessmentUtr: data.selfAssessmentUtr,
      employmentStatusApril: data.employmentStatusApril,

      cacCode: data.cacCode,
      shareChanges: data.shareChanges,
      accountantName: data.accountantName,
      accountantEmail: data.accountantEmail,
      accountantPhone: data.accountantPhone,
      contactAccountantFrom: data.contactAccountantFrom,

      payeRegistered: data.payeRegistered,
      payeReference: data.payeReference,
      accountsOfficeReference: data.accountsOfficeReference,
      payeSetupDate: data.payeSetupDate,
      payeTakeoverDate: data.payeTakeoverDate,

      vatStatus: data.vatStatus,
      vatNumber: data.vatNumber,
      vatStartDate: data.vatStartDate,
      lastVatReturnEnd: data.lastVatReturnEnd,
      lastVatBox5: data.lastVatBox5,
      firstVatReturnStart: data.firstVatReturnStart,
      mtdUsed: data.mtdUsed,
      vatScheme: data.vatScheme,
      flatRateSector: data.flatRateSector,
      vatAccountingMethod: data.vatAccountingMethod,
      vatFilingFrequency: data.vatFilingFrequency,

      additionalContacts: data.additionalContacts,
      additionalContact1Firstname: data.additionalContact1Firstname,
      additionalContact1Lastname: data.additionalContact1Lastname,
      additionalContact1Email: data.additionalContact1Email,
      additionalContact2Firstname: data.additionalContact2Firstname,
      additionalContact2Lastname: data.additionalContact2Lastname,
      additionalContact2Email: data.additionalContact2Email,
      additionalContact3Firstname: data.additionalContact3Firstname,
      additionalContact3Lastname: data.additionalContact3Lastname,
      additionalContact3Email: data.additionalContact3Email,
      additionalContact4Firstname: data.additionalContact4Firstname,
      additionalContact4Lastname: data.additionalContact4Lastname,
      additionalContact4Email: data.additionalContact4Email,
    };

    try {
      const res = await fetch('https://onboardingproject-f1647269a8b6.herokuapp.com/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullData),
      });

      if (!res.ok) throw new Error('Failed to submit form');
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      alert('Error submitting form. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: '#fff',
          zIndex: 9999,
          textAlign: 'center',
          paddingTop: '5rem',
        }}
      >
        <Confetti width={width} height={height} numberOfPieces={300} recycle={false} />
        <h2>Thanks for completing your onboarding questionnaire.</h2>
        <p>
          Now we've got the boring bit out the way, it's time to get stuck in with your shiny new Crunch account!
        </p>
        <p>
          Your dedicated service team are ready and waiting to talk to you so why not arrange a video call with them to
          start showing you around your account and all its great features - watch out for an email containing more
          details shortly.
        </p>
      </div>
    );
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Additional Directors or Shareholders</h2>

      <div className="form-group">
        <label>Are there any additional directors or shareholders in your company?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="hasAdditional"
              value="Yes"
              checked={hasAdditional === 'Yes'}
              onChange={(e) => setHasAdditional(e.target.value)}
              required
            />{' '}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="hasAdditional"
              value="No"
              checked={hasAdditional === 'No'}
              onChange={(e) => setHasAdditional(e.target.value)}
              required
            />{' '}
            No
          </label>
        </div>
      </div>

      {hasAdditional === 'Yes' && (
        <>
          <p className="tooltip">We'll send them their own questionnaire. Make sure the email is correct.</p>
          {people.map((person, index) => (
            <div key={index} className="form-group">
              <label>Person {index + 1}</label>
              <input
                type="text"
                placeholder="First Name"
                value={person.firstName}
                onChange={(e) => handleChange(index, 'firstName', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={person.lastName}
                onChange={(e) => handleChange(index, 'lastName', e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={person.email}
                onChange={(e) => handleChange(index, 'email', e.target.value)}
                required
              />
              {people.length > 1 && (
                <button type="button" onClick={() => removePerson(index)} className="secondary-btn">
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addPerson} className="secondary-btn">
            Add Another
          </button>
        </>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
        <button type="button" className="primary-btn" onClick={prev}>
          Back
        </button>
        <button type="submit" className="primary-btn">
          Submit
        </button>
      </div>
    </form>
  );
}

export default Step8_AdditionalPeople;
