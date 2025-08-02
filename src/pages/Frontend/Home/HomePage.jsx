import { FaPlus, FaShoppingCart, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import Header from '../../../components/Frontend/Header/Header';
import Footer from '../../../components/Frontend/Footer/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="hero-section text-white py-20 md:py-32 px-4 bg-gradient-to-r from-green-600 to-green-800">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Fresh Seasonal Fruits Delivered to Your Doorstep</h1>
          <p className="text-xl mb-8">Discover farm-fresh fruits delivered directly from local growers. Seasonal, sustainable, and delicious.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#products" className="bg-white hover:bg-gray-100 text-green-600 font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105">
              Shop Now
            </a>
            <a href="#seller" className="bg-green-800 hover:bg-green-900 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105">
              Sell Your Fruits
            </a>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Seasonal Favorites</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Summer Fruits', 'Tropical Fruits', 'Citrus Fruits', 'Organic Berries'].map((category) => (
              <a key={category} href="#" className="category-card bg-gray-50 rounded-lg overflow-hidden transition hover:shadow-lg">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={`https://placehold.co/600x400?text=${category.replace(' ', '+')}`} 
                    alt={`Colorful assortment of ${category.toLowerCase()}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg">{category}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Fresh From Our Sellers</h2>
          
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
              <span className="text-gray-700">120 products</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              {
                name: "Organic Alphonso Mangoes",
                farm: "Green Valley Orchards",
                price: "$3.99/lb",
                rating: 4.2,
                reviews: 42,
                tags: ["Organic", "Summer"]
              },
              {
                name: "Fresh Strawberries",
                farm: "Berry Good Farms",
                price: "$4.49/lb",
                rating: 4.8,
                reviews: 87,
                tags: ["Organic"]
              },
              {
                name: "Juicy Georgia Peaches",
                farm: "Peach Perfect Orchards",
                price: "$2.99/lb",
                rating: 4.0,
                reviews: 35,
                tags: ["Summer"]
              },
              {
                name: "Organic Honeydew Melon",
                farm: "Sweet Melon Farms",
                price: "$5.99 each",
                rating: 3.7,
                reviews: 28,
                tags: ["Organic"]
              }
            ].map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition">
              Load More Products
            </button>
          </div>
        </div>
      </section>

      {/* Seller CTA Section */}
      <section id="seller" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Become a Seller</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Join our marketplace and sell your seasonal fruits directly to customers. We handle the platform, you focus on growing great fruits.
          </p>
          
          <div className="bg-gray-50 rounded-lg shadow-md p-6 md:p-10 mx-auto max-w-3xl">
            <h3 className="text-2xl font-semibold mb-6 text-center">Why Sell With Us?</h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
                  <FiSearch className="text-green-600 text-2xl" />
                </div>
                <h4 className="font-semibold mb-2">Large Customer Base</h4>
                <p className="text-gray-600">Access thousands of fruit lovers looking for fresh, seasonal produce.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                  <FaShoppingCart className="text-blue-600 text-2xl" />
                </div>
                <h4 className="font-semibold mb-2">Easy Selling Process</h4>
                <p className="text-gray-600">Simple listing process with powerful tools to manage your products.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-yellow-100 p-4 rounded-full inline-block mb-4">
                  <FaStar className="text-yellow-600 text-2xl" />
                </div>
                <h4 className="font-semibold mb-2">Fair Pricing</h4>
                <p className="text-gray-600">Keep up to 85% of your sales with competitive commission rates.</p>
              </div>
            </div>
            
            <div className="text-center">
              <a href="/seller-application" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105">
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
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-yellow-400 opacity-30" />);
    }
    
    return stars;
  };

  return (
    <div className="fruit-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
      <div className="relative">
        <img 
          src={`https://placehold.co/600x400?text=${product.name.replace(' ', '+')}`} 
          alt={`Fresh ${product.name.toLowerCase()} from ${product.farm}`}
          className="w-full h-48 object-cover"
        />
        {product.tags.includes("Organic") && (
          <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">Organic</div>
        )}
        {product.tags.includes("Summer") && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">Summer</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">Farm: {product.farm}</p>
        <div className="flex items-center mb-2">
          <div className="flex">
            {renderStars()}
          </div>
          <span className="text-gray-600 text-sm ml-2">({product.reviews})</span>
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-green-600">{product.price}</span>
          <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full transition">
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
