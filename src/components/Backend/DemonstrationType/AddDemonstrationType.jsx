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

export default function AddDemonstrationType({
  existingDemonstrationType,
  onCancel,
}) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: existingDemonstrationType ? existingDemonstrationType.title : "",
      status: existingDemonstrationType
        ? existingDemonstrationType.status
        : true,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Demonstration title is required!"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const formData = {
        title: values.title,
        status: values.status,
      };

      try {
        let response;
        if (existingDemonstrationType) {
          response = await axios.put(
            `${baseURL}/demonstration-types/update/${existingDemonstrationType["_id"]}`,
            formData,
            AxiosHeader
          );
        } else {
          response = await axios.post(
            `${baseURL}/demonstration-types/create`,
            formData,
            AxiosHeader
          );
        }
        if (response.status === 200 || response.status === 201) {
          SuccessToast(
            response.data.message || "Demonstration Type saved successfully"
          );
          setTimeout(() => {
            onCancel(); // Close the modal after showing the toast
          }, 1000);
        } else {
          throw new Error("Failed to save Demonstration Type");
        }
      } catch (error) {
        ErrorToast(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (existingDemonstrationType) {
      formik.setValues({
        title: existingDemonstrationType.title,
        status: existingDemonstrationType.status,
      });
    }
  }, [existingDemonstrationType]);

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
          {existingDemonstrationType
            ? "Update Demonstrtion Type"
            : "Add Demonstrtion Type"}
        </h4>
      </DialogHeader>
      <DialogBody className="p-6">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Demonstration Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter demonstration title"
              className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                formik.touched.title && formik.errors.title
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <p className="mt-1 text-xs text-red-600">{formik.errors.title}</p>
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
              className="py-2 px-4 text-white rounded-md shadow-md  bg-[#FFA500] hover:bg-[#FF8C00]"
              disabled={loading}
            >
              {loading ? (
                <Spinner className="w-4 h-4" />
              ) : existingDemonstrationType ? (
                "Update Demonstration Type"
              ) : (
                "Add Demonstration Type"
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
