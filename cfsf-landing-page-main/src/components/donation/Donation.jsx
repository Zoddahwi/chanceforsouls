import React from 'react';
import { usePaystackPayment } from 'react-paystack';
import { useForm } from '../../hooks';
import { DONATION_AMOUNTS, DONATION_TYPES } from '../../constants';
import { SectionErrorBoundary } from '../common/ErrorBoundary';

/**
 * DonationContent Component
 * Renders the main content of the donation section, including the informational text,
 * impact statistics, and the interactive donation form integrated with Paystack for payments.
 */
const DonationContent = () => {
  // Initialize custom form hook for managing form state, validation, and submission status
  const { formData, errors, isSubmitting, handleChange, setFieldValue, setIsSubmitting } =
    useForm(
      {
        name: '',
        email: '',
        amount: '',
        message: '',
        donationType: DONATION_TYPES.ONE_TIME,
      },
      ['name', 'email', 'amount'] // Required fields for validation
    );

  /**
   * Paystack configuration object
   * Defines the parameters required by Paystack to initialize a transaction.
   */
  const config = {
    reference: new Date().getTime().toString(), // Generate a unique reference ID for the transaction
    email: formData.email, // Donor's email address
    amount: Math.round(parseFloat(formData.amount || 0) * 100), // Amount in kobo/pesewas (Paystack uses smallest currency unit, e.g., 100 = 1 GHS/USD)
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxxxxxxxxx', // Fallback to provided test key if env var is missing
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

  // Initialize the Paystack payment hook with the configuration
  const initializePayment = usePaystackPayment(config);

  /**
   * Success callback function
   * Triggered when the Paystack transaction completes successfully.
   * @param {Object} reference - The transaction reference object returned by Paystack
   */
  const onSuccess = (reference) => {
    console.log('Payment successful!', reference);
    alert(`Thank you ${formData.name}! Your donation of $${formData.amount} was successful. Reference: ${reference.reference}`);

    // TODO: Send this data to your backend to record the donation
    // await donationService.recordDonation({ ...formData, reference: reference.reference });

    // Reset form fields after successful donation
    setFieldValue('name', '');
    setFieldValue('email', '');
    setFieldValue('amount', '');
    setFieldValue('message', '');
    setIsSubmitting(false); // Enable the submit button again
  };

  /**
   * Close callback function
   * Triggered when the user closes the Paystack payment window before completing the transaction.
   */
  const onClose = () => {
    console.log('Payment closed');
    alert('Payment window closed. Your donation was not completed.');
    setIsSubmitting(false); // Enable the submit button again
  };

  /**
   * Handle form submission
   * Validates form inputs and initiates the Paystack payment flow if successful.
   * @param {Event} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check for missing required fields
    if (!formData.name || !formData.email || !formData.amount) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Ensure the donation amount is at least $1
    if (parseFloat(formData.amount) < 1) {
      alert('Minimum donation amount is $1');
      return;
    }

    // Set submission state to true to disable the submit button and show loading indicator
    setIsSubmitting(true);

    // Initialize Paystack payment modal passing success and close callbacks
    initializePayment(onSuccess, onClose);
  };

  /**
   * Handle predefined amount selection
   * Updates the 'amount' field when a user clicks on a suggested donation amount button.
   * @param {number} amount - The selected exact amount
   */
  const handleAmountClick = (amount) => {
    setFieldValue('amount', amount.toString());
  };

  return (
    <section className='donation' id='donation'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
        <div className='donation-container'>
          {/* Section Header */}
          <div className='donation-header'>
            <h1>Make a Difference Today</h1>
            <p>
              Your generous donation helps us provide mental health support, counseling, and
              resources to those in need. Every contribution makes a real impact in someone's life.
            </p>
          </div>

          <div className='donation-content'>
            {/* Informational Cards Column */}
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

            {/* Donation Form Column */}
            <div className='donation-form-wrapper'>
              <form className='donation-form' onSubmit={handleSubmit}>
                <h2>Donation Form</h2>

                {/* Donation Type Selection */}
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

                {/* Full Name Input */}
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

                {/* Email Input */}
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

                {/* Amount Input & Suggested Amounts */}
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

                  {/* Predefined Amount Buttons */}
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

                {/* Optional Message Input */}
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

                {/* Submit Button */}
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

/**
 * Donation Wrapper Component
 * Wraps the DonationContent in an ErrorBoundary to gracefully handle rendering errors
 * specific to this section without crashing the entire app.
 */
const Donation = () => {
  return (
    <SectionErrorBoundary sectionName='Donation Form'>
      <DonationContent />
    </SectionErrorBoundary>
  );
};

export default Donation;
