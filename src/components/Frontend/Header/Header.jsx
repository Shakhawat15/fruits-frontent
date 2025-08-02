import { NavLink } from "react-router-dom";
import { FaBars, FaChevronDown, FaLeaf, FaShoppingCart, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="text-2xl font-bold text-green-600 flex items-center"
            >
              <FaLeaf className="mr-2" />
              <span>SeasonalFruits</span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `border-b-2 ${
                  isActive ? "border-green-600" : "border-transparent"
                } text-gray-700 hover:text-green-600 transition`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `border-b-2 ${
                  isActive ? "border-green-600" : "border-transparent"
                } text-gray-700 hover:text-green-600 transition`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/become-seller"
              className={({ isActive }) =>
                `border-b-2 ${
                  isActive ? "border-green-600" : "border-transparent"
                } text-gray-700 hover:text-green-600 transition`
              }
            >
              Become a Seller
            </NavLink>

            {isLoggedIn ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-green-600 transition">
                  <span>Profile</span>
                  <FaChevronDown className="ml-1 text-xs" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `block px-4 py-2 ${
                        isActive ? "bg-gray-100 text-green-600" : "text-gray-700"
                      } hover:bg-gray-100`
                    }
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/account-settings"
                    className={({ isActive }) =>
                      `block px-4 py-2 ${
                        isActive ? "bg-gray-100 text-green-600" : "text-gray-700"
                      } hover:bg-gray-100`
                    }
                  >
                    Account Settings
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `border-b-2 ${
                      isActive ? "border-green-600" : "border-transparent"
                    } text-gray-700 hover:text-green-600 transition`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `border-b-2 ${
                      isActive ? "border-green-600" : "border-transparent"
                    } text-gray-700 hover:text-green-600 transition`
                  }
                >
                  Register
                </NavLink>
              </>
            )}

            <div className="relative">
              <NavLink
                to="/cart"
                className="text-gray-700 hover:text-green-600 transition"
              >
                <FaShoppingCart className="text-xl" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  3
                </span>
              </NavLink>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700"
            >
              {mobileMenuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 py-2 space-y-2">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block ${
                  isActive ? "text-green-600 font-semibold" : "text-gray-700"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block ${
                  isActive ? "text-green-600 font-semibold" : "text-gray-700"
                }`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/become-seller"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block ${
                  isActive ? "text-green-600 font-semibold" : "text-gray-700"
                }`
              }
            >
              Become a Seller
            </NavLink>
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block ${
                      isActive ? "text-green-600 font-semibold" : "text-gray-700"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/account-settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block ${
                      isActive ? "text-green-600 font-semibold" : "text-gray-700"
                    }`
                  }
                >
                  Account Settings
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block ${
                      isActive ? "text-green-600 font-semibold" : "text-gray-700"
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block ${
                      isActive ? "text-green-600 font-semibold" : "text-gray-700"
                    }`
                  }
                >
                  Register
                </NavLink>
              </>
            )}
            <NavLink
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center text-gray-700"
            >
              <FaShoppingCart className="text-xl mr-2" />
              Cart (3)
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
