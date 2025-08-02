import { useRef, useState } from "react";
import { ErrorToast, IsEmail, IsEmpty } from "../../../helper/FormHelper";
import { LoginRequest } from "../../../API/userAPI";
import Loader from "../BackendMasterLayout/Loader";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();

  const SubmitLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const email = emailRef.current.value;
    const password = passRef.current.value;

    if (IsEmail(email)) {
      ErrorToast("Valid Email Address is Required!");
      return; // Exit if email is invalid
    } 
    if (IsEmpty(password)) {
      ErrorToast("Password is Required!");
      return; // Exit if password is empty
    }

    setLoading(true);
    try {
      const result = await LoginRequest(email, password, setLoading);
      if (result) {
        window.location.href = "/dashboard"; // Redirect to dashboard on success
      }
    } catch (error) {
      ErrorToast("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-green-600">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <h1 className="text-4xl font-extrabold text-center text-green-600 mb-4">
            SeasonalFruits
          </h1>
          <form onSubmit={SubmitLogin}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400 transition duration-300"
                placeholder="you@example.com"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                ref={passRef}
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400 transition duration-300"
                placeholder="********"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition-all duration-300"
            >
              Log in
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <NavLink to="/register" className="text-green-600 hover:underline">
              Register here
            </NavLink>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
