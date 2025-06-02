import React, { useState } from 'react';
import Step1_CompanyDetails from '../steps/Step1_CompanyDetails';
import Step1_2_CompanyDetails from '../steps/Step1_2_CompanyDetails';
import Step2_PersonalDetails from '../steps/Step2_PersonalDetails';
import Step3_DirectorShareholderDetails from '../steps/Step3_DirectorShareholderDetails';
import Step4_PersonalTaxDetails from '../steps/Step4_PersonalTaxDetails';
import Step5_CACAndShares from '../steps/Step5_CACAndShares.jsx';
import Step6_PAYERegistration from '../steps/Step6_PAYERegistration';
import Step7_VATRegistration from '../steps/Step7_VATRegistration';
import Step8_AdditionalPeople from '../steps/Step8_AdditionalPeople';
import ProgressBar from '../components/ProgressBar';
import '../App.css';

function Form() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const commonSteps = [
    <Step1_CompanyDetails next={handleNext} data={formData} />,
    <Step1_2_CompanyDetails next={handleNext} prev={handleBack} data={formData} />,
    <Step2_PersonalDetails next={handleNext} prev={handleBack} data={formData} />,
    <Step3_DirectorShareholderDetails next={handleNext} prev={handleBack} data={formData} />,
    <Step4_PersonalTaxDetails next={handleNext} prev={handleBack} data={formData} />,
  ];

  const conditionalSteps = formData.incorporated === 'Yes'
    ? [
        <Step5_CACAndShares next={handleNext} prev={handleBack} data={formData} />,
        <Step6_PAYERegistration next={handleNext} prev={handleBack} data={formData} />,
        <Step7_VATRegistration next={handleNext} prev={handleBack} data={formData} />,
      ]
    : [];

  const finalSteps = [
    <Step8_AdditionalPeople next={handleNext} prev={handleBack} data={formData} />
  ];

  const steps = [...commonSteps, ...conditionalSteps, ...finalSteps];

  return (
    <div className="form-wrapper">
      {/* Header */}
      <div className="form-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0rem 2rem 2rem'
      }}>
        <h2 style={{ margin: 0 }}>Company Registration Form</h2>
        <img 
          src="https://cdn.prod.website-files.com/64104989294ba00431b916de/64108eacccaabfaf580a6981_crunch%20logo.svg" 
          alt="Crunch Logo" 
          style={{ height: '40px' }}
        />
      </div>

      {/* Progress Bar */}
      {step > 0 && <ProgressBar step={step + 1} totalSteps={steps.length} />}

      {/* Current Step */}
      {steps[step]}
    </div>
  );
}

export default Form;
