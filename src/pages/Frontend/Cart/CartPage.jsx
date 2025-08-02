import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { useState } from "react";
import Header from "../../../components/Frontend/Header/Header";
import Footer from "../../../components/Frontend/Footer/Footer";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Organic Alphonso Mangoes",
      price: "$3.99",
      quantity: 2,
      image: "https://placehold.co/600x400?text=Alphonso+Mangoes",
    },
    {
      id: 2,
      name: "Fresh Strawberries",
      price: "$4.49",
      quantity: 1,
      image: "https://placehold.co/600x400?text=Strawberries",
    },
    {
      id: 3,
      name: "Juicy Georgia Peaches",
      price: "$2.99",
      quantity: 3,
      image: "https://placehold.co/600x400?text=Georgia+Peaches",
    },
  ]);

  const handleRemoveItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce(
        (total, item) =>
          total + parseFloat(item.price.slice(1)) * item.quantity,
        0
      )
      .toFixed(2);
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout"); // Navigate to CheckoutPage
  };

  return (
    <div className="bg-gray-50">
      <Header />
      <div className="py-12 px-4 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
            Your Shopping Cart
          </h2>

          {cartItems.length === 0 ? (
            <div className="text-center mt-20">
              <FaShoppingCart className="text-7xl mx-auto mb-6 text-gray-400" />
              <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center bg-white rounded-xl shadow p-4 hover:shadow-md transition"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg mr-4 border"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 mb-2">Price: {item.price}</p>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="text-md font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 ml-4 text-xl"
                      title="Remove Item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="bg-white rounded-xl shadow p-6 sticky top-20">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  Order Summary
                </h3>
                <div className="flex justify-between mb-2 text-gray-600">
                  <span>Subtotal</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="flex justify-between mb-4 text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-lg font-semibold text-gray-800">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-md text-lg transition duration-300"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
