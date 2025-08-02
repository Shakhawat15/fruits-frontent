import PropTypes from "prop-types";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function MasterLayout({ children }) {
  MasterLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-grow bg-[#FFE5B4]">
        {" "}
        {/* Light mango color */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
