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

export function AddImageGallery({ existingImageGallery, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [galleryFolders, setGalleryFolders] = useState([]);

  // Fetch Gallery Folders
  useEffect(() => {
    const fetchGalleryFolders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${baseURL}/gallery-folders/all`,
          AxiosHeader
        );
        setGalleryFolders(response.data.data || []);
      } catch (error) {
        ErrorToast("Failed to fetch Gallery Folder data.");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryFolders();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: existingImageGallery ? existingImageGallery.title : "",
      picture: existingImageGallery ? existingImageGallery.picture : null,
      galleryFolder: existingImageGallery
        ? existingImageGallery.gallery_folder?._id
        : "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Gallery name is required!"),
      galleryFolder: Yup.string().required("Gallery Folder is required!"),
      picture: Yup.mixed().test(
        "fileSize",
        "Picture is required!",
        (value) => !!value || !!existingImageGallery
      ),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", values.name);
      formData.append("gallery_folder", values.galleryFolder);
      if (values.picture) {
        formData.append("picture", values.picture);
      }

      try {
        let response;
        if (existingImageGallery) {
          response = await axios.put(
            `${baseURL}/image-galleries/update/${existingImageGallery._id}`,
            formData,
            AxiosHeader
          );
        } else {
          response = await axios.post(
            `${baseURL}/image-galleries/create`,
            formData,
            AxiosHeader
          );
        }
        if (response.status === 200 || response.status === 201) {
          SuccessToast(
            existingImageGallery
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
    if (existingImageGallery && existingImageGallery.picture) {
      setLogoPreview(`${existingImageGallery.picture}`);
    }
  }, [existingImageGallery]);

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
          {existingImageGallery
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

          {/* Gallery Folder Dropdown */}
          <div>
            <label
              htmlFor="galleryFolder"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Gallery Folder
            </label>
            <select
              id="galleryFolder"
              name="galleryFolder"
              className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                formik.touched.galleryFolder && formik.errors.galleryFolder
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.galleryFolder}
            >
              <option value="">Select a folder</option>
              {galleryFolders.map((folder) => (
                <option key={folder._id} value={folder._id}>
                  {folder.title}
                </option>
              ))}
            </select>
            {formik.touched.galleryFolder && formik.errors.galleryFolder ? (
              <p className="mt-1 text-xs text-red-600">
                {formik.errors.galleryFolder}
              </p>
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
                className="w-full px-4 py-3 border rounded-md shadow-sm"
                onChange={handleLogoChange}
              />
            )}
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              className="bg-[#FFA500] hover:bg-[#FF8C00] text-white"
              disabled={loading}
            >
              {loading ? <Spinner className="w-4 h-4" /> : "Save"}
            </Button>
            <Button type="button" onClick={onCancel} color="gray">
              Cancel
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}

export default AddImageGallery;
