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

export default function AddProduct({ existingProduct, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [productTypes, setProductTypes] = useState([]);
  const [mediaFiles, setMediaFiles] = useState([]);

  // Fetch Product Types
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/product-types/all`,
          AxiosHeader
        );
        setProductTypes(res.data.data || []);
      } catch (error) {
        ErrorToast("Failed to load product types");
      }
    };
    fetchTypes();
  }, []);

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      type_id: existingProduct ? existingProduct.type_id?._id : "",
      title: existingProduct ? existingProduct.title : "",
      quantity: existingProduct ? existingProduct.quantity : "",
      rrp: existingProduct ? existingProduct.rrp : "",
      discounted_price: existingProduct ? existingProduct.discounted_price : "",
      discount_price: existingProduct ? existingProduct.discount_price : "",
      description: existingProduct ? existingProduct.description : "",
      status: existingProduct ? existingProduct.status : true,
    },
    validationSchema: Yup.object({
      type_id: Yup.string().required("Product type is required!"),
      title: Yup.string().required("Product title is required!"),
      quantity: Yup.number().required("Quantity is required!"),
      rrp: Yup.number().required("RRP is required!"),
      discounted_price: Yup.number().required("Discounted price is required!"),
      discount_price: Yup.number().required("Discount price is required!"),
      description: Yup.string().required("Description is required!"),
    }),
    onSubmit: async (values) => {
      setLoading(true);

      try {
        // Build FormData
        const formData = new FormData();
        formData.append("type_id", values.type_id);
        formData.append("title", values.title);
        formData.append("quantity", values.quantity);
        formData.append("rrp", values.rrp);
        formData.append("discounted_price", values.discounted_price);
        formData.append("discount_price", values.discount_price);
        formData.append("description", values.description);
        formData.append("status", values.status);

        // Append media files if selected
        mediaFiles.forEach((file) => {
          formData.append("media", file); // multiple files
        });

        let response;
        if (existingProduct) {
          response = await axios.put(
            `${baseURL}/products/update/${existingProduct._id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                ...AxiosHeader.headers,
              },
            }
          );
        } else {
          response = await axios.post(`${baseURL}/products/create`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              ...AxiosHeader.headers,
            },
          });
        }

        if (response.status === 200 || response.status === 201) {
          SuccessToast(response.data.message || "Product saved successfully");
          setTimeout(() => {
            onCancel();
          }, 1000);
        } else {
          throw new Error("Failed to save product");
        }
      } catch (error) {
        ErrorToast(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    },
  });

  // Load existing product values
  useEffect(() => {
    if (existingProduct) {
      formik.setValues({
        type_id: existingProduct.type_id?._id || "",
        title: existingProduct.title,
        quantity: existingProduct.quantity,
        rrp: existingProduct.rrp,
        discounted_price: existingProduct.discounted_price,
        discount_price: existingProduct.discount_price,
        description: existingProduct.description,
        status: existingProduct.status,
      });
    }
  }, [existingProduct]);

  return (
    <Dialog
      size="lg"
      open={true}
      handler={onCancel}
      className="p-6 bg-white rounded-lg shadow-lg"
    >
      <ToastContainer />
      <DialogHeader className="bg-gray-100 border-b border-gray-300">
        <h4 className="text-xl font-semibold text-gray-800">
          {existingProduct ? "Update Product" : "Add Product"}
        </h4>
      </DialogHeader>
      <DialogBody className="p-6">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Product Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Type
            </label>
            <select
              name="type_id"
              value={formik.values.type_id}
              onChange={formik.handleChange}
              className={`w-full px-4 py-3 border rounded-md shadow-sm ${
                formik.touched.type_id && formik.errors.type_id
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">Select Product Type</option>
              {productTypes.map((type) => (
                <option key={type._id} value={type._id}>
                  {type.name}
                </option>
              ))}
            </select>
            {formik.touched.type_id && formik.errors.type_id && (
              <p className="text-xs text-red-600">{formik.errors.type_id}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter product title"
              className="w-full px-4 py-3 border rounded-md"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-xs text-red-600">{formik.errors.title}</p>
            )}
          </div>

          {/* Quantity, RRP, Discounted Price, Discount Price */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["quantity", "rrp", "discounted_price", "discount_price"].map(
              (field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.replace("_", " ").toUpperCase()}
                  </label>
                  <input
                    type="number"
                    name={field}
                    className="w-full px-4 py-3 border rounded-md"
                    value={formik.values[field]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched[field] && formik.errors[field] && (
                    <p className="text-xs text-red-600">
                      {formik.errors[field]}
                    </p>
                  )}
                </div>
              )
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              className="w-full px-4 py-3 border rounded-md"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-xs text-red-600">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Media Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Media (Images/PDF/Videos)
            </label>
            <input
              type="file"
              multiple
              accept="image/*,.pdf,video/*"
              onChange={(e) => setMediaFiles(Array.from(e.target.files))}
              className="w-full"
            />
          </div>

          {/* Status */}
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

          {/* Submit + Cancel */}
          <div className="flex gap-4">
            <Button
              type="submit"
              className="py-2 px-4 text-white rounded-md shadow-md bg-[#FFA500] hover:bg-[#FF8C00]"
              disabled={loading}
            >
              {loading ? (
                <Spinner className="w-4 h-4" />
              ) : existingProduct ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </Button>
            <Button
              type="button"
              onClick={onCancel}
              className="py-2 px-4 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md shadow-md"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}
