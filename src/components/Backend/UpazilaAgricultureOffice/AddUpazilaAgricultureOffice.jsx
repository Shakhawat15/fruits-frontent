import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Spinner,
  Switch,
} from "@material-tailwind/react";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { AxiosHeader, baseURL } from "../../../API/config";
import { ErrorToast, SuccessToast } from "../../../helper/FormHelper";

export default function AddUpazilaAgricultureOffice({
  existingDistrict,
  onCancel,
}) {
  const [loading, setLoading] = useState(false);
  const [districts, setDistricts] = useState([]);

  // Retrieve user data from local storage
  const userData = JSON.parse(localStorage.getItem("user"));
  const userRoleId = userData?.role_id;
  const userDistrictId = userData?.district;
  const SUPER_ADMIN_ROLE_ID = "67c8931c14acfa3684d55f09"; // Replace with actual Super Admin Role ID

  useEffect(() => {
    fetchDistricts();
  }, []);

  const fetchDistricts = async () => {
    try {
      const response = await axios.get(`${baseURL}/districts/all`, AxiosHeader);
      let districtData = response.data.data;

      // If the user is not a super admin, filter to only their district
      if (userRoleId !== SUPER_ADMIN_ROLE_ID) {
        districtData = districtData.filter(
          (district) => district._id === userDistrictId
        );
      }
      setDistricts(districtData);
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      district: existingDistrict
        ? existingDistrict.district?._id
        : userRoleId === SUPER_ADMIN_ROLE_ID
        ? ""
        : userDistrictId, // Auto-set user's district if not super admin
      name: existingDistrict ? existingDistrict.name : "",
      status: existingDistrict ? existingDistrict.status : true,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Agriculture Office Name is required!"),
      district: Yup.string().required("District is required!"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const formData = {
        district: values.district,
        name: values.name,
        status: values.status,
      };

      try {
        let response;
        if (existingDistrict) {
          response = await axios.put(
            `${baseURL}/upazila-agriculture-offices/update/${existingDistrict["_id"]}`,
            formData,
            AxiosHeader
          );
        } else {
          response = await axios.post(
            `${baseURL}/upazila-agriculture-offices/create`,
            formData,
            AxiosHeader
          );
        }
        if (response.status === 200 || response.status === 201) {
          SuccessToast(response.data.message || "Office saved successfully");
          setTimeout(() => {
            onCancel(); // Close the modal after showing the toast
          }, 1000);
        } else {
          throw new Error("Failed to save office");
        }
      } catch (error) {
        ErrorToast(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (existingDistrict) {
      formik.setValues({
        district: existingDistrict.district?._id,
        name: existingDistrict.name,
        status: existingDistrict.status,
      });
    }
  }, [existingDistrict]);

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
          {existingDistrict
            ? "Update Agriculture Office"
            : "Add Agriculture Office"}
        </h4>
      </DialogHeader>
      <DialogBody className="p-6">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="district"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              District
            </label>
            <select
              id="district"
              name="district"
              className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                formik.touched.district && formik.errors.district
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.district}
              disabled={userRoleId !== SUPER_ADMIN_ROLE_ID} // Disable selection if not super admin
            >
              <option value="">Select a district</option>
              {districts.map((district) => (
                <option key={district._id} value={district._id}>
                  {district.name}
                </option>
              ))}
            </select>
            {formik.touched.district && formik.errors.district ? (
              <p className="mt-1 text-xs text-red-600">
                {formik.errors.district}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Agriculture Office Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter agriculture office name"
              className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="mt-1 text-xs text-red-600">{formik.errors.name}</p>
            ) : null}
          </div>

          <div className="flex items-center">
            <Switch
              id="status"
              checked={formik.values.status}
              onChange={() =>
                formik.setFieldValue("status", !formik.values.status)
              }
              color="green"
              label="Active"
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              className="py-2 px-4 text-white rounded-md shadow-md bg-[#FFA500] hover:bg-[#FF8C00]"
              disabled={loading}
            >
              {loading ? (
                <Spinner className="w-4 h-4" />
              ) : existingDistrict ? (
                "Update Agriculture Office"
              ) : (
                "Add Agriculture Office"
              )}
            </Button>
            <Button
              type="button"
              onClick={onCancel}
              className="py-2 px-4 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}
