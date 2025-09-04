import { useState } from "react";
import { FaCheck, FaCloudUploadAlt } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";

const BecomeSellerPage = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessAddress: "",
    yearsInBusiness: "",
    fruitTypes: [],
    certifications: [],
    businessDesc: "",
    termsAgreed: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMultiSelect = (e) => {
    const { name, options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setFormData((prev) => ({
      ...prev,
      [name]: selected,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target;
    setFormData((prev) => {
      const current = prev[name];
      if (checked) {
        return {
          ...prev,
          [name]: [...current, value],
        };
      } else {
        return {
          ...prev,
          [name]: current.filter((item) => item !== value),
        };
      }
    });
  };

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 2000);
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheck className="text-green-600 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold mb-4">
            Application Submitted Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in becoming a seller. Your application
            is under review. We'll contact you within 3-5 business days via
            email.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Back to Home
            </a>
            <a
              href="/seller-dashboard"
              className="bg-white hover:bg-gray-100 text-green-600 font-bold py-2 px-6 rounded-lg border border-green-600 transition"
            >
              Seller Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    currentStep >= step
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                <span
                  className={`text-sm ${
                    currentStep >= step
                      ? "font-medium text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {step === 1
                    ? "Business Info"
                    : step === 2
                    ? "Product Details"
                    : "Documents"}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Header */}
        <div className="flex items-center mb-8">
          <a href="/" className="text-green-600 hover:text-green-800 mr-4">
            <FiArrowLeft className="text-xl" />
          </a>
          <div>
            <h1 className="text-3xl font-bold">Become a Seller</h1>
            <p className="text-gray-600">
              Join our marketplace to sell your seasonal fruits directly to
              customers
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 md:p-10"
        >
          {/* Step 1: Business Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">
                Business Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="businessName"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Farm/Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="businessType"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Business Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                    required
                  >
                    <option value="">Select your business type</option>
                    <option value="farm">Farm/Orchard</option>
                    <option value="distributor">Fruit Distributor</option>
                    <option value="cooperative">
                      Agricultural Cooperative
                    </option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="businessAddress"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Business Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="businessAddress"
                  name="businessAddress"
                  rows="3"
                  value={formData.businessAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition"
                >
                  Next: Product Details
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Product Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Product Details</h2>

              <div>
                <label
                  htmlFor="fruitTypes"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Types of Fruits You Sell{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  id="fruitTypes"
                  name="fruitTypes"
                  multiple
                  value={formData.fruitTypes}
                  onChange={handleMultiSelect}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition h-auto min-h-[42px]"
                  required
                >
                  <option value="apple">Apples</option>
                  <option value="orange">Oranges</option>
                  <option value="banana">Bananas</option>
                  <option value="berry">Berries</option>
                  <option value="melon">Melons</option>
                  <option value="stone">Stone Fruits</option>
                  <option value="tropical">Tropical Fruits</option>
                  <option value="other">Other</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Hold Ctrl/Cmd to select multiple
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Certifications (Check all that apply)
                </label>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { id: "organic", label: "Organic Certified" },
                    { id: "usda", label: "USDA Certified" },
                    { id: "fairtrade", label: "Fair Trade" },
                    { id: "nonGmo", label: "Non-GMO" },
                    { id: "local", label: "Locally Grown" },
                    { id: "none", label: "None of these" },
                  ].map((cert) => (
                    <div key={cert.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={cert.id}
                        name="certifications"
                        value={cert.id}
                        checked={formData.certifications.includes(cert.id)}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      <label htmlFor={cert.id}>{cert.label}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="businessDesc"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Business Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="businessDesc"
                  name="businessDesc"
                  rows="4"
                  value={formData.businessDesc}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                  placeholder="Tell us about your farm and products"
                  required
                ></textarea>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition"
                >
                  Next: Documents
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">
                Documents & Agreement
              </h2>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Upload Documents <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="flex justify-center mb-2">
                    <FaCloudUploadAlt className="text-3xl text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-1">
                    Drag and drop files here or
                  </p>
                  <input
                    type="file"
                    id="documents"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="documents"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded-md text-sm cursor-pointer inline-block"
                  >
                    Browse Files
                  </label>
                  {selectedFiles.length > 0 && (
                    <div className="mt-4 text-left">
                      <p className="font-medium mb-2">Selected files:</p>
                      <ul className="list-disc pl-5">
                        {selectedFiles.map((file, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{" "}
                            MB)
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Upload business license, certification documents, and product
                  photos (Max 10MB each)
                </p>
              </div>

              <div className="mt-6">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    name="termsAgreed"
                    checked={formData.termsAgreed}
                    onChange={handleChange}
                    className="mt-1 mr-2"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-green-600 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-green-600 hover:underline">
                      Seller Agreement
                    </a>
                    . I understand that my application will be reviewed and
                    approval is subject to verification.
                  </label>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BecomeSellerPage;
