import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css"; // Import the Quill styles
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosHeader, baseURL } from "../../../API/config";
import { ErrorToast, IsEmpty, SuccessToast } from "../../../helper/FormHelper";
import { getToken } from "../../../helper/SessionHelper";
import { validateInput } from "../../../helper/RestictNonEnglish";

export default function FarmerForm() {
  const location = useLocation();
  const existingFarmer = location.state?.farmer;
  console.log("existingFarmer", existingFarmer);
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user"));
  const userRoleId = userData?.role_id;
  const userDistrictId = userData?.district;
  const SUPER_ADMIN_ROLE_ID = "67c8931c14acfa3684d55f09";

  const [districts, setDistricts] = useState([]);
  const [demonstrationTypes, setDemonstrationTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [upazilaOffices, setUpazilaOffices] = useState([]);
  const [selectedUpazilaOffice, setSelectedUpazilaOffice] = useState(
    existingFarmer?.upazila_agriculture_office?._id || ""
  );

  const [demonstrationType, setDemonstrationType] = useState(
    existingFarmer?.type_of_demonstration?._id || ""
  );
  const [district, setDistrict] = useState(existingFarmer?.district?._id || "");
  const [farmerName, setFarmerName] = useState(
    existingFarmer?.farmer_name || ""
  );
  const [mobile, setMobile] = useState(existingFarmer?.mobile || "");
  const [email, setEmail] = useState(existingFarmer?.email || "");
  const [nid, setNid] = useState(existingFarmer?.nid || "");
  const [financialYear, setFinancialYear] = useState(
    existingFarmer?.financial_year || ""
  );
  const [dateOfDemonstration, setDateOfDemonstration] = useState(
    existingFarmer?.date_of_demonstration
      ? existingFarmer.date_of_demonstration.split("T")[0] // Extract YYYY-MM-DD
      : ""
  );
  const [totalArea, setTotalArea] = useState(existingFarmer?.total_area || "");
  const [fyield, setFyield] = useState(existingFarmer?.fyield || "");
  const [production, setProduction] = useState(
    existingFarmer?.production || ""
  );
  const [technologyUsed, setTechnologyUsed] = useState(
    existingFarmer?.technology_used || ""
  );
  const [exportExperience, setExportExperience] = useState(
    existingFarmer?.export_experience || "No"
  );
  // const [fencedOrchard, setFencedOrchard] = useState(
  //   existingFarmer?.fenced_orchard || "No"
  // );
  const [wearingPpe, setWearingPpe] = useState(
    existingFarmer?.wearing_ppe || "No"
  );
  const [healthHygiene, setHealthHygiene] = useState(
    existingFarmer?.health_hygiene || "No"
  );
  const [laborShed, setLaborShed] = useState(
    existingFarmer?.labor_shed || "No"
  );
  const [inspectionDetails, setInspectionDetails] = useState(
    existingFarmer?.inspection_details || ""
  );
  const [remarks, setRemarks] = useState(existingFarmer?.remarks || "");
  const [googleMapCoordinates, setGoogleMapCoordinates] = useState(
    existingFarmer?.google_map_coordinate || ""
  );
  const [latitude, setLatitude] = useState(existingFarmer?.latitude || "");
  const [longitude, setLongitude] = useState(existingFarmer?.longitude || "");
  const [exportedCountry, setExportedCountry] = useState(
    existingFarmer?.exported_country?._id || ""
  );
  const [farmName, setFarmName] = useState(existingFarmer?.farm_name || "");
  const [address, setAddress] = useState(existingFarmer?.address || "");
  const [farmerPicture, setFarmerPicture] = useState(
    existingFarmer?.farmer_picture || null
  );
  const [gardenPicture, setGardenPicture] = useState(
    existingFarmer?.garden_picture || null
  );
  const [recordBook, setRecordBook] = useState(
    existingFarmer?.record_book || null
  );

  const mangoVarieties = [
    "Banana Mango",
    "BARI Aam-12 (Gourmoti)",
    "BARI Aam-2 (Laxmibhog)",
    "BARI Aam-3 (Amropali)",
    "BARI Aam-4",
    "Fazli",
    "Gopalbhog",
    "Harivanga",
    "Himsagor",
    "Langra",
  ];

  const [selectedVarieties, setSelectedVarieties] = useState(
    existingFarmer?.mango_variety || []
  );
  const [otherVariety, setOtherVariety] = useState(
    existingFarmer?.other_mango_variety || ""
  );

  // Effect to synchronize mangoVariety with the selectedVarieties
  useEffect(() => {
    if (otherVariety) {
      setSelectedVarieties((prevState) => [
        ...prevState.filter((variety) => variety !== "Other"),
        "Other",
      ]);
    }
  }, [otherVariety]);

  const handleCheckboxChange = (variety) => {
    let updatedSelection;
    if (variety === "Other" && otherVariety) {
      updatedSelection = [
        ...selectedVarieties.filter((item) => item !== "Other"),
        "Other",
      ];
    } else {
      if (selectedVarieties.includes(variety)) {
        updatedSelection = selectedVarieties.filter((item) => item !== variety);
      } else {
        updatedSelection = [...selectedVarieties, variety];
      }
    }
    setSelectedVarieties(updatedSelection);
  };

  // Pesticide Details Start
  const pesticidesList = [
    "Abamectin",
    "Carbendazim",
    "Carbaryl",
    "Chlorpyrifos",
    "Cypermethrin",
    "Deltamethrin",
    "Dimethoate",
    "Fenvalerate",
    "Hexaconazole",
    "Imidacloprid",
    "Lambda Cyhalothrin",
    "Malathion",
    "Mancozeb",
    "Propiconazole",
    "Profenofos",
    "Sulphur",
    "Tebuconazole",
    "Tricyclazole",
  ];

  const [selectedPesticides, setSelectedPesticides] = useState(
    existingFarmer?.pesticide_details
      ? Object.keys(existingFarmer.pesticide_details)
      : []
  );

  const [pesticideQuantities, setPesticideQuantities] = useState(
    existingFarmer?.pesticide_details || {}
  );
  const [searchTerm, setSearchTerm] = useState("");

  // Filter pesticides based on the search term
  const filteredPesticides = pesticidesList.filter((pesticide) =>
    pesticide.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle checkbox change
  const handleCheckboxChangeP = (pesticide) => {
    let updatedSelection;
    if (selectedPesticides.includes(pesticide)) {
      updatedSelection = selectedPesticides.filter(
        (item) => item !== pesticide
      );
    } else {
      updatedSelection = [...selectedPesticides, pesticide];
    }
    setSelectedPesticides(updatedSelection);
  };

  // Handle quantity change for each selected pesticide
  const handleQuantityChange = (pesticide, quantity) => {
    setPesticideQuantities((prev) => ({
      ...prev,
      [pesticide]: quantity,
    }));
  };

  const [selectedIrrigationMethod, setSelectedIrrigationMethod] = useState(
    existingFarmer?.irrigation_method || ""
  );
  const [selectedWaterSources, setSelectedWaterSources] = useState(
    existingFarmer?.source_of_water || []
  );
  const [otherWaterSource, setOtherWaterSource] = useState(
    existingFarmer?.other_source_of_water || ""
  );

  const handleWaterSourceChange = (source) => {
    if (selectedWaterSources.includes(source)) {
      setSelectedWaterSources(
        selectedWaterSources.filter((item) => item !== source)
      );
    } else {
      setSelectedWaterSources([...selectedWaterSources, source]);
    }
  };
  // Pesticide Details End

  // Fartiilizer Details Start
  const fertilizerList = [
    "Boric Acid",
    "Compost",
    "Chelated Iron",
    "DAP",
    "Gypsum",
    "Magnesium Sulphate",
    "MoP",
    "Oil cake",
    "Rotten Cow dung",
    "Trichoderma",
    "Urea",
    "Vermicompost",
    "Zinc Sulphate",
  ];

  const [selectedFertilizers, setSelectedFertilizers] = useState(
    existingFarmer?.fertilizer_recommendation
      ? Object.keys(existingFarmer.fertilizer_recommendation)
      : []
  );
  const [fertilizerQuantities, setFertilizerQuantities] = useState(
    existingFarmer?.fertilizer_recommendation || {}
  );
  const [fertilizerSearchTerm, setFertilizerSearchTerm] = useState("");

  // Filter fertilizers based on search term
  const filteredFertilizers = fertilizerList.filter((fertilizer) =>
    fertilizer.toLowerCase().includes(fertilizerSearchTerm.toLowerCase())
  );

  // Handle checkbox change
  const handleCheckboxChangeFertilizer = (fertilizer) => {
    let updatedSelection;
    if (selectedFertilizers.includes(fertilizer)) {
      updatedSelection = selectedFertilizers.filter(
        (item) => item !== fertilizer
      );
    } else {
      updatedSelection = [...selectedFertilizers, fertilizer];
    }
    setSelectedFertilizers(updatedSelection);
  };

  // Handle quantity change for each selected fertilizer
  const handleQuantityChangeFertilizer = (fertilizer, quantity) => {
    setFertilizerQuantities((prev) => ({
      ...prev,
      [fertilizer]: quantity,
    }));
  };
  // Fertilizer Details End

  // Inspection Officer start
  const officerList = [
    "Additional Agriculture Officer",
    "Additional Deputy Director",
    "Agriculture Extension Officer",
    "Deputy Director",
    "District Training Officer",
    "Upazila Agriculture Officer",
  ];

  const [selectedOfficers, setSelectedOfficers] = useState(
    existingFarmer?.inspection_officer || []
  );

  // Handle checkbox change for inspection officers
  const handleOfficerCheckboxChange = (officer) => {
    let updatedSelection;
    if (selectedOfficers.includes(officer)) {
      updatedSelection = selectedOfficers.filter((item) => item !== officer);
    } else {
      updatedSelection = [...selectedOfficers, officer];
    }
    setSelectedOfficers(updatedSelection);
  };
  // Inspection Officer end

  const navigate = useNavigate();

  useEffect(() => {
    if (district) {
      fetchUpazilaAgricultureOffices();
    } else {
      setUpazilaOffices([]);
    }
  }, [district]);

  useEffect(() => {
    fetchDistricts();
    fetchDemonstrationTypes();
    fetchCountries();
  }, []);

  const fetchDemonstrationTypes = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/demonstration-types/all`,
        AxiosHeader
      );
      setDemonstrationTypes(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDistricts = async () => {
    try {
      const response = await axios.get(`${baseURL}/districts/all`, AxiosHeader);
      let districtData = response.data.data;

      // If the user is not a super admin, filter to only their district
      if (userRoleId !== SUPER_ADMIN_ROLE_ID) {
        districtData = districtData.filter(
          (district) => district._id === userDistrictId
        );
      }
      setDistricts(districtData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${baseURL}/countries/all`, AxiosHeader);
      setCountries(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUpazilaAgricultureOffices = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/upazila-agriculture-offices/get-by-upazila/${district}`,
        AxiosHeader
      );
      setUpazilaOffices(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [isfarmerNameEmpty, setIsfarmerNameEmpty] = useState(false);
  const [isMobileEmpty, setIsMobileEmpty] = useState(false);
  const [isNidEmpty, setIsNidEmpty] = useState(false);
  const [isFinancialYearEmpty, setIsFinancialYearEmpty] = useState(false);
  const [isDemonstrationTypeEmpty, setIsDemonstrationTypeEmpty] =
    useState(false);
  const [isDateOfDemonstrationEmpty, setIsDateOfDemonstrationEmpty] =
    useState(false);
  const [isTotalAreaEmpty, setIsTotalAreaEmpty] = useState(false);
  const [isFyieldEmpty, setIsFyieldEmpty] = useState(false);
  const [isProductionEmpty, setIsProductionEmpty] = useState(false);
  const [isTechnologyUsedEmpty, setIsTechnologyUsedEmpty] = useState(false);
  const [isSelectedVarietiesEmpty, setIsSelectedVarietiesEmpty] =
    useState(false);
  const [isSelectedPesticidesEmpty, setIsSelectedPesticidesEmpty] =
    useState(false);
  const [isSelectedIrrigationMethodEmpty, setIsSelectedIrrigationMethodEmpty] =
    useState(false);
  const [isSelectedWaterSourcesEmpty, setIsSelectedWaterSourcesEmpty] =
    useState(false);
  const [isSelectedOfficersEmpty, setIsSelectedOfficersEmpty] = useState(false);
  const [isGoogleMapCoordinatesEmpty, setIsGoogleMapCoordinatesEmpty] =
    useState(false);
  const [isLatitudeEmpty, setIsLatitudeEmpty] = useState(false);
  const [isLongitudeEmpty, setIsLongitudeEmpty] = useState(false);
  const [isExportedCountryEmpty, setIsExportedCountryEmpty] = useState(false);
  const [isSelectedUpazilaOfficeEmpty, setIsSelectedUpazilaOfficeEmpty] =
    useState(false);
  const [isFarmNameEmpty, setIsFarmNameEmpty] = useState(false);
  const [isDistrictEmpty, setIsDistrictEmpty] = useState(false);
  const [isAddressEmpty, setIsAddressEmpty] = useState(false);
  const [isSelectedFertilizersEmpty, setIsSelectedFertilizersEmpty] =
    useState(false);
  const [isFarmerPictureEmpty, setIsFarmerPictureEmpty] = useState(false);
  const [isGardenPictureEmpty, setIsGardenPictureEmpty] = useState(false);
  const [isRecordBookEmpty, setIsRecordBookEmpty] = useState(false);

  const handleSubmit = async () => {
    if (
      IsEmpty(farmerName) ||
      IsEmpty(mobile) ||
      IsEmpty(nid) ||
      IsEmpty(financialYear) ||
      IsEmpty(demonstrationType) ||
      IsEmpty(dateOfDemonstration) ||
      IsEmpty(totalArea) ||
      IsEmpty(fyield) ||
      IsEmpty(production) ||
      IsEmpty(technologyUsed) ||
      IsEmpty(selectedVarieties) ||
      IsEmpty(selectedPesticides) ||
      IsEmpty(selectedIrrigationMethod) ||
      IsEmpty(selectedWaterSources) ||
      IsEmpty(selectedOfficers) ||
      IsEmpty(googleMapCoordinates) ||
      IsEmpty(latitude) ||
      IsEmpty(longitude) ||
      IsEmpty(exportedCountry) ||
      IsEmpty(selectedUpazilaOffice) ||
      IsEmpty(farmName) ||
      IsEmpty(district) ||
      IsEmpty(address) ||
      !farmerPicture ||
      !gardenPicture ||
      !recordBook
    ) {
      if (IsEmpty(farmerName)) setIsfarmerNameEmpty(true);
      if (IsEmpty(mobile)) setIsMobileEmpty(true);
      if (IsEmpty(nid)) setIsNidEmpty(true);
      if (IsEmpty(financialYear)) setIsFinancialYearEmpty(true);
      if (IsEmpty(demonstrationType)) setIsDemonstrationTypeEmpty(true);
      if (IsEmpty(dateOfDemonstration)) setIsDateOfDemonstrationEmpty(true);
      if (IsEmpty(totalArea)) setIsTotalAreaEmpty(true);
      if (IsEmpty(fyield)) setIsFyieldEmpty(true);
      if (IsEmpty(production)) setIsProductionEmpty(true);
      if (IsEmpty(technologyUsed)) setIsTechnologyUsedEmpty(true);
      if (IsEmpty(selectedVarieties)) setIsSelectedVarietiesEmpty(true);
      if (IsEmpty(selectedPesticides)) setIsSelectedPesticidesEmpty(true);
      if (IsEmpty(selectedIrrigationMethod))
        setIsSelectedIrrigationMethodEmpty(true);
      if (IsEmpty(selectedWaterSources)) setIsSelectedWaterSourcesEmpty(true);
      if (IsEmpty(selectedOfficers)) setIsSelectedOfficersEmpty(true);
      if (IsEmpty(googleMapCoordinates)) setIsGoogleMapCoordinatesEmpty(true);
      if (IsEmpty(latitude)) setIsLatitudeEmpty(true);
      if (IsEmpty(longitude)) setIsLongitudeEmpty(true);
      if (exportExperience == "Yes" && IsEmpty(exportedCountry))
        setIsExportedCountryEmpty(true);
      if (IsEmpty(selectedUpazilaOffice)) setIsSelectedUpazilaOfficeEmpty(true);
      if (IsEmpty(farmName)) setIsFarmNameEmpty(true);
      if (IsEmpty(district)) setIsDistrictEmpty(true);
      if (IsEmpty(address)) setIsAddressEmpty(true);
      if (IsEmpty(selectedFertilizers)) setIsSelectedFertilizersEmpty(true);
      if (!farmerPicture) setIsFarmerPictureEmpty(true);
      if (!gardenPicture) setIsGardenPictureEmpty(true);
      if (!recordBook) setIsRecordBookEmpty(true);
    } else {
      const formData = new FormData();
      formData.append("farmer_name", farmerName);
      formData.append("mobile", mobile);
      formData.append("email", email);
      formData.append("nid", nid);
      formData.append("financial_year", financialYear);
      formData.append("type_of_demonstration", demonstrationType);
      formData.append("date_of_demonstration", dateOfDemonstration);
      formData.append("total_area", totalArea);
      formData.append("fyield", fyield);
      formData.append("production", production);
      formData.append("technology_used", technologyUsed);
      formData.append("mango_variety", JSON.stringify(selectedVarieties));
      formData.append("other_mango_variety", otherVariety);
      formData.append("pesticide_details", JSON.stringify(pesticideQuantities));
      formData.append("irrigation_method", selectedIrrigationMethod);
      formData.append("source_of_water", JSON.stringify(selectedWaterSources));
      formData.append("other_source_of_water", otherWaterSource);
      formData.append("export_experience", exportExperience);
      // formData.append("fenced_orchard", fencedOrchard);
      formData.append("wearing_ppe", wearingPpe);
      formData.append("health_hygiene", healthHygiene);
      formData.append("labor_shed", laborShed);
      formData.append("inspection_details", inspectionDetails);
      formData.append("inspection_officer", JSON.stringify(selectedOfficers));
      formData.append("remarks", remarks);
      // formData.append("google_maplink", googleMapLink);
      formData.append("google_map_coordinate", googleMapCoordinates);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("exported_country", exportedCountry);
      formData.append("upazila_agriculture_office", selectedUpazilaOffice);
      formData.append("farm_name", farmName);
      formData.append("district", district);
      formData.append("address", address);
      formData.append(
        "fertilizer_recommendation",
        JSON.stringify(fertilizerQuantities)
      );
      if (farmerPicture) formData.append("farmer_picture", farmerPicture);
      if (gardenPicture) formData.append("garden_picture", gardenPicture);
      if (recordBook) formData.append("record_book", recordBook);

      try {
        setLoading(true);
        let response;
        if (existingFarmer) {
          response = await axios.put(
            `${baseURL}/farmers/update/${existingFarmer._id}`,
            formData,
            AxiosHeader
          );
        } else {
          response = await axios.post(`${baseURL}/farmers/create`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: getToken(),
            },
          });
        }
        setLoading(false);
        if (response && response.data.message) {
          SuccessToast(response.data.message); // Assuming the backend sends a success message in the response
        }
        navigate("/farmers");
      } catch (error) {
        console.error(error);
        setLoading(false);
        console.error(error);

        ErrorToast(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  const getYears = () => {
    const startYear = 2022;
    const endYear = 2030;
    const years = [];

    for (let year = startYear; year < endYear; year++) {
      years.push(`${year}-${(year + 1).toString().slice(-2)}`);
    }

    return years;
  };

  const handleImageChange = (e, setState, setErrorState) => {
    const file = e.target.files[0];
    if (file) {
      setState(file);
      setErrorState(false); // Clear error when a file is selected
    }
  };

  return (
    <Card className="bg-white shadow-lg rounded-lg">
      <CardBody className="p-6">
        <Typography variant="h5" color="blue-gray" className="mb-4">
          {existingFarmer ? "Edit Mango Producer" : "Add Mango Producer"}
        </Typography>
        <Typography color="gray" className="mb-6">
          {existingFarmer
            ? "Update the mango producer details"
            : "Fill in the details to add a new Mango Producer"}
        </Typography>
        {/* Input fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="farmName"
            >
              Farm Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={farmName}
              onChange={(e) => {
                if (validateInput(e.target.value, "alphanumeric")) {
                  setFarmName(e.target.value);
                  setIsFarmNameEmpty(false);
                }
              }}
              placeholder="Farm Name"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isFarmNameEmpty ? "border-red-500" : ""
              }`}
            />
            {isFarmNameEmpty && (
              <p className="mt-1 text-xs text-red-600">Farm Name is required</p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="farmerName"
            >
              Mango Producer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={farmerName}
              onChange={(e) => {
                if (validateInput(e.target.value, "text")) {
                  setFarmerName(e.target.value);
                  setIsfarmerNameEmpty(false);
                }
              }}
              placeholder="Mango Producer Name"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isfarmerNameEmpty ? "border-red-500" : ""
              }`}
            />
            {isfarmerNameEmpty && (
              <p className="mt-1 text-xs text-red-600">
                Farmer Name is required
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="mobile"
            >
              Mobile <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => {
                if (validateInput(e.target.value, "number")) {
                  setMobile(e.target.value);
                  setIsMobileEmpty(false);
                }
              }}
              placeholder="Mobile"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isMobileEmpty ? "border-red-500" : ""
              }`}
            />
            {isMobileEmpty && (
              <p className="mt-1 text-xs text-red-600">Mobile is required</p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                if (validateInput(e.target.value, "email")) {
                  setEmail(e.target.value);
                }
              }}
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="nid"
            >
              NID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={nid}
              onChange={(e) => {
                if (validateInput(e.target.value, "number")) {
                  setNid(e.target.value);
                  setIsNidEmpty(false);
                }
              }}
              placeholder="NID"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isNidEmpty ? "border-red-500" : ""
              }`}
            />
            {isNidEmpty && (
              <p className="mt-1 text-xs text-red-600">NID is required</p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="financialYear"
            >
              Financial Year <span className="text-red-500">*</span>
            </label>
            <select
              value={financialYear}
              onChange={(e) => {
                setFinancialYear(e.target.value);
                setIsFinancialYearEmpty(false);
              }}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isFinancialYearEmpty ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Year</option>
              {getYears().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {isFinancialYearEmpty && (
              <p className="mt-1 text-xs text-red-600">
                Financial Year is required
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="demonstrationType"
            >
              Type of Demonstration <span className="text-red-500">*</span>
            </label>
            <select
              value={demonstrationType}
              onChange={(e) => {
                setDemonstrationType(e.target.value || null);
                setIsDemonstrationTypeEmpty(false);
              }}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isDemonstrationTypeEmpty ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Demonstration Type</option>
              {demonstrationTypes.map((dis) => (
                <option key={dis._id} value={dis._id}>
                  {dis.title}
                </option>
              ))}
            </select>
            {isDemonstrationTypeEmpty && (
              <p className="mt-1 text-xs text-red-600">
                Type of Demonstration is required
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="dateOfDemonstration"
            >
              Date of Demonstration <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={dateOfDemonstration}
              onChange={(e) => {
                setDateOfDemonstration(e.target.value);
                setIsDateOfDemonstrationEmpty(false);
              }}
              placeholder="Date of Demonstration"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isDateOfDemonstrationEmpty ? "border-red-500" : ""
              }`}
            />
            {isDateOfDemonstrationEmpty && (
              <p className="mt-1 text-xs text-red-600">
                Date of Demonstration is required
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="totalArea"
            >
              Total Area (Decimal) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={totalArea}
              onChange={(e) => {
                if (validateInput(e.target.value, "number")) {
                  setTotalArea(e.target.value);
                  setIsTotalAreaEmpty(false);
                }
              }}
              placeholder="Total Area"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isTotalAreaEmpty ? "border-red-500" : ""
              }`}
            />
            {isTotalAreaEmpty && (
              <p className="mt-1 text-xs text-red-600">
                Total Area is required
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="fyield"
            >
              Yield (KG/Decimal) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={fyield}
              onChange={(e) => {
                if (validateInput(e.target.value, "number")) {
                  setFyield(e.target.value);
                  setIsFyieldEmpty(false);
                }
              }}
              placeholder="Yield"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isFyieldEmpty ? "border-red-500" : ""
              }`}
            />
            {isFyieldEmpty && (
              <p className="mt-1 text-xs text-red-600">Yield is required</p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="production"
            >
              Production (Metric Ton) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={production}
              onChange={(e) => {
                if (validateInput(e.target.value, "number")) {
                  setProduction(e.target.value);
                  setIsProductionEmpty(false);
                }
              }}
              placeholder="Production"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isProductionEmpty ? "border-red-500" : ""
              }`}
            />
            {isProductionEmpty && (
              <p className="mt-1 text-xs text-red-600">
                Production is required
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="technologyUsed"
            >
              Technology Used <span className="text-red-500">*</span>
            </label>
            <select
              value={technologyUsed}
              onChange={(e) => {
                setTechnologyUsed(e.target.value);
                setIsTechnologyUsedEmpty(false);
              }}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isTechnologyUsedEmpty ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Technology Used</option>
              <option value="1">GAP Certified</option>
              <option value="2">GAP Followed</option>
            </select>
            {isTechnologyUsedEmpty && (
              <p className="mt-1 text-xs text-red-600">
                Technology Used is required
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="district"
            >
              District <span className="text-red-500">*</span>
            </label>
            <select
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                setIsDistrictEmpty(false);
              }}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isDistrictEmpty ? "border-red-500" : ""
              }`}
            >
              <option value="">Select District</option>
              {districts.map((dis) => (
                <option key={dis._id} value={dis._id}>
                  {dis.name}
                </option>
              ))}
            </select>
            {isDistrictEmpty && (
              <p className="mt-1 text-xs text-red-600">District is required</p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="upazilaKrishiOffice"
            >
              Upazila Agriculture Office <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedUpazilaOffice}
              onChange={(e) => {
                setSelectedUpazilaOffice(e.target.value);
                setIsSelectedUpazilaOfficeEmpty(false);
              }}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isSelectedUpazilaOfficeEmpty ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Upazila Agriculture Office</option>
              {upazilaOffices.map((office) => (
                <option key={office._id} value={office._id}>
                  {office.name}
                </option>
              ))}
            </select>
            {isSelectedUpazilaOfficeEmpty && (
              <p className="mt-1 text-xs text-red-600">
                Upazila Agriculture Office is required
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="exportExperience"
            >
              Export Experience <span className="text-red-500">*</span>
            </label>
            <select
              value={exportExperience}
              onChange={(e) => setExportExperience(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="exportedCountry"
            >
              Exported Country <span className="text-red-500">*</span>
            </label>
            <select
              value={exportedCountry}
              disabled={exportExperience === "No"}
              onChange={(e) => {
                setExportedCountry(e.target.value);
                setIsExportedCountryEmpty(false);
              }}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isExportedCountryEmpty ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Country</option>
              {countries.map((dis) => (
                <option key={dis._id} value={dis._id}>
                  {dis.name}
                </option>
              ))}
            </select>
            {isExportedCountryEmpty && (
              <p className="mt-1 text-xs text-red-600">
                Exported Country is required
              </p>
            )}
          </div>
          {/* <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="fencedOrchard"
            >
              Fenced Orchard
            </label>
            <select
              value={fencedOrchard}
              onChange={(e) => setFencedOrchard(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div> */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="wearingPpe"
            >
              Wearing PPE <span className="text-red-500">*</span>
            </label>
            <select
              value={wearingPpe}
              onChange={(e) => setWearingPpe(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="healthHygiene"
            >
              Health Hygiene <span className="text-red-500">*</span>
            </label>
            <select
              value={healthHygiene}
              onChange={(e) => setHealthHygiene(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="laborShed"
            >
              labour Shed <span className="text-red-500">*</span>
            </label>
            <select
              value={laborShed}
              onChange={(e) => setLaborShed(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="remarks"
            >
              Remarks
            </label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => {
                if (validateInput(e.target.value, "alphanumeric")) {
                  setRemarks(e.target.value);
                }
              }}
              placeholder="Remarks"
              pattern="[A-Za-z]+"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="googleMapCoordinates"
            >
              Google Map Link <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={googleMapCoordinates}
              onChange={(e) => {
                if (validateInput(e.target.value, "url")) {
                  setGoogleMapCoordinates(e.target.value);
                  setIsGoogleMapCoordinatesEmpty(false);
                }
              }}
              placeholder="Google Map Link"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isGoogleMapCoordinatesEmpty ? "border-red-500" : ""
              }`}
            />
            {isGoogleMapCoordinatesEmpty && (
              <p className="mt-1 text-xs text-red-600">
                Google Map Link is required
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="latitude"
            >
              Latitude <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={latitude}
              onChange={(e) => {
                if (validateInput(e.target.value, "coordinates")) {
                  setLatitude(e.target.value);
                  setIsLatitudeEmpty(false);
                }
              }}
              placeholder="Latitude"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isLatitudeEmpty ? "border-red-500" : ""
              }`}
            />
            {isLatitudeEmpty && (
              <p className="mt-1 text-xs text-red-600">Latitude is required</p>
            )}
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="longitude"
            >
              Longitude <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={longitude}
              onChange={(e) => {
                if (validateInput(e.target.value, "coordinates")) {
                  setLongitude(e.target.value);
                  setIsLongitudeEmpty(false);
                }
              }}
              placeholder="Longitude"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isLongitudeEmpty ? "border-red-500" : ""
              }`}
            />
            {isLongitudeEmpty && (
              <p className="mt-1 text-xs text-red-600">Longitude is required</p>
            )}
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="address"
            >
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => {
                if (validateInput(e.target.value, "alphanumeric")) {
                  setAddress(e.target.value);
                  setIsAddressEmpty(false);
                }
              }}
              placeholder="Village, Union, Post Office"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isAddressEmpty ? "border-red-500" : ""
              }`}
            />
            {isAddressEmpty && (
              <p className="mt-1 text-xs text-red-600">Address is required</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="w-full">
            <label className="block text-gray-700 font-medium mb-2">
              Source of Water <span className="text-red-500">*</span>
            </label>
            <div
              className={`border border-gray-300 p-3 rounded-md shadow-sm bg-white ${
                isSelectedWaterSourcesEmpty ? "border-red-500" : ""
              }`}
            >
              {[
                "Canal",
                "Deep Tube-well",
                "Draw-well",
                "Pond",
                "Rainfall",
                "River",
                "Tube-well",
              ].map((source) => (
                <label key={source} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={selectedWaterSources.includes(source)}
                    onChange={() => {
                      handleWaterSourceChange(source);
                      setIsSelectedWaterSourcesEmpty(false);
                    }}
                    className="form-checkbox h-4 w-4 text-indigo-600"
                  />
                  {source}
                </label>
              ))}

              {/* "Other" Option */}
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={selectedWaterSources.includes("Other")}
                  onChange={() => handleWaterSourceChange("Other")}
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                Other
              </label>

              {/* Show Input Field for "Other" Selection */}
              {selectedWaterSources.includes("Other") && (
                <input
                  type="text"
                  value={otherWaterSource}
                  onChange={(e) => {
                    if (validateInput(e.target.value, "alphanumeric")) {
                      setOtherWaterSource(e.target.value);
                    }
                  }}
                  placeholder="Specify Other Source"
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
            </div>
            {isSelectedWaterSourcesEmpty && (
              <p className="mt-1 text-xs text-red-600">
                Source of Water is required
              </p>
            )}
            <div className="mt-2">
              {/* Irrigation Method Dropdown */}
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="irrigationMethod"
              >
                Irrigation Method <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedIrrigationMethod}
                onChange={(e) => {
                  setSelectedIrrigationMethod(e.target.value);
                  setIsSelectedIrrigationMethodEmpty(false);
                }}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  isSelectedIrrigationMethodEmpty ? "border-red-500" : ""
                }`}
              >
                <option value="">Select Irrigation Method</option>
                <option value="Drip">Drip Irrigation</option>
                <option value="Furrow">Furrow Method</option>
                <option value="Ring">Ring Method</option>
                <option value="Surface">Surface Irrigation</option>
                <option value="Sprinkler">Sprinkler Irrigation</option>
              </select>
              {isSelectedIrrigationMethodEmpty && (
                <p className="mt-1 text-xs text-red-600">
                  Irrigation Method is required
                </p>
              )}
            </div>
          </div>
          <div className="w-full">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="mangoVariety"
            >
              Mango Variety <span className="text-red-500">*</span>
            </label>
            <div
              className={`border border-gray-300 p-3 rounded-md shadow-sm bg-white ${
                isSelectedVarietiesEmpty ? "border-red-500" : ""
              }`}
            >
              {mangoVarieties.map((variety, index) => (
                <label key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    value={variety}
                    checked={selectedVarieties.includes(variety)}
                    onChange={() => {
                      handleCheckboxChange(variety);
                      setIsSelectedVarietiesEmpty(false);
                    }}
                    className="form-checkbox h-4 w-4 text-indigo-600"
                  />
                  {variety}
                </label>
              ))}

              {/* Other option */}
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={selectedVarieties.includes("Other")}
                  onChange={() => handleCheckboxChange("Other")}
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                Other
              </label>

              {/* Show input field when "Other" is selected */}
              {selectedVarieties.includes("Other") && (
                <input
                  type="text"
                  value={otherVariety}
                  onChange={(e) => {
                    if (validateInput(e.target.value, "alphanumeric")) {
                      setOtherVariety(e.target.value);
                    }
                  }}
                  placeholder="Enter custom variety"
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
            </div>
            {isSelectedVarietiesEmpty && (
              <p className="mt-1 text-xs text-red-600">
                Mango Variety is required
              </p>
            )}
          </div>
          <div className="w-full">
            <label className="block text-gray-700 font-medium mb-2">
              Inspection Officer <span className="text-red-500">*</span>
            </label>
            <div
              className={`border border-gray-300 p-3 rounded-md shadow-sm bg-white ${
                isSelectedOfficersEmpty ? "border-red-500" : ""
              }`}
            >
              {officerList.map((officer, index) => (
                <label key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={selectedOfficers.includes(officer)}
                    onChange={() => {
                      handleOfficerCheckboxChange(officer);
                      setIsSelectedOfficersEmpty(false);
                    }}
                    className="form-checkbox h-4 w-4 text-indigo-600"
                  />
                  {officer}
                </label>
              ))}
            </div>
            {isSelectedOfficersEmpty && (
              <p className="mt-1 text-xs text-red-600">
                Inspection Officer is required
              </p>
            )}
            <div className="mt-2">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="inspectionDetails"
              >
                Inspection Details
              </label>
              <input
                type="text"
                value={inspectionDetails}
                onChange={(e) => {
                  if (validateInput(e.target.value, "alphanumeric")) {
                    setInspectionDetails(e.target.value);
                  }
                }}
                placeholder="Inspection Details"
                pattern="[A-Za-z]+"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
        {/* Pesticide Details */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 mt-4">
            Pesticide Details (gm/ml/L of water){" "}
            <span className="text-red-500">*</span>
          </label>

          {/* Grid Wrapper */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {/* Search Input - Spanning Full Width */}
            <div className="sm:col-span-2 md:col-span-3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search pesticide..."
                className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out"
              />
            </div>

            {/* Pesticide checkboxes and quantity inputs */}
            {filteredPesticides.map((pesticide, index) => (
              <div
                key={index}
                className={`flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out ${
                  isSelectedPesticidesEmpty ? "border-red-500" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedPesticides.includes(pesticide)}
                  onChange={() => {
                    handleCheckboxChangeP(pesticide);
                    setIsSelectedPesticidesEmpty(false);
                  }}
                  className="form-checkbox h-5 w-5 text-indigo-600 transition duration-200 ease-in-out"
                />
                <span className="text-lg text-gray-800 font-medium">
                  {pesticide}
                </span>

                {/* Show quantity input initially but disabled */}
                <input
                  type="number"
                  value={pesticideQuantities[pesticide] || ""}
                  onChange={(e) =>
                    handleQuantityChange(pesticide, e.target.value)
                  }
                  placeholder="Enter quantity"
                  disabled={!selectedPesticides.includes(pesticide)}
                  className="w-36 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 transition duration-300 ease-in-out"
                />
              </div>
            ))}
            {isSelectedPesticidesEmpty && (
              <p className="mt-1 text-xs text-red-600">
                Pesticide Details is required
              </p>
            )}
          </div>
        </div>

        {/* Fertilizer Details */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 mt-4">
            Fertilizer Recommendation (gram/plant){" "}
            <span className="text-red-500">*</span>
          </label>

          {/* Grid Wrapper */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Search Input - Spanning Full Width */}
            <div className="sm:col-span-2 md:col-span-3">
              <input
                type="text"
                value={fertilizerSearchTerm}
                onChange={(e) => setFertilizerSearchTerm(e.target.value)}
                placeholder="Search fertilizer..."
                className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out"
              />
            </div>

            {/* Fertilizer checkboxes and quantity inputs */}
            {filteredFertilizers.map((fertilizer, index) => (
              <div
                key={index}
                className={`flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out ${
                  isSelectedFertilizersEmpty ? "border-red-500" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedFertilizers.includes(fertilizer)}
                  onChange={() => {
                    handleCheckboxChangeFertilizer(fertilizer);
                    setIsSelectedFertilizersEmpty(false);
                  }}
                  className="form-checkbox h-5 w-5 text-indigo-600 transition duration-200 ease-in-out"
                />
                <span className="text-lg text-gray-800 font-medium">
                  {fertilizer}
                </span>

                {/* Show quantity input initially but disabled */}
                <input
                  type="number"
                  value={fertilizerQuantities[fertilizer] || ""}
                  onChange={(e) =>
                    handleQuantityChangeFertilizer(fertilizer, e.target.value)
                  }
                  placeholder="Enter quantity"
                  disabled={!selectedFertilizers.includes(fertilizer)}
                  className="w-36 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 transition duration-300 ease-in-out"
                />
              </div>
            ))}
            {isSelectedFertilizersEmpty && (
              <p className="mt-1 text-xs text-red-600">
                Fertilizer Recommendation is required
              </p>
            )}
          </div>
        </div>

        {/* Image Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {[
            {
              label: "Farmer Picture",
              state: farmerPicture,
              setState: setFarmerPicture,
              isEmpty: isFarmerPictureEmpty,
              setIsEmpty: setIsFarmerPictureEmpty,
            },
            {
              label: "Garden Picture",
              state: gardenPicture,
              setState: setGardenPicture,
              isEmpty: isGardenPictureEmpty,
              setIsEmpty: setIsGardenPictureEmpty,
            },
            {
              label: "Record Book",
              state: recordBook,
              setState: setRecordBook,
              isEmpty: isRecordBookEmpty,
              setIsEmpty: setIsRecordBookEmpty,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 border rounded-lg shadow-sm bg-white"
            >
              <label className="text-gray-700 font-medium mb-2">
                {item.label} <span className="text-red-500">*</span>
              </label>
              <div
                className={`relative w-28 h-28 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-100 ${
                  item.isEmpty ? "border-red-500" : "border-gray-300"
                }`}
              >
                {item.state ? (
                  <img
                    src={
                      item.state instanceof File
                        ? URL.createObjectURL(item.state)
                        : item.state
                    }
                    alt={item.label}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No Image</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) =>
                    handleImageChange(e, item.setState, item.setIsEmpty)
                  }
                />
              </div>
              {item.isEmpty && (
                <p className="mt-1 text-xs text-red-600">
                  {item.label} is required
                </p>
              )}
            </div>
          ))}
        </div>
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        )}
      </CardBody>
      <CardFooter className="flex justify-end p-6">
        <div>
          <Button
            onClick={() => navigate("/farmers")}
            className="mr-5"
            variant="outlined"
            size="sm"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            className="ml-2 bg-[#FFA500] hover:bg-[#FF8C00] text-white"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <Spinner className="w-4 h-4" />
            ) : existingFarmer ? (
              "Update Mango Producer"
            ) : (
              "Add Mango Producer"
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
