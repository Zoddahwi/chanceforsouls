import React from 'react';
import { classNames } from '../../utils';

/**
 * Reusable Button component with consistent styling
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  ariaLabel,
  ...props
}) => {
  const baseClasses =
    'font-weight-600 border-none cursor-pointer transition-all duration-300 ease border-radius-20';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-lime-green to-dark-green text-white hover:opacity-90 hover:transform hover:-translate-y-1 shadow-green',
    secondary:
      'bg-white text-dark-blue border-2 border-lime-green hover:bg-lime-green hover:text-white',
    outline:
      'bg-transparent text-lime-green border-2 border-lime-green hover:bg-lime-green hover:text-white',
  };

  const sizeClasses = {
    small: 'padding-0.5rem-1rem font-size-0.9rem',
    medium: 'padding-0.8rem-1.5rem font-size-1rem',
    large: 'padding-1rem-2rem font-size-1.2rem',
  };

  const buttonClasses = classNames(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed',
    loading && 'cursor-wait',
    className
  );

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      {...props}
    >
      {loading ? (
        <span className='flex items-center'>
          <span className='loading-spinner mr-2'></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

/**
 * Reusable Card component
 */
export const Card = ({ children, className = '', hover = true, padding = 'large', ...props }) => {
  const baseClasses = 'bg-white border-radius-12 transition-all duration-300 ease';
  const shadowClasses = 'shadow-card';
  const hoverClasses = hover ? 'hover:transform hover:-translate-y-2 hover:shadow-card-hover' : '';

  const paddingClasses = {
    small: 'padding-1rem',
    medium: 'padding-1.5rem',
    large: 'padding-2rem',
    xlarge: 'padding-2.5rem',
  };

  const cardClasses = classNames(
    baseClasses,
    shadowClasses,
    hoverClasses,
    paddingClasses[padding],
    className
  );

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

/**
 * Reusable Input component
 */
export const Input = ({
  label,
  error,
  type = 'text',
  required = false,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const inputClasses = classNames(
    'w-full padding-0.8rem-1rem border-2 border-gray-300 border-radius-8 font-size-1rem transition-border-color duration-300 ease font-family-inherit',
    'focus:outline-none focus:border-lime-green',
    error && 'border-red-500',
    className
  );

  return (
    <div className={classNames('margin-bottom-1.5rem', containerClassName)}>
      {label && (
        <label className='block font-weight-600 color-dark-blue margin-bottom-0.5rem font-size-1rem'>
          {label}
          {required && <span className='color-red-500 margin-left-0.25rem'>*</span>}
        </label>
      )}
      <input type={type} className={inputClasses} {...props} />
      {error && <p className='color-red-500 font-size-0.875rem margin-top-0.5rem'>{error}</p>}
    </div>
  );
};

/**
 * Reusable Textarea component
 */
export const Textarea = ({
  label,
  error,
  required = false,
  rows = 4,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const textareaClasses = classNames(
    'w-full padding-0.8rem-1rem border-2 border-gray-300 border-radius-8 font-size-1rem transition-border-color duration-300 ease font-family-inherit resize-vertical',
    'focus:outline-none focus:border-lime-green',
    error && 'border-red-500',
    className
  );

  return (
    <div className={classNames('margin-bottom-1.5rem', containerClassName)}>
      {label && (
        <label className='block font-weight-600 color-dark-blue margin-bottom-0.5rem font-size-1rem'>
          {label}
          {required && <span className='color-red-500 margin-left-0.25rem'>*</span>}
        </label>
      )}
      <textarea rows={rows} className={textareaClasses} {...props} />
      {error && <p className='color-red-500 font-size-0.875rem margin-top-0.5rem'>{error}</p>}
    </div>
  );
};

/**
 * Loading Spinner component
 */
export const LoadingSpinner = ({ size = 'medium', color = 'lime-green' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };

  return (
    <div
      className={classNames(
        'animate-spin rounded-full border-2 border-gray-300',
        `border-t-${color}`,
        sizeClasses[size]
      )}
      role='status'
      aria-label='Loading'
    >
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

/**
 * Modal component
 */
export const Modal = ({ isOpen, onClose, children, title, size = 'medium', className = '' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
    xlarge: 'max-w-4xl',
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      onClick={onClose}
    >
      <div
        className={classNames(
          'bg-white border-radius-12 padding-2rem shadow-card-hover max-h-90vh overflow-y-auto',
          sizeClasses[size],
          'w-full margin-1rem',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className='flex justify-between items-center margin-bottom-1.5rem'>
            <h2 className='font-size-1.5rem font-weight-600 color-dark-blue'>{title}</h2>
            <Button variant='outline' size='small' onClick={onClose} ariaLabel='Close modal'>
              ×
            </Button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
