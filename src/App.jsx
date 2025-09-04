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
import ProductTypePage from "./pages/Backend/ProductType/ProductTypePage";
import SellerPage from "./pages/Backend/Seller/SellerPage";
import ProductBackendPage from "./pages/Backend/Product/ProductPage";
import OrderPage from "./pages/Backend/Order/OrderPage";

// Import Frontend Pages
import BecomeSellerPage from "./pages/Frontend/BecomeSeller/BecomeSellerPage";
import CartPage from "./pages/Frontend/Cart/CartPage";
import CheckoutPage from "./pages/Frontend/Checkout/CheckoutPage";
import HomePage from "./pages/Frontend/Home/HomePage";
import ProductPage from "./pages/Frontend/Product/ProductPage";
import ThankYouPage from "./pages/Frontend/ThankYou/ThankYouPage";

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
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="*" element={<HomePage />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/user-roles" element={<UserRoleList />} />
            <Route path="/product-types" element={<ProductTypePage />} />
            <Route path="/seller-list" element={<SellerPage />} />
            <Route path="/products-list" element={<ProductBackendPage />} />
            <Route path="/order-list" element={<OrderPage />} />
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
            <Route path="/thank-you" element={<ThankYouPage />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
        <FullscreenLoader />
      </Fragment>
    );
  }
}

export default App;
