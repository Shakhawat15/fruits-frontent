import { FaShoppingCart, FaStar } from "react-icons/fa";
import Header from "../../../components/Frontend/Header/Header";
import Footer from "../../../components/Frontend/Footer/Footer";

const products = [
  {
    id: 1,
    name: "Organic Alphonso Mangoes",
    farm: "Green Valley Orchards",
    price: "$3.99/lb",
    rating: 4.5,
    image: "https://placehold.co/600x400?text=Alphonso+Mangoes",
  },
  {
    id: 2,
    name: "Fresh Strawberries",
    farm: "Berry Good Farms",
    price: "$4.49/lb",
    rating: 4.8,
    image: "https://placehold.co/600x400?text=Strawberries",
  },
  {
    id: 3,
    name: "Juicy Georgia Peaches",
    farm: "Peach Perfect Orchards",
    price: "$2.99/lb",
    rating: 4.0,
    image: "https://placehold.co/600x400?text=Georgia+Peaches",
  },
  {
    id: 4,
    name: "Organic Honeydew Melon",
    farm: "Sweet Melon Farms",
    price: "$5.99 each",
    rating: 3.7,
    image: "https://placehold.co/600x400?text=Honeydew+Melon",
  },
  // Add more products as needed
];

const ProductPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
        <Header />
      <div className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Our Fresh Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Farm: {product.farm}
                  </p>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, index) => (
                        <FaStar
                          key={index}
                          className={`text-yellow-400 ${
                            index < Math.floor(product.rating)
                              ? ""
                              : "opacity-30"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm ml-2">
                      ({product.rating})
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="font-bold text-green-600">
                      {product.price}
                    </span>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full transition">
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
