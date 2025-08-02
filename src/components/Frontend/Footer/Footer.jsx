import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-sm">
              SeasonalFruits is dedicated to providing the freshest seasonal fruits directly from local farms to your table. Join us in supporting sustainable agriculture and enjoying nature&apos;s bounty.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline">Home</a>
              </li>
              <li>
                <a href="#products" className="hover:underline">Products</a>
              </li>
              <li>
                <a href="/become-seller" className="hover:underline">Become a Seller</a>
              </li>
              <li>
                <a href="/login" className="hover:underline">Login</a>
              </li>
              <li>
                <a href="/register" className="hover:underline">Register</a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-sm">Email: support@seasonalfruits.com</p>
            <p className="text-sm">Phone: +1 (234) 567-8901</p>
            <div className="mt-4">
              <h4 className="font-bold">Follow Us</h4>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="hover:text-gray-200">
                  <FaFacebookF />
                </a>
                <a href="#" className="hover:text-gray-200">
                  <FaTwitter />
                </a>
                <a href="#" className="hover:text-gray-200">
                  <FaInstagram />
                </a>
                <a href="#" className="hover:text-gray-200">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Subscribe to Our Newsletter</h3>
          <form className="flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:border-green-400"
              required
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-lg transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="bg-green-700 text-center py-4 mt-8">
        <p className="text-sm">&copy; {new Date().getFullYear()} SeasonalFruits. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
