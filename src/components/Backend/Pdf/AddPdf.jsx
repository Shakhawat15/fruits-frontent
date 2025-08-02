import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Spinner,
} from "@material-tailwind/react";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { AxiosHeader, baseURL } from "../../../API/config";
import { ErrorToast, SuccessToast } from "../../../helper/FormHelper";

export function AddPdf({ existingPdf, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: existingPdf ? existingPdf.title : "",
      picture: existingPdf ? existingPdf.picture : null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Brand name is required!"),
      picture: Yup.mixed().test(
        "fileSize",
        "Logo is required!",
        (value) => !!value || !!existingPdf
      ),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", values.name);
      if (values.picture) {
        formData.append("picture", values.picture);
      }

      try {
        let response;
        if (existingPdf) {
          response = await axios.put(
            `${baseURL}/pdfs/update/${existingPdf._id}`,
            formData,
            AxiosHeader
          );
        } else {
          response = await axios.post(
            `${baseURL}/pdfs/create`,
            formData,
            AxiosHeader
          );
        }
        if (response.status === 200 || response.status === 201) {
          SuccessToast(
            existingPdf
              ? "Gallery Folder updated successfully"
              : "Gallery Folder created successfully"
          );
          setTimeout(() => {
            onCancel(); // Close the modal after showing the toast
          }, 1000);
        } else {
          throw new Error("Failed to save gallery folder");
        }
      } catch (error) {
        ErrorToast(error.message || "Failed to save gallery folder");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (existingPdf && existingPdf.picture) {
      setLogoPreview(`${existingPdf.picture}`);
    }
  }, [existingPdf]);

  const handleLogoChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("picture", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    formik.setFieldValue("picture", null);
    setLogoPreview(null);
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
          {existingPdf ? "Update Gallery Folder" : "Add Gallery Folder"}
        </h4>
      </DialogHeader>
      <DialogBody className="p-6">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter gallery folder title"
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

          <div>
            <label
              htmlFor="picture"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Picture
            </label>
            {logoPreview ? (
              <div className="relative w-full h-32 bg-gray-100 border border-gray-300 rounded-md overflow-hidden">
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="object-contain w-full h-full"
                />
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded-md hover:bg-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <input
                type="file"
                id="picture"
                name="picture"
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                  formik.touched.picture && formik.errors.picture
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                onChange={handleLogoChange}
              />
            )}
            {formik.touched.picture && formik.errors.picture ? (
              <p className="mt-1 text-xs text-red-600">
                {formik.errors.picture}
              </p>
            ) : null}
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              className="py-2 px-4 text-white rounded-md shadow-md bg-[#FFA500] hover:bg-[#FF8C00]"
              disabled={loading}
            >
              {loading ? (
                <Spinner className="w-4 h-4" />
              ) : existingPdf ? (
                "Update Gallery Folder"
              ) : (
                "Add Gallery Folder"
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

export default AddPdf;
