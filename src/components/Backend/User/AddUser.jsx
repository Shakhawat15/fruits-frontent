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

export default function AddUser({ existingUser, onCancel }) {
  const roleRef = useRef(null);
  const firstNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const profilePhotoRef = useRef(null);

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/user-roles/all`,
          AxiosHeader
        );
        setRoles(response.data.data);
      } catch (error) {
        ErrorToast("Failed to fetch user roles");
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    if (existingUser) {
      setSelectedRole(existingUser.role_id || "");

      if (existingUser.avatar) {
        setLogoPreview(`${existingUser.avatar}`);
      }
    }
  }, [existingUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const role = selectedRole;
    const full_name = firstNameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    if (!existingUser) {
      var password = passwordRef.current.value;
    }
    const profilePhoto = profilePhotoRef.current.files[0];

    let newErrors = {};

    if (IsEmpty(role)) newErrors.role = "Role is required!";
    if (IsEmpty(full_name)) newErrors.full_name = "First Name is required!";
    if (IsEmpty(email)) newErrors.email = "Valid Email is required!";
    if (IsEmpty(phone)) newErrors.phone = "Valid Phone is required!";
    if (!existingUser) {
      if (IsEmpty(password)) newErrors.password = "Password is required!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("role_id", role);
    formData.append("full_name", full_name);
    formData.append("email", email);
    formData.append("mobile", phone);
    formData.append("password", password);
    if (profilePhoto) formData.append("avatar", profilePhoto);

    setLoading(true);
    try {
      let response;
      if (existingUser) {
        const URL = `${baseURL}/users/update/${existingUser["_id"]}`;
        response = await axios.put(URL, formData, AxiosHeader);
      } else {
        const URL = `${baseURL}/users/register`;
        response = await axios.post(URL, formData, AxiosHeader);
      }

      if (response.status === 200 || response.status === 201) {
        SuccessToast(response.data.message);
        setTimeout(() => {
          onCancel();
        }, 1000);
      }
    } catch (error) {
      ErrorToast(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleProfilePhotoChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePhoto = () => {
    profilePhotoRef.current.value = null;
    setLogoPreview(null);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <Dialog
      size="md"
      open={true}
      handler={onCancel}
      className="p-6 bg-white rounded-lg shadow-lg"
    >
      <ToastContainer />
      <DialogHeader className="bg-gray-100 border-b border-gray-300">
        <h4 className="text-xl font-semibold text-gray-800">
          {existingUser ? "Update User" : "Add User"}
        </h4>
      </DialogHeader>
      <DialogBody className="p-6">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          <div className="col-span-1">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              ref={firstNameRef}
              defaultValue={existingUser ? existingUser.full_name : ""}
              type="text"
              placeholder="First Name"
              className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                errors.full_name ? "border-red-500" : ""
              }`}
            />
            {errors.full_name && (
              <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
            )}
          </div>

          <div className="col-span-1">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Role
            </label>
            <select
              ref={roleRef}
              id="role"
              name="role"
              value={selectedRole} // Controlled select input
              onChange={handleRoleChange} // Handle changes
              className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                errors.role ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role}</p>
            )}
          </div>

          <div className="col-span-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              ref={emailRef}
              defaultValue={existingUser ? existingUser.email : ""}
              type="email"
              placeholder="Email"
              className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="col-span-1">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone
            </label>
            <input
              ref={phoneRef}
              defaultValue={existingUser ? existingUser.mobile : ""}
              type="tel"
              placeholder="Phone"
              className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {!existingUser && (
            <div className="col-span-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          )}

          <div className="col-span-1">
            <label
              htmlFor="profilePhoto"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Profile Photo
            </label>
            <input
              ref={profilePhotoRef}
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoChange}
              className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-colors"
            />
            {logoPreview && (
              <div className="relative mt-2">
                <img
                  src={logoPreview}
                  alt="Profile Preview"
                  className="w-24 h-24 object-cover rounded-full"
                />
                <button
                  type="button"
                  onClick={handleRemoveProfilePhoto}
                  className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                >
                  &times;
                </button>
              </div>
            )}
          </div>

          <div className="col-span-2 flex justify-end gap-4 mt-6">
            <Button
              type="submit"
              className="py-2 px-4 text-white rounded-md shadow-sm bg-[#FFA500] hover:bg-[#FF8C00]"
            >
              {loading ? (
                <Spinner className="h-4 w-4" />
              ) : existingUser ? (
                "Update User"
              ) : (
                "Add User"
              )}
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              className="py-2 px-4 text-white bg-gray-600 hover:bg-gray-700 rounded-md shadow-sm transition-colors"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}
