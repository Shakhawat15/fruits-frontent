import { Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";

export default function MasterLayout({ children }) {
  MasterLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [open, setOpen] = useState(0);
  const [roleId, setRoleId] = useState(null);
  const location = useLocation();

  // Super Admin Role ID (Replace with your actual Super Admin Role ID)
  const superAdminRoleId = "67c8931c14acfa3684d55f09";

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.role_id) {
      setRoleId(userData.role_id);
    }
  }, []);

  useEffect(() => {
    const paths = [
      "/users",
      "/user-roles",
      "/brands",
      "/categories",
      "/products",
      "/orders",
      "/settings",
      "/menu",
    ];
    paths.forEach((path, index) => {
      if (location.pathname.startsWith(path)) {
        setOpen(index + 1);
      }
    });
  }, [location]);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="flex flex-col h-screen relative">
      <div className="flex flex-grow overflow-hidden">
        {isSidebarVisible && (
          <div className="h-full w-60 p-4 shadow-xl shadow-blue-gray-900/5">
            {/* Logo section */}
            <div className="flex items-center justify-center mb-4">
              <Typography color="gray" variant="h6">
                SeasonalFruits Admin
              </Typography>
            </div>
            {/* Sidebar navigation */}
            
          </div>
        )}

        <main className="flex-grow overflow-auto">
          <Header toggleSidebar={setIsSidebarVisible} />
          {children}
        </main>
      </div>
    </div>
  );
}
