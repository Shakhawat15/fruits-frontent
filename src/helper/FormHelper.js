import { toast } from "react-toastify";

const EmailRegex = /\S+@\S+\.\S+/;
const MobileRegex = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

class FormHelper {
  // IsEmpty = (value) => {
  //   return value.length === 0;
  // };
  IsEmpty = (value) => {
    if (value === undefined || value === null) return true; // Check for null or undefined
    if (typeof value === "string" && value.trim().length === 0) return true; // Empty string (trim removes spaces)
    if (Array.isArray(value) && value.length === 0) return true; // Empty array
    if (typeof value === "object" && Object.keys(value).length === 0)
      return true; // Empty object
    return false; // Otherwise, not empty
  };

  IsMobile = (value) => {
    return MobileRegex.test(value);
  };

  IsEmail = (value) => {
    return !EmailRegex.test(value);
  };

  ErrorToast = (message) => {
    toast.error(message);
  };

  SuccessToast = (message) => {
    toast.success(message);
  };
}

export const { IsEmpty, IsMobile, IsEmail, ErrorToast, SuccessToast } =
  new FormHelper();
