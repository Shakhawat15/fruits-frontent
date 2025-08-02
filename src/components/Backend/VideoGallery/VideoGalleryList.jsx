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
  IconButton,
  Input,
  Switch,
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
import AddVideoGallery from "./AddVideoGallery";

const TABLE_HEAD = [
  "S.No",
  "Title",
  "Image",
  "Create Date",
  "Status",
  "Action",
];

export default function VideoGalleryList() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedVideoGallery, setSelectedVideoGallery] = useState(null);
  const [videoGallery, setVideoGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseURL}/video-galleries/all`,
        AxiosHeader
      );
      setVideoGallery(response.data.data);
    } catch (error) {
      ErrorToast("Failed to fetch Gallery Folder data.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (brand = null) => {
    setSelectedVideoGallery(brand);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedVideoGallery(null);
    fetchBrands();
  };

  const handleEditBrand = (brand) => {
    handleOpenModal(brand);
  };

  const handleDeleteBrand = async (id) => {
    const isDeleted = await DeleteAlert(id, "video-galleries/delete");
    if (isDeleted) {
      setVideoGallery(videoGallery.filter((b) => b._id !== id));
    }
  };

  const handleStatusChange = async (id, status) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `${baseURL}/video-galleries/status/${id}`,
        { status: !status },
        AxiosHeader
      );
      if (response.status === 200) {
        SuccessToast("Brand status updated successfully");
        setVideoGallery(
          videoGallery.map((b) =>
            b._id === id ? { ...b, status: !status } : b
          )
        );
      }
    } catch (error) {
      ErrorToast("Failed to update brand status");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(videoGallery.length / itemsPerPage);
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentTableData = videoGallery.slice(
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
                Video Gallery List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Manage all your video gallery here
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
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Video
                Gallery
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
                      { title, youtube_link, createdAt, status, _id },
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
                              {title}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {youtube_link}
                            </Typography>
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
                            <div className="flex items-center">
                              <Switch
                                checked={status}
                                onChange={() => handleStatusChange(_id, status)}
                                color="green"
                              />
                              <span className="ml-2">
                                {status ? "Active" : "Inactive"}
                              </span>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex gap-2">
                              <Tooltip content="Edit Video Gallery">
                                <IconButton
                                  onClick={() =>
                                    handleEditBrand({
                                      _id,
                                      title,
                                      youtube_link,
                                      createdAt,
                                      status,
                                    })
                                  }
                                  variant="text"
                                  color="orange"
                                >
                                  <PencilIcon className="h-5 w-5" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip content="Delete Video Gallery">
                                <IconButton
                                  onClick={() => handleDeleteBrand(_id)}
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
      {openModal && (
        <Suspense fallback={<LazyLoader />}>
          <AddVideoGallery
            onCancel={handleCloseModal}
            existingVideoGallery={selectedVideoGallery}
          />
        </Suspense>
      )}
    </>
  );
}
