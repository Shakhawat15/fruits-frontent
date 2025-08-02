import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Spinner,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { AxiosHeader, baseURL } from "../../../API/config";
import { ErrorToast, IsEmpty, SuccessToast } from "../../../helper/FormHelper";

export default function AddTestimonial({ existingTestimonial, onCancel }) {
  const firstNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const profilePhotoRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingTestimonial?.picture) {
      setLogoPreview(existingTestimonial.picture);
    }
  }, [existingTestimonial]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const full_name = firstNameRef.current.value;
    const designation = emailRef.current.value;
    const message = phoneRef.current.value;
    const profilePhoto = profilePhotoRef.current.files[0];

    let newErrors = {};
    if (IsEmpty(full_name)) newErrors.full_name = "Full Name is required!";
    if (IsEmpty(designation))
      newErrors.designation = "Designation is required!";
    if (IsEmpty(message)) newErrors.message = "Message is required!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("name", full_name);
    formData.append("designation", designation);
    formData.append("message", message);
    if (profilePhoto) formData.append("avatar", profilePhoto);

    setLoading(true);
    try {
      let response;
      if (existingTestimonial) {
        response = await axios.put(
          `${baseURL}/testimonials/update/${existingTestimonial._id}`,
          formData,
          AxiosHeader
        );
      } else {
        response = await axios.post(
          `${baseURL}/testimonials/create`,
          formData,
          AxiosHeader
        );
      }

      if (response.status === 200 || response.status === 201) {
        SuccessToast(response.data.message);
        setTimeout(onCancel, 1000);
      }
    } catch (error) {
      ErrorToast(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog
      open={true}
      handler={onCancel}
      className="p-6 bg-white rounded-lg shadow-lg"
    >
      <ToastContainer />
      <DialogHeader className="bg-gray-100 border-b border-gray-300 p-4">
        <h4 className="text-xl font-semibold text-gray-800">
          {existingTestimonial ? "Update Testimonial" : "Add Testimonial"}
        </h4>
      </DialogHeader>
      <DialogBody className="p-6">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              ref={firstNameRef}
              defaultValue={existingTestimonial?.name || ""}
              type="text"
              placeholder="Full Name"
              className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${
                errors.full_name ? "border-red-500" : ""
              }`}
            />
            {errors.full_name && (
              <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
            )}
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Designation
            </label>
            <input
              ref={emailRef}
              defaultValue={existingTestimonial?.designation || ""}
              type="text"
              placeholder="Designation"
              className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${
                errors.designation ? "border-red-500" : ""
              }`}
            />
            {errors.designation && (
              <p className="text-red-500 text-xs mt-1">{errors.designation}</p>
            )}
          </div>

          {/* Message - Full Width */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              ref={phoneRef}
              defaultValue={existingTestimonial?.message || ""}
              placeholder="Write a message..."
              rows="3"
              className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${
                errors.message ? "border-red-500" : ""
              }`}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          {/* Profile Photo */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Photo
            </label>
            <input
              ref={profilePhotoRef}
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoChange}
              className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#FFA500] file:text-white hover:file:bg-[#FF8C00]"
            />
            {logoPreview && (
              <div className="relative mt-4 w-32">
                <img
                  src={logoPreview}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-md shadow-md border"
                />
                <button
                  type="button"
                  onClick={() => setLogoPreview(null)}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full shadow-md"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-6">
            <Button
              type="submit"
              className="py-2 px-6 rounded-md shadow-sm bg-[#FFA500] hover:bg-[#FF8C00] text-white"
            >
              {loading ? (
                <Spinner className="h-4 w-4" />
              ) : existingTestimonial ? (
                "Update Testimonial"
              ) : (
                "Add Testimonial"
              )}
            </Button>
            <Button
              type="button"
              onClick={onCancel}
              className="py-2 px-6 bg-gray-600 text-white rounded-md shadow-sm hover:bg-gray-700"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}
