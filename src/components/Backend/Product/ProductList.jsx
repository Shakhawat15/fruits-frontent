import {
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  IconButton,
  Input,
  Tooltip,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { AxiosHeader, baseURL } from "../../../API/config";
import { DeleteAlert } from "../../../helper/DeleteAlert";
import { ErrorToast } from "../../../helper/FormHelper";
import LazyLoader from "../BackendMasterLayout/LazyLoader";
import Loader from "../BackendMasterLayout/Loader";
import AddProduct from "./AddProduct";

const TABLE_HEAD = [
  "S.No",
  "Title",
  "SKU",
  "Type",
  "Quantity",
  "RRP",
  "Discounted Price",
  "Discount Price",
  "Seller",
  "Status",
  "Created At",
  "Action",
];

export default function ProductList() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseURL}/products/all-backend`,
        AxiosHeader
      );
      setProducts(response.data.data || []);
    } catch (error) {
      ErrorToast(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
    fetchProducts();
  };

  const handleEditProduct = (product) => {
    handleOpenModal(product);
  };

  const handleDeleteProduct = async (id) => {
    const isDeleted = await DeleteAlert(id, "products/delete");
    if (isDeleted) {
      setProducts(products.filter((p) => p._id !== id));
    }
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentTableData = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Card className="w-full h-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none p-5 bg-gray-100 border-b border-gray-200"
        >
          <div className="mb-6 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-semibold"
              >
                Product List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all products
              </Typography>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <div className="w-full lg:w-80">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
              <Button
                onClick={() => handleOpenModal()}
                className="flex items-center gap-3 bg-[#FFA500] hover:bg-[#FF8C00] text-white"
                size="sm"
              >
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Product
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-hidden px-0 pt-0">
          {loading ? (
            <Loader />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-max table-auto text-left border-separate border-spacing-0">
                <thead className="bg-gray-200 border-b border-gray-300 sticky top-0 z-10">
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="p-4 border-b border-gray-300 bg-gray-100 text-gray-700 font-medium"
                      >
                        <Typography
                          variant="small"
                          color="gray"
                          className="flex items-center justify-between gap-2 font-normal leading-none"
                        >
                          {head}
                          <ChevronUpDownIcon
                            strokeWidth={2}
                            className="h-4 w-4 text-gray-500"
                          />
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentTableData.map((product, index) => {
                    const {
                      _id,
                      title,
                      sku,
                      type_id,
                      quantity,
                      rrp,
                      discounted_price,
                      discount_price,
                      createdAt,
                      product_by,
                    } = product;

                    const isLast = index === currentTableData.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-gray-200";

                    return (
                      <tr key={_id} className="hover:bg-gray-50">
                        <td className={classes}>
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className={classes}>{title}</td>
                        <td className={classes}>{sku}</td>
                        <td className={classes}>{type_id?.name || "—"}</td>
                        <td className={classes}>{quantity}</td>
                        <td className={classes}>{rrp}</td>
                        <td className={classes}>{discounted_price}</td>
                        <td className={classes}>{discount_price}</td>

                        {/* Seller Info */}
                        <td className={classes}>
                          <div className="flex items-center gap-2">
                            <Avatar
                              src={product_by?.avatar || "/default-avatar.png"}
                              alt={product_by?.full_name}
                              size="sm"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {product_by?.full_name || "—"}
                              </p>
                              <p className="text-xs text-gray-500">
                                {product_by?.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className={classes}>
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={quantity > 0 ? "In Stock" : "Out of Stock"}
                            color={quantity > 0 ? "green" : "red"}
                          />
                        </td>

                        {/* Created At */}
                        <td className={classes}>
                          {new Date(createdAt).toLocaleDateString()}
                        </td>

                        {/* Actions */}
                        <td className={classes}>
                          <div className="flex gap-2">
                            <Tooltip content="Edit Product">
                              <IconButton
                                onClick={() => handleEditProduct(product)}
                                variant="text"
                                color="orange"
                              >
                                <PencilIcon className="h-5 w-5" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Delete Product">
                              <IconButton
                                onClick={() => handleDeleteProduct(_id)}
                                variant="text"
                                color="red"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-gray-200 p-4">
          <Typography variant="small" color="gray" className="font-normal">
            Page {currentPage} of {totalPages}
          </Typography>
          <div className="flex gap-2 items-center">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
              color="blue"
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages}
              color="blue"
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {openModal && (
        <Suspense fallback={<LazyLoader />}>
          <AddProduct
            onCancel={handleCloseModal}
            existingProduct={selectedProduct}
          />
        </Suspense>
      )}
    </>
  );
}
