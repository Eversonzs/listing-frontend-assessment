export const validateFormData = (data) => {
  /// Validate full name: at least 3 characters
  if (!data.fullName || data.fullName.trim().length < 3) {
    return "Full Name must be at least 3 characters long.";
  }

  /// Validate email: email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    return "Please enter a valid email address.";
  }

  // Validate phone number: exactly 8 digits, numbers only
  const phoneRegex = /^\d{8}$/;
  if (!data.phoneNumber || !phoneRegex.test(data.phoneNumber)) {
    return "Phone Number must be exactly 8 digits.";
  }

  // Validate comments: at least 5 characters
  if (!data.comment || data.comment.trim().length < 5) {
    return "Comments must be at least 5 characters long.";
  }

  return "";
};