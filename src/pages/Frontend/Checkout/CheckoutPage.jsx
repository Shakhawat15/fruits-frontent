import { useState } from "react";
import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import Header from "../../../components/Frontend/Header/Header";
import Footer from "../../../components/Frontend/Footer/Footer";

const CheckoutPage = () => {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Shipping Info:", shippingInfo);
    console.log("Payment Method:", paymentMethod);
    // Proceed to payment gateway or confirmation
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Shipping & Payment Form */}
          <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={shippingInfo.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={shippingInfo.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={shippingInfo.phone}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={shippingInfo.address}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={shippingInfo.city}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={shippingInfo.state}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    type="text"
                    name="zip"
                    placeholder="Zip Code"
                    value={shippingInfo.zip}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border rounded-md cursor-pointer hover:border-green-500">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="mr-3"
                    />
                    <FaCreditCard className="text-lg mr-2" />
                    Credit/Debit Card
                  </label>
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
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h3>
            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between">
                <span>Organic Alphonso Mangoes</span>
                <span>$3.99 x 2</span>
              </div>
              <div className="flex justify-between">
                <span>Fresh Strawberries</span>
                <span>$4.49 x 1</span>
              </div>
              <div className="flex justify-between">
                <span>Juicy Georgia Peaches</span>
                <span>$2.99 x 3</span>
              </div>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-6">
              <span>Total</span>
              <span>$19.45</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
