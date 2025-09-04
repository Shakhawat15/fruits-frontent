import { useState, useEffect } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import Header from "../../../components/Frontend/Header/Header";
import Footer from "../../../components/Frontend/Footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL, AxiosHeader } from "../../../API/config";
import { SuccessToast, ErrorToast } from "../../../helper/FormHelper";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    fullname: "",
    address: "",
    city: "",
    state: "",
    post_code: "",
    email: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cartItems, setCartItems] = useState([]);

  // Load cart from sessionStorage
  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  // Calculate total amount
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + Number(item.price) * item.quantity, 0)
      .toFixed(2);
  };

  // Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) return ErrorToast("Cart is empty!");

    try {
      const orderPayload = {
        user_id: "64xxxxxx", // Replace with logged-in user ID
        cartItems,
        shippingInfo,
        payment_type: paymentMethod,
        payment_transaction_id: paymentMethod === "card" ? "TXN123456" : null,
      };

      const orderRes = await axios.post(
        `${baseURL}/orders/create`,
        orderPayload,
        AxiosHeader
      );

      SuccessToast("Order placed successfully!");
      sessionStorage.removeItem("cart"); // Clear cart
      navigate("/thank-you");
    } catch (error) {
      ErrorToast(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="py-12 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Shipping & Payment Form */}
        <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Shipping Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "fullname",
                  "email",
                  "phone",
                  "address",
                  "city",
                  "state",
                  "post_code",
                ].map((field) => (
                  <input
                    key={field}
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    placeholder={field.replace("_", " ").toUpperCase()}
                    value={shippingInfo[field]}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:border-green-500">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mr-3"
                  />
                  <FaMoneyBillWave className="text-lg mr-2" />
                  Cash on Delivery
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md text-lg transition"
            >
              Complete Order
            </button>
          </form>
        </div>

        {/* Cart Summary Sidebar */}
        <div className="bg-white rounded-xl shadow p-6 sticky top-20">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            Order Summary
          </h3>
          <div className="space-y-4 text-gray-700">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.title}</span>
                <span>
                  ৳{Number(item.price).toFixed(2)} x {item.quantity}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-semibold text-lg mt-6">
            <span>Total</span>
            <span>৳{calculateTotal()}</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
