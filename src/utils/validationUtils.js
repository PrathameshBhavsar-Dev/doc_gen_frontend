/**
 * Validation utility functions for form inputs
 */

/**
 * Validates if a value is not empty
 * @param {*} value - The value to check
 * @returns {boolean} - True if value is not empty
 */
export const isNotEmpty = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  return true;
};

/**
 * Validates if a value is a valid email format
 * @param {string} email - The email to validate
 * @returns {boolean} - True if email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates if a value is a valid date format (YYYY-MM-DD)
 * @param {string} date - The date string to validate
 * @returns {boolean} - True if date is valid
 */
export const isValidDate = (date) => {
  if (!date) return false;
  const dateObj = new Date(date);
  return !isNaN(dateObj.getTime());
};

/**
 * Validates if a value is a number
 * @param {*} value - The value to check
 * @returns {boolean} - True if value is a number
 */
export const isNumber = (value) => {
  if (value === null || value === undefined || value === '') return false;
  return !isNaN(Number(value));
};

/**
 * Validates if a value is a positive number
 * @param {*} value - The value to check
 * @returns {boolean} - True if value is a positive number
 */
export const isPositiveNumber = (value) => {
  return isNumber(value) && Number(value) > 0;
};

/**
 * Validates a form object against a set of validation rules
 * @param {Object} data - The form data object
 * @param {Object} rules - Validation rules object
 * @returns {Object} - Object with validation errors
 */
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const fieldRules = rules[field];
    const value = data[field];
    
    // Required field validation
    if (fieldRules.required && !isNotEmpty(value)) {
      errors[field] = fieldRules.message || 'This field is required';
      return;
    }
    
    // Email validation
    if (fieldRules.email && value && !isValidEmail(value)) {
      errors[field] = fieldRules.message || 'Please enter a valid email';
      return;
    }
    
    // Date validation
    if (fieldRules.date && value && !isValidDate(value)) {
      errors[field] = fieldRules.message || 'Please enter a valid date';
      return;
    }
    
    // Number validation
    if (fieldRules.number && value && !isNumber(value)) {
      errors[field] = fieldRules.message || 'Please enter a valid number';
      return;
    }
    
    // Positive number validation
    if (fieldRules.positive && value && !isPositiveNumber(value)) {
      errors[field] = fieldRules.message || 'Please enter a positive number';
      return;
    }
    
    // Min length validation
    if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
      errors[field] = fieldRules.message || `Minimum ${fieldRules.minLength} characters required`;
      return;
    }
    
    // Max length validation
    if (fieldRules.maxLength && value && value.length > fieldRules.maxLength) {
      errors[field] = fieldRules.message || `Maximum ${fieldRules.maxLength} characters allowed`;
      return;
    }
    
    // Custom validation
    if (fieldRules.custom && typeof fieldRules.custom === 'function') {
      const customError = fieldRules.custom(value, data);
      if (customError) {
        errors[field] = customError;
        return;
      }
    }
  });
  
  return errors;
};