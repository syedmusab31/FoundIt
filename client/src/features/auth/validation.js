const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email) => {
  if (!email.trim()) return 'Email is required';
  if (!EMAIL_PATTERN.test(email.trim())) return 'Enter a valid email address';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return '';
};

export const validateOtp = (otp) => (/^\d{6}$/.test(otp) ? '' : 'Enter the 6-digit code');

export const validatePhone = (phone) => {
  if (!phone.trim()) return 'Phone number is required';
  if (!/^\d{10,15}$/.test(phone.trim())) return 'Phone number must be 10–15 digits';
  return '';
};

export const compactErrors = (errors) =>
  Object.fromEntries(Object.entries(errors).filter(([, message]) => Boolean(message)));
