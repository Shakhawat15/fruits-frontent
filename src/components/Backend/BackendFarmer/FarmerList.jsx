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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosHeader, baseURL } from "../../../API/config";
import { DeleteAlert } from "../../../helper/DeleteAlert";
import { ErrorToast } from "../../../helper/FormHelper";
import Loader from "../BackendMasterLayout/Loader";

const TABLE_HEAD = [
  "S.No",
  "Image",
  "Name",
  "Email",
  "Phone",
  "Address",
  "Status",
  "Created At",
  "Action",
];

export default function FarmerList() {
  const navigate = useNavigate();
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const userData = JSON.parse(localStorage.getItem("user"));
  const userRoleId = userData?.role_id;
  const userDistrictId = userData?.district;
  const SUPER_ADMIN_ROLE_ID = "67c8931c14acfa3684d55f09";

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    setLoading(true);
    try {
      let response;
      if (userRoleId === SUPER_ADMIN_ROLE_ID) {
        response = await axios.get(`${baseURL}/farmers/all`, AxiosHeader);
        setFarmers(response.data.data);
      } else {
        response = await axios.get(
          `${baseURL}/farmers/get-by-district/${userDistrictId}`,
          AxiosHeader
        );
      }
      setFarmers(response.data.data);
    } catch (error) {
      ErrorToast("Failed to fetch farmers");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = () => {
    navigate("/add-farmer");
  };

  const handleEditProduct = (farmer) => {
    navigate(`/add-farmer`, { state: { farmer } });
  };

  const handleDeleteProduct = async (id) => {
    const isDelete = await DeleteAlert(id, "farmers/delete");
    if (isDelete) {
      setFarmers(farmers.filter((farmer) => farmer._id !== id));
    }
  };

  const totalPages = Math.ceil(farmers.length / itemsPerPage);
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentTableData = farmers.slice(
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
                Mango Producer List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Manage all your Mango Producer here
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
                onClick={handleCreateProduct}
                className="flex items-center gap-3 bg-[#FFA500] hover:bg-[#FF8C00] text-white"
                size="sm"
              >
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Mango
                Producer
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
                        _id,
                        farmer_name,
                        mobile,
                        email,
                        nid,
                        financial_year,
                        type_of_demonstration,
                        date_of_demonstration,
                        total_area,
                        fyield,
                        production,
                        technology_used,
                        pesticide_details,
                        irrigation_method,
                        source_of_water,
                        other_source_of_water,
                        mango_variety,
                        other_mango_variety,
                        inspection_details,
                        inspection_officer,
                        export_experience,
                        fenced_orchard,
                        fertilizer_recommendation,
                        wearing_ppe,
                        record_book,
                        health_hygiene,
                        labor_shed,
                        remarks,
                        farmer_picture,
                        garden_picture,
                        google_map_coordinate,
                        latitude,
                        longitude,
                        exported_country,
                        upazila_agriculture_office,
                        farm_name,
                        district,
                        address,
                        status,
                        createdAt,
                      },
                      index
                    ) => {
                      const isLast = index === currentTableData.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-gray-200";
                      const serialNumber =
                        (currentPage - 1) * itemsPerPage + index + 1;

                      return (
                        <tr key={_id}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {serialNumber}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <img
                              src={farmer_picture}
                              alt={farmer_name}
                              className="h-16 w-16 rounded-lg object-cover"
                            />
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {farmer_name}
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
                              {mobile}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {address}
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
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={status ? "Active" : "Inactive"}
                              color={status ? "green" : "blue-gray"}
                            />
                          </td>
                          <td className={classes}>
                            <div className="flex gap-2">
                              <Tooltip content="Edit Mango Producer">
                                <IconButton
                                  onClick={() =>
                                    handleEditProduct({
                                      _id,
                                      farmer_name,
                                      mobile,
                                      email,
                                      nid,
                                      financial_year,
                                      type_of_demonstration,
                                      date_of_demonstration,
                                      total_area,
                                      fyield,
                                      production,
                                      technology_used,
                                      pesticide_details,
                                      irrigation_method,
                                      source_of_water,
                                      other_source_of_water,
                                      mango_variety,
                                      other_mango_variety,
                                      inspection_details,
                                      inspection_officer,
                                      export_experience,
                                      fenced_orchard,
                                      fertilizer_recommendation,
                                      wearing_ppe,
                                      record_book,
                                      health_hygiene,
                                      labor_shed,
                                      remarks,
                                      farmer_picture,
                                      garden_picture,
                                      google_map_coordinate,
                                      latitude,
                                      longitude,
                                      exported_country,
                                      upazila_agriculture_office,
                                      farm_name,
                                      district,
                                      address,
                                      status,
                                    })
                                  }
                                  variant="text"
                                  color="orange"
                                >
                                  <PencilIcon className="h-5 w-5" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip content="Delete Mango Producer">
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
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
