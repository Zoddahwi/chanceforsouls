import React from 'react';
import { usePaystackPayment } from 'react-paystack';
import { useForm } from '../hooks';
import { DONATION_AMOUNTS, DONATION_TYPES } from '../constants';
import { SectionErrorBoundary } from '../components/common/ErrorBoundary';

const DonationContent = () => {
  const { formData, errors, isSubmitting, handleChange, setFieldValue, setIsSubmitting } =
    useForm(
      {
        name: '',
        email: '',
        amount: '',
        message: '',
        donationType: DONATION_TYPES.ONE_TIME,
      },
      ['name', 'email', 'amount'] // Required fields
    );

  // Paystack configuration
  const config = {
    reference: new Date().getTime().toString(),
    email: formData.email,
    amount: Math.round(parseFloat(formData.amount || 0) * 100), // Amount in kobo (Paystack uses smallest currency unit)
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxxxxxxxxx', // Replace with your public key
    metadata: {
      custom_fields: [
        {
          display_name: 'Donor Name',
          variable_name: 'donor_name',
          value: formData.name
        },
        {
          display_name: 'Donation Type',
          variable_name: 'donation_type',
          value: formData.donationType
        },
        {
          display_name: 'Message',
          variable_name: 'message',
          value: formData.message || 'No message'
        }
      ]
    }
  };

  // Paystack hooks
  const initializePayment = usePaystackPayment(config);

  // Success callback
  const onSuccess = (reference) => {
    console.log('Payment successful!', reference);
    alert(`Thank you ${formData.name}! Your donation of $${formData.amount} was successful. Reference: ${reference.reference}`);

    // You can send this data to your backend to record the donation
    // await donationService.recordDonation({ ...formData, reference: reference.reference });

    // Reset form
    setFieldValue('name', '');
    setFieldValue('email', '');
    setFieldValue('amount', '');
    setFieldValue('message', '');
    setIsSubmitting(false);
  };

  // Close callback
  const onClose = () => {
    console.log('Payment closed');
    alert('Payment window closed. Your donation was not completed.');
    setIsSubmitting(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.amount) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Validate amount
    if (parseFloat(formData.amount) < 1) {
      alert('Minimum donation amount is $1');
      return;
    }

    setIsSubmitting(true);

    // Initialize Paystack payment
    initializePayment(onSuccess, onClose);
  };

  const handleAmountClick = (amount) => {
    setFieldValue('amount', amount.toString());
  };

  return (
    <section className='donation' id='donation'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
        <div className='donation-container'>
          <div className='donation-header'>
            <h1>Make a Difference Today</h1>
            <p>
              Your generous donation helps us provide mental health support, counseling, and
              resources to those in need. Every contribution makes a real impact in someone's life.
            </p>
          </div>

          <div className='donation-content'>
            <div className='donation-info'>
              <div className='info-card'>
                <div className='info-icon'>💚</div>
                <h3>Why Donate?</h3>
                <p>
                  Your support enables us to offer free counseling services, awareness campaigns,
                  and emotional support to individuals facing mental health challenges.
                </p>
              </div>

              <div className='info-card'>
                <div className='info-icon'>🎯</div>
                <h3>Our Impact</h3>
                <ul className='impact-list'>
                  <li>850+ students reached across 4 schools</li>
                  <li>6 trained mental health advocates</li>
                  <li>3 school outreach programs</li>
                  <li>2 major infrastructure projects</li>
                </ul>
              </div>

              <div className='info-card'>
                <div className='info-icon'>🔒</div>
                <h3>Secure Payment</h3>
                <p>
                  All donations are processed securely through Paystack. Your payment information
                  is encrypted and protected.
                </p>
              </div>
            </div>

            <div className='donation-form-wrapper'>
              <form className='donation-form' onSubmit={handleSubmit}>
                <h2>Donation Form</h2>

                <div className='form-group'>
                  <label htmlFor='donationType'>Donation Type</label>
                  <div className='radio-group'>
                    <label className='radio-label'>
                      <input
                        type='radio'
                        name='donationType'
                        value={DONATION_TYPES.ONE_TIME}
                        checked={formData.donationType === DONATION_TYPES.ONE_TIME}
                        onChange={handleChange}
                      />
                      <span>One-Time</span>
                    </label>
                    <label className='radio-label'>
                      <input
                        type='radio'
                        name='donationType'
                        value={DONATION_TYPES.MONTHLY}
                        checked={formData.donationType === DONATION_TYPES.MONTHLY}
                        onChange={handleChange}
                      />
                      <span>Monthly</span>
                    </label>
                  </div>
                </div>

                <div className='form-group'>
                  <label htmlFor='name'>Full Name *</label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder='Enter your full name'
                    className={errors.name ? 'input-error' : ''}
                  />
                  {errors.name && <div className='form-error'>{errors.name}</div>}
                </div>

                <div className='form-group'>
                  <label htmlFor='email'>Email Address *</label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder='your.email@example.com'
                    className={errors.email ? 'input-error' : ''}
                  />
                  {errors.email && <div className='form-error'>{errors.email}</div>}
                </div>

                <div className='form-group'>
                  <label htmlFor='amount'>Donation Amount (USD) *</label>
                  <input
                    type='number'
                    id='amount'
                    name='amount'
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    min='1'
                    step='0.01'
                    placeholder='Enter amount'
                    className={errors.amount ? 'input-error' : ''}
                  />
                  {errors.amount && <div className='form-error'>{errors.amount}</div>}

                  <div className='amount-suggestions'>
                    {DONATION_AMOUNTS.map((amount) => (
                      <button
                        key={amount}
                        type='button'
                        className='amount-btn'
                        onClick={() => handleAmountClick(amount)}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </div>

                <div className='form-group'>
                  <label htmlFor='message'>Message (Optional)</label>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    rows='4'
                    placeholder="Share why you're supporting our cause..."
                  />
                </div>

                <button type='submit' className='submit-btn donate-btn' disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className='loading-spinner'></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <span>💳</span>
                      Complete Donation with Paystack
                    </>
                  )}
                </button>

                <p className='form-note'>
                  🔒 Secure payment powered by Paystack. Your information is encrypted and protected.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Donation = () => {
  return (
    <SectionErrorBoundary sectionName='Donation Form'>
      <DonationContent />
    </SectionErrorBoundary>
  );
};

export default Donation;
