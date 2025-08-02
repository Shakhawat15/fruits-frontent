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
import AddNews from "./AddNews";

const TABLE_HEAD = [
  "S.No",
  "Title",
  "Description",
  "Image",
  "Status",
  "Action",
];

export default function NewsList() {
  const [openModal, setOpenModal] = useState(false);
  const [selecteNews, setSelectedNews] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/news/all`, AxiosHeader);
      setNews(response.data.data);
    } catch (error) {
      ErrorToast("Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (user = null) => {
    setSelectedNews(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedNews(null);
    fetchUsers();
  };

  const handleEditUser = (user) => {
    handleOpenModal(user);
  };

  const handleDeleteUser = async (id) => {
    const isDeleted = await DeleteAlert(id, "news/delete");
    if (isDeleted) {
      setNews(news.filter((user) => user._id !== id));
    }
  };

  const handleStatusToggle = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      const response = await axios.patch(
        `${baseURL}/news/status/${userId}`,
        { status: newStatus },
        AxiosHeader
      );
      if (response.data.success) {
        // Update the status locally
        setNews((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, status: newStatus } : user
          )
        );
        SuccessToast("News status updated successfully");
      } else {
        ErrorToast("Failed to update status");
      }
    } catch (error) {
      ErrorToast("Failed to update status");
    }
  };

  const totalPages = Math.ceil(news.length / itemsPerPage);
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentTableData = news.slice(
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
                News List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all news
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
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add News
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
                        title,
                        description,
                        picture,
                        read_more_link,
                        status,
                        _id,
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
                              {title}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal break-words"
                              style={{ maxWidth: "800px" }} // You can adjust this width as needed
                            >
                              {description}
                            </Typography>
                          </td>

                          <td className={classes}>
                            <img
                              src={picture}
                              alt={title}
                              className="h-16 w-16 rounded-lg object-cover"
                            />
                          </td>
                          <td className={classes}>
                            <div className="w-max">
                              <Chip
                                variant="ghost"
                                size="sm"
                                value={status === 1 ? "Active" : "Inactive"}
                                color={status === 1 ? "green" : "blue-gray"}
                                onClick={() => handleStatusToggle(_id, status)}
                                className="cursor-pointer"
                              />
                            </div>
                          </td>

                          <td className={classes}>
                            <div className="flex gap-2">
                              <Tooltip content="Edit News">
                                <IconButton
                                  onClick={() =>
                                    handleEditUser({
                                      _id,
                                      title,
                                      description,
                                      read_more_link,
                                      picture,
                                      status,
                                    })
                                  }
                                  variant="text"
                                  color="orange"
                                >
                                  <PencilIcon className="h-5 w-5" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip content="Delete News">
                                <IconButton
                                  onClick={() => handleDeleteUser(_id)}
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
      <Suspense fallback={<LazyLoader />}>
        {openModal && (
          <AddNews
            open={openModal}
            onCancel={handleCloseModal}
            existingNews={selecteNews}
          />
        )}
      </Suspense>
    </>
  );
}
