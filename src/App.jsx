import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import the Pages
import FullscreenLoader from "./components/Backend/BackendMasterLayout/FullscreenLoader";
import { getToken } from "./helper/SessionHelper";

// Import Backend Pages
import CommentPage from "./pages/Backend/Comment/CommentPage";
import Dashboard from "./pages/Backend/Dashboard/DashboardPage";
import LoginPage from "./pages/Backend/Login/LoginPage";
import BackendNewsPage from "./pages/Backend/News/NewsPage";
import TestimonialPase from "./pages/Backend/Testimonial/TestimonialPage";
import UserList from "./pages/Backend/User/UserPage";
import UserRoleList from "./pages/Backend/UserRole/UserRolePage";

// Import Frontend Pages
import AboutPage from "./pages/Frontend/About/AboutPage";
import BecomeSellerPage from "./pages/Frontend/BecomeSeller/BecomeSellerPage";
import ContactPage from "./pages/Frontend/Contact/ContactPage";
import HomePage from "./pages/Frontend/Home/HomePage";
import NewsPage from "./pages/Frontend/News/NewsPage";
import ProductPage from "./pages/Frontend/Product/ProductPage";
import CartPage from "./pages/Frontend/Cart/CartPage";
import CheckoutPage from "./pages/Frontend/Checkout/CheckoutPage";

function App() {
  if (getToken()) {
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/become-seller" element={<BecomeSellerPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<HomePage />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/user-roles" element={<UserRoleList />} />
            <Route path="/comments" element={<CommentPage />} />
            <Route path="/newses" element={<BackendNewsPage />} />
            <Route path="/testimonials" element={<TestimonialPase />} />
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
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/news" element={<NewsPage />} />
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
