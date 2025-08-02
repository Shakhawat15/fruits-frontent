import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Spinner,
  Switch,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { AxiosHeader, baseURL } from "../../../API/config";
import { ErrorToast, SuccessToast } from "../../../helper/FormHelper";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AddNews({ existingNews, onCancel }) {
  const [picture, setPicture] = useState(null);
  const [status, setStatus] = useState(
    existingNews ? existingNews.status : true
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingNews?.picture) {
      setPicture(existingNews.picture);
    }
  }, [existingNews]);

  const formik = useFormik({
    initialValues: {
      title: existingNews?.title || "",
      description: existingNews?.description || "",
      readMore: existingNews?.read_more_link || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required!"),
      description: Yup.string().required("Description is required!"),
      readMore: Yup.string()
        .required("Read More link is required!")
        .matches(
          /^https?:\/\/.+/,
          "Enter a valid URL (e.g., https://example.com)"
        ),
    }),
    onSubmit: async (values) => {
      if (!picture) {
        ErrorToast("Picture is required!");
        return;
      }

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("read_more_link", values.readMore);
      formData.append("status", status ? 1 : 0);
      if (picture instanceof File) formData.append("picture", picture);

      setLoading(true);
      try {
        let response;
        if (existingNews) {
          response = await axios.put(
            `${baseURL}/news/update/${existingNews["_id"]}`,
            formData,
            AxiosHeader
          );
        } else {
          response = await axios.post(
            `${baseURL}/news/create`,
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
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPicture(file);
    }
  };

  return (
    <Dialog
      open={true}
      handler={onCancel}
      className="p-8 bg-white rounded-lg shadow-lg max-w-3xl mx-auto"
    >
      <ToastContainer />
      <DialogHeader className="bg-gray-200 border-b border-gray-300 rounded-t-lg">
        <h4 className="text-xl font-semibold text-gray-800">
          {existingNews ? "Update News" : "Add News"}
        </h4>
      </DialogHeader>
      <DialogBody className="p-6">
        <form className="grid grid-cols-1 gap-6" onSubmit={formik.handleSubmit}>
          {/* Title and Read More Link in a row */}
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder="Enter news title"
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none ${
                  formik.touched.title && formik.errors.title
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.title}
                </p>
              )}
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Read More Link
              </label>
              <input
                name="readMore"
                value={formik.values.readMore}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder="Enter read more link"
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none ${
                  formik.touched.readMore && formik.errors.readMore
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.readMore && formik.errors.readMore && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.readMore}
                </p>
              )}
            </div>
          </div>

          {/* Description in a single row */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter news description"
              className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              rows="4"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Picture */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Picture <span className="text-red-500">*</span>
            </label>
            <div
              className={`relative w-full h-64 border-2 rounded-lg flex items-center justify-center bg-gray-100 ${
                !picture && formik.touched.picture && formik.errors.picture
                  ? "border-red-500"
                  : "border-dashed border-gray-300"
              }`}
            >
              {picture ? (
                <img
                  src={
                    picture instanceof File
                      ? URL.createObjectURL(picture)
                      : picture
                  }
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-400 text-sm">No Image</span>
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Status</span>
            <Switch
              checked={status}
              onChange={() => setStatus(!status)}
              color="green"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <Button
              className="py-2 px-4 text-white rounded-md shadow-sm bg-[#FFA500] hover:bg-[#FF8C00]"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Spinner className="w-5 h-5" />
              ) : existingNews ? (
                "Update"
              ) : (
                "Add"
              )}
            </Button>
            <Button
              className="py-2 px-4 text-white bg-gray-600 hover:bg-gray-700 rounded-md shadow-sm transition-colors"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}
