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

export default function AddProductType({ existingProductType, onCancel }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: existingProductType ? existingProductType.name : "",
      status: existingProductType ? existingProductType.status : true,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product type name is required!"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const formData = {
        name: values.name,
        status: values.status,
      };

      try {
        let response;
        if (existingProductType) {
          response = await axios.put(
            `${baseURL}/product-types/update/${existingProductType["_id"]}`,
            formData,
            AxiosHeader
          );
        } else {
          response = await axios.post(
            `${baseURL}/product-types/create`,
            formData,
            AxiosHeader
          );
        }
        if (response.status === 200 || response.status === 201) {
          SuccessToast(response.data.message || "Role saved successfully");
          setTimeout(() => {
            onCancel(); // Close the modal after showing the toast
          }, 1000);
        } else {
          throw new Error("Failed to save role");
        }
      } catch (error) {
        ErrorToast(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (existingProductType) {
      formik.setValues({
        name: existingProductType.name,
        status: existingProductType.status,
      });
    }
  }, [existingProductType]);

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
          {existingProductType ? "Update Product Type" : "Add Product Type"}
        </h4>
      </DialogHeader>
      <DialogBody className="p-6">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Type Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter role name"
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
              ) : existingProductType ? (
                "Update Product Type"
              ) : (
                "Add Product Type"
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
