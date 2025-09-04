import { FaPlus, FaShoppingCart, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Header from "../../../components/Frontend/Header/Header";
import Footer from "../../../components/Frontend/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { AxiosHeader, baseURL } from "../../../API/config";
import { ErrorToast, SuccessToast } from "../../../helper/FormHelper";
import { ToastContainer } from "react-toastify";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch products
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="hero-section text-white py-20 md:py-32 px-4 bg-gradient-to-r from-green-600 to-green-800">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Fresh Seasonal Fruits Delivered to Your Doorstep
          </h1>
          <p className="text-xl mb-8">
            Discover farm-fresh fruits delivered directly from local growers.
            Seasonal, sustainable, and delicious.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#products"
              className="bg-white hover:bg-gray-100 text-green-600 font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Shop Now
            </a>
            <a
              href="#seller"
              className="bg-green-800 hover:bg-green-900 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Sell Your Fruits
            </a>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Seasonal Favorites
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Summer Fruits", image: "/SummerFruits.jpg" },
              { name: "Tropical Fruits", image: "/TropicalFruits.webp" },
              { name: "Citrus Fruits", image: "/CitrusFruits.jpg" },
              { name: "Organic Berries", image: "/OrganicBerries.jpg" },
            ].map((category) => (
              <a
                key={category.name}
                href="#"
                className="category-card bg-gray-50 rounded-lg overflow-hidden transition hover:shadow-lg"
              >
                <div className="relative w-full pt-[56.25%]">
                  <img
                    src={category.image} // <-- Public folder path
                    alt={`Colorful assortment of ${category.name.toLowerCase()}`}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-12 px-4 bg-gray-50">
        <ToastContainer />
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Fresh From Our Sellers
          </h2>

          {/* Sort and Count */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <span className="mr-2 text-gray-700">Sort by:</span>
              <select className="border border-gray-300 rounded px-3 py-2">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
                <option>Best Sellers</option>
              </select>
            </div>
            <div>
              <span className="text-gray-700">{products.length} products</span>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={{
                    _id: product._id,
                    title: product.title,
                    farm: product.product_by?.full_name || "Unknown Seller",
                    price: product.discounted_price, // Bangladeshi currency
                    rating: 4.5, // placeholder until rating added
                    reviews: 0, // placeholder
                    tags: [product.type_id?.name],
                    image: product.media?.[0],
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}

          {/* Load More */}
          {products.length > 0 && (
            <div className="mt-8 text-center">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition">
                Load More Products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Seller CTA Section */}
      <section id="seller" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Become a Seller
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Join our marketplace and sell your seasonal fruits directly to
            customers. We handle the platform, you focus on growing great
            fruits.
          </p>

          <div className="bg-gray-50 rounded-lg shadow-md p-6 md:p-10 mx-auto max-w-3xl">
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Why Sell With Us?
            </h3>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
                  <FiSearch className="text-green-600 text-2xl" />
                </div>
                <h4 className="font-semibold mb-2">Large Customer Base</h4>
                <p className="text-gray-600">
                  Access thousands of fruit lovers looking for fresh, seasonal
                  produce.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                  <FaShoppingCart className="text-blue-600 text-2xl" />
                </div>
                <h4 className="font-semibold mb-2">Easy Selling Process</h4>
                <p className="text-gray-600">
                  Simple listing process with powerful tools to manage your
                  products.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-yellow-100 p-4 rounded-full inline-block mb-4">
                  <FaStar className="text-yellow-600 text-2xl" />
                </div>
                <h4 className="font-semibold mb-2">Fair Pricing</h4>
                <p className="text-gray-600">
                  Keep up to 85% of your sales with competitive commission
                  rates.
                </p>
              </div>
            </div>

            <div className="text-center">
              <a
                href="/seller-application"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
              >
                Start Selling Now
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

const ProductCard = ({ product }) => {
  console.log("====================================");
  console.log(product);
  console.log("====================================");
  // Render stars
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating || 5);
    const hasHalfStar = (product.rating || 0) % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
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
  const addToCart = () => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    // Use unique product ID for check (backend _id or id)
    const productId = product._id || product.id;

    console.log("====================================");
    console.log(productId, product.name);
    console.log("====================================");

    const existingIndex = cart.findIndex((item) => item.id === productId);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1; // Increment quantity if already exists
    } else {
      cart.push({
        id: productId,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    SuccessToast(`${product.name} added to cart`);
  };

  return (
    <div className="fruit-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
      <div className="relative">
        <img
          src={
            product.image ||
            `https://placehold.co/600x400?text=${product.name.replace(
              /\s/g,
              "+"
            )}`
          }
          alt={`Fresh ${product.name?.toLowerCase()} from ${product.farm}`}
          className="w-full h-48 object-cover"
        />
        {product.tags?.includes("Organic") && (
          <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
            Organic
          </div>
        )}
        {product.tags?.includes("Summer") && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
            Summer
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">Farm: {product.farm}</p>
        <div className="flex items-center mb-2">
          <div className="flex">{renderStars()}</div>
          <span className="text-gray-600 text-sm ml-2">
            ({product.reviews || 0})
          </span>
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-green-600">
            {product.price ? `৳${product.price}` : "৳0"}
          </span>
          <button
            onClick={addToCart}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full transition"
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
