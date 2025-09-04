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
} from "@material-tailwind/react";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { AxiosHeader, baseURL } from "../../../API/config";
import { DeleteAlert } from "../../../helper/DeleteAlert";
import { ErrorToast, SuccessToast } from "../../../helper/FormHelper";
import LazyLoader from "../BackendMasterLayout/LazyLoader";
import Loader from "../BackendMasterLayout/Loader";
import AddSeller from "./AddSeller";
import SellerDetails from "./SellerDetails";

const TABLE_HEAD = [
  "S.No",
  "Business Name",
  "Owner Name",
  "Email",
  "Phone",
  "Status",
  "Create Date",
  "Action",
];

export default function SellerList() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [detailsSeller, setDetailsSeller] = useState(null);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/sellers/all`, AxiosHeader);
      setSellers(response.data.data);
    } catch (error) {
      ErrorToast(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (seller = null) => {
    setSelectedSeller(seller);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSeller(null);
    fetchSellers();
  };

  const handleEditSeller = (seller) => {
    handleOpenModal(seller);
  };

  const handleDeleteSeller = async (id) => {
    const isDeleted = await DeleteAlert(id, "sellers/delete");
    if (isDeleted) {
      setSellers(sellers.filter((seller) => seller._id !== id));
    }
  };

  const totalPages = Math.ceil(sellers.length / itemsPerPage);
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentTableData = sellers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusToggle = async (userId, currentStatus) => {
    try {
      const newStatus = !currentStatus; // toggle boolean
      const response = await axios.patch(
        `${baseURL}/sellers/status/${userId}`,
        { is_active: newStatus }, // send boolean
        AxiosHeader
      );

      if (response.data.success) {
        setSellers((prevSellers) =>
          prevSellers.map((seller) =>
            seller._id === userId ? { ...seller, is_active: newStatus } : seller
          )
        );
        SuccessToast("Seller status updated successfully");
      } else {
        ErrorToast("Failed to update status");
      }
    } catch (error) {
      ErrorToast("Failed to update status");
    }
  };

  const handleOpenDetails = (seller) => {
    setDetailsSeller(seller);
    setOpenDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setDetailsSeller(null);
    setOpenDetailsModal(false);
  };

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
                Seller List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all sellers
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
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Seller
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
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={head}
                        className="p-4 border-b border-gray-300 bg-gray-100 text-gray-700 font-medium"
                      >
                        <Typography
                          variant="small"
                          color="gray"
                          className="flex items-center justify-between gap-2 font-normal leading-none"
                        >
                          {head}{" "}
                          {index !== TABLE_HEAD.length - 1 && (
                            <ChevronUpDownIcon
                              strokeWidth={2}
                              className="h-4 w-4 text-gray-500"
                            />
                          )}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentTableData.map(
                    (
                      {
                        business_name,
                        first_name,
                        last_name,
                        email,
                        phone,
                        is_active,
                        createdAt,
                        _id,
                        business_type,
                        business_address,
                        business_description,
                        types_of_fruits,
                        certifications,
                        documents,
                      },
                      index
                    ) => {
                      const isLast = index === currentTableData.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-gray-200";

                      return (
                        <tr key={_id} className="hover:bg-gray-50">
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {business_name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {first_name} {last_name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {email}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {phone}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Chip
                              variant="ghost"
                              size="sm"
                              className="cursor-pointer"
                              onClick={() => handleStatusToggle(_id, is_active)} // pass boolean
                              value={is_active ? "Active" : "Inactive"}
                              color={is_active ? "green" : "blue-gray"}
                            />
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {new Date(createdAt).toLocaleDateString()}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <div className="flex gap-2">
                              <Tooltip content="View Details">
                                <IconButton
                                  onClick={() =>
                                    handleOpenDetails({
                                      _id,
                                      business_name,
                                      first_name,
                                      last_name,
                                      email,
                                      phone,
                                      is_active,
                                      createdAt,
                                      business_type,
                                      business_address,
                                      business_description,
                                      types_of_fruits,
                                      certifications,
                                      documents,
                                    })
                                  }
                                  variant="text"
                                  color="blue"
                                >
                                  <MagnifyingGlassIcon className="h-5 w-5" />
                                </IconButton>
                              </Tooltip>
                              {/* <Tooltip content="Edit Seller">
                                <IconButton
                                  onClick={() =>
                                    handleEditSeller({
                                      _id,
                                      business_name,
                                      first_name,
                                      last_name,
                                      email,
                                      phone,
                                      is_active,
                                    })
                                  }
                                  variant="text"
                                  color="orange"
                                >
                                  <PencilIcon className="h-5 w-5" />
                                </IconButton>
                              </Tooltip> */}
                              <Tooltip content="Delete Seller">
                                <IconButton
                                  onClick={() => handleDeleteSeller(_id)}
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
                    }
                  )}
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
      {openDetailsModal && (
        <SellerDetails seller={detailsSeller} onClose={handleCloseDetails} />
      )}

      {openModal && (
        <Suspense fallback={<LazyLoader />}>
          <AddSeller
            onCancel={handleCloseModal}
            existingSeller={selectedSeller}
          />
        </Suspense>
      )}
    </>
  );
}
