import { FaCheckCircle } from "react-icons/fa";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Frontend/Header/Header";
import Footer from "../../../components/Frontend/Footer/Footer";

const ThankYouPage = () => {
  const navigate = useNavigate();

  // Optional: Redirect user to home or products after few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/products");
    }, 8000); // Redirect after 8 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <FaCheckCircle className="text-green-600 text-9xl mb-8" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-600 text-lg mb-6 text-center max-w-md">
          Your order has been placed successfully. We are processing your order
          and you will receive a confirmation email shortly.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-lg transition"
        >
          Continue Shopping
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default ThankYouPage;
