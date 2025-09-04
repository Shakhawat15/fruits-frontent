import { FaShoppingCart, FaStar, FaStarHalfAlt, FaPlus } from "react-icons/fa";
import Header from "../../../components/Frontend/Header/Header";
import Footer from "../../../components/Frontend/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { AxiosHeader, baseURL } from "../../../API/config";
import { ErrorToast, SuccessToast } from "../../../helper/FormHelper";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/products/all`, AxiosHeader);
      setProducts(response.data.data || []);
    } catch (error) {
      ErrorToast(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Format price in Bangladeshi Taka
  const formatBDT = (amount) =>
    new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
    }).format(amount);

  // Render stars dynamically
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 5);
    const hasHalfStar = (rating || 0) % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className="text-yellow-400 opacity-50" />
      );
    }
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <FaStar key={`empty-${i}`} className="text-yellow-400 opacity-30" />
      );
    }
    return stars;
  };

  // Add product to sessionStorage cart
  const addToCart = (product) => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    const productId = product._id;

    const existingIndex = cart.findIndex((item) => item.id === productId);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: productId,
        title: product.title,
        price: product.discounted_price,
        image:
          product.media && product.media.length > 0 ? product.media[0] : "",
        quantity: 1,
      });
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    SuccessToast(`${product.title} added to cart`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Our Fresh Products
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                >
                  <img
                    src={
                      product.media && product.media.length > 0
                        ? product.media[0]
                        : "https://placehold.co/600x400?text=No+Image"
                    }
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Type: {product.type_id?.name || "—"}
                    </p>
                    <div className="flex items-center mb-2">
                      <div className="flex">{renderStars(4)}</div>
                      <span className="text-gray-600 text-sm ml-2">
                        ({product.quantity} in stock)
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <span className="font-bold text-green-600">
                        {formatBDT(product.discounted_price)}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full transition"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
