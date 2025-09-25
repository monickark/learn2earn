export default function validateInput(input, options = {}) {
  // Check if input is a string
  if (typeof input !== 'string') {
    return false;
  }

  const trimmed = input.trim();
  
  // Check minimum length (default: 2)
  const minLength = options.minLength || 2;
  if (trimmed.length < minLength) {
    return false;
  }

  // Check maximum length to prevent overly long inputs (default: 500)
  const maxLength = options.maxLength || 500;
  if (trimmed.length > maxLength) {
    return false;
  }

  // Check for potentially malicious patterns
  const dangerousPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /data:text\/html/gi
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(trimmed)) {
      return false;
    }
  }

  return true;
}