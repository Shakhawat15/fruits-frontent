export const validateInput = (value, type) => {
  const patterns = {
    text: /^[A-Za-z\s]*$/, // Allows only English letters and spaces
    alphanumeric: /^[A-Za-z0-9\s,.-]*$/, // Allows English letters, digits, spaces, commas, and periods
    number: /^[0-9]*$/, // Allows only numbers
    email: /^[a-zA-Z0-9._%+-]*@?[a-zA-Z0-9.-]*\.?[a-zA-Z]{0,4}$/, // Allows partial email input
    coordinates: /^-?\d{0,3}(\.\d{0,10})?,?\s*-?\d{0,3}(\.\d{0,10})?$/, // Allows partial latitude/longitude
    url: /^(https?:\/\/)?[a-zA-Z0-9.-]*\.?[a-zA-Z]{0,10}\/?[a-zA-Z0-9._%-]*$/, // Allows partial URL input
  };

  // Allow empty input (for backspace to work)
  if (value === "" || value.trim() === "") return true;

  // Validate against the pattern
  return patterns[type]?.test(value) ?? true;
};
