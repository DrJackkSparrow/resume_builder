import sanitizeHtml from 'sanitize-html';

/**
 * Strict configuration for the HTML sanitizer.
 * Only permits basic text formatting tags that might be required for the resume template.
 * Explicitly strips dangerous tags like <script>, <iframe>, <img>, <style>, and <link>.
 */
const strictSanitizerOptions = {
  allowedTags: ['b', 'i', 'em', 'strong', 'u'],
  allowedAttributes: {} // No attributes allowed at all (e.g., no href, class, style)
};

/**
 * Recursively traverses a JSON object (or array) and sanitizes every string value.
 * Assumes all strings from the client are potentially malicious payloads.
 * 
 * @param {any} data - The data to sanitize
 * @returns {any} - A new sanitized object/array/value
 */
export const sanitizeResumeData = (data) => {
  if (typeof data === 'string') {
    return sanitizeHtml(data, strictSanitizerOptions);
  }

  if (Array.isArray(data)) {
    return data.map(item => sanitizeResumeData(item));
  }

  if (data !== null && typeof data === 'object') {
    const sanitizedObj = {};
    for (const [key, value] of Object.entries(data)) {
      sanitizedObj[key] = sanitizeResumeData(value);
    }
    return sanitizedObj;
  }

  // Return numbers, booleans, and null as-is
  return data;
};
