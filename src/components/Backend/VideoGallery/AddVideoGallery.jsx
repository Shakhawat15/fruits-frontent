import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Spinner,
} from "@material-tailwind/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { AxiosHeader, baseURL } from "../../../API/config";
import { ErrorToast, SuccessToast } from "../../../helper/FormHelper";

export function AddGalleryFolder({ existingVideoGallery, onCancel }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: existingVideoGallery ? existingVideoGallery.title : "",
      youtube_link: existingVideoGallery
        ? existingVideoGallery.youtube_link
        : null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Brand name is required!"),
      youtube_link: Yup.string().required("Youtube link is required!"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", values.name);
      formData.append("youtube_link", values.youtube_link);

      try {
        let response;
        if (existingVideoGallery) {
          response = await axios.put(
            `${baseURL}/video-galleries/update/${existingVideoGallery._id}`,
            {
              title: values.name,
              youtube_link: values.youtube_link,
            },
            AxiosHeader
          );
        } else {
          response = await axios.post(
            `${baseURL}/video-galleries/create`,
            {
              title: values.name,
              youtube_link: values.youtube_link,
            },
            AxiosHeader
          );
        }
        if (response.status === 200 || response.status === 201) {
          SuccessToast(
            existingVideoGallery
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
          {existingVideoGallery
            ? "Update Gallery Folder"
            : "Add Gallery Folder"}
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
              placeholder="Enter video gallery title"
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
              htmlFor="youtube_link"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Youtube Link
            </label>
            <input
              type="text"
              id="youtube_link"
              name="youtube_link"
              placeholder="Enter youtube link"
              className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                formik.touched.youtube_link && formik.errors.youtube_link
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              onChange={(e) => {
                const inputValue = e.target.value;
                const videoIdMatch = inputValue.match(/[?&]v=([^&]+)/);
                const videoId = videoIdMatch ? videoIdMatch[1] : inputValue;
                formik.setFieldValue("youtube_link", videoId); // Set only the video ID
              }}
              onBlur={formik.handleBlur}
              value={formik.values.youtube_link}
            />
            {formik.touched.youtube_link && formik.errors.youtube_link ? (
              <p className="mt-1 text-xs text-red-600">
                {formik.errors.youtube_link}
              </p>
            ) : null}
            <p className="mt-1 text-xs text-gray-500">
              Ex:{" "}
              <span className="line-through">
                https://www.youtube.com/watch?v=
              </span>
              <span className="text-blue-600">QRwfApYpY2Y</span>
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              className="py-2 px-4 text-white rounded-md shadow-md bg-[#FFA500] hover:bg-[#FF8C00]"
              disabled={loading}
            >
              {loading ? (
                <Spinner className="w-4 h-4" />
              ) : existingVideoGallery ? (
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

export default AddGalleryFolder;
