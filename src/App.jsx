import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import the Pages
import FullscreenLoader from "./components/Backend/BackendMasterLayout/FullscreenLoader";
import { getToken } from "./helper/SessionHelper";

// Import Backend Pages
import Dashboard from "./pages/Backend/Dashboard/DashboardPage";
import LoginPage from "./pages/Backend/Login/LoginPage";
import UserList from "./pages/Backend/User/UserPage";
import UserRoleList from "./pages/Backend/UserRole/UserRolePage";

// Import Frontend Pages
import BecomeSellerPage from "./pages/Frontend/BecomeSeller/BecomeSellerPage";
import CartPage from "./pages/Frontend/Cart/CartPage";
import CheckoutPage from "./pages/Frontend/Checkout/CheckoutPage";
import HomePage from "./pages/Frontend/Home/HomePage";
import ProductPage from "./pages/Frontend/Product/ProductPage";

function App() {
  if (getToken()) {
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/become-seller" element={<BecomeSellerPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<HomePage />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/user-roles" element={<UserRoleList />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
        <FullscreenLoader />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/become-seller" element={<BecomeSellerPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="*" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
        <FullscreenLoader />
      </Fragment>
    );
  }
}

export default App;
