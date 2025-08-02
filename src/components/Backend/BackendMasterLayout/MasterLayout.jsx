import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  FolderIcon,
  NewspaperIcon,
  PhotoIcon,
  PlayCircleIcon,
  PresentationChartBarIcon,
  TagIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { List, ListItemPrefix, Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
                EMAP Bangladesh
              </Typography>
            </div>
            {/* Sidebar navigation */}
            <List>
              {superAdminRoleId === roleId ? (
                <>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-md mt-2 transition-colors ${
                        isActive
                          ? "bg-blue-gray-100 text-[#FF8C00]"
                          : "hover:bg-blue-gray-50"
                      }`
                    }
                    to="/dashboard"
                  >
                    <ListItemPrefix>
                      <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal"
                    >
                      Dashboard
                    </Typography>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-md mt-2 transition-colors ${
                        isActive
                          ? "bg-blue-gray-100 text-[#FF8C00]"
                          : "hover:bg-blue-gray-50"
                      }`
                    }
                    to="/users"
                  >
                    <ListItemPrefix>
                      <UsersIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal"
                    >
                      Users
                    </Typography>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-md mt-2 transition-colors ${
                        isActive
                          ? "bg-blue-gray-100 text-[#FF8C00]"
                          : "hover:bg-blue-gray-50"
                      }`
                    }
                    to="/user-roles"
                  >
                    <ListItemPrefix>
                      <BriefcaseIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal"
                    >
                      User Roles
                    </Typography>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-md mt-2 transition-colors ${
                        isActive
                          ? "bg-blue-gray-100 text-[#FF8C00]"
                          : "hover:bg-blue-gray-50"
                      }`
                    }
                    to="/districts"
                  >
                    <ListItemPrefix>
                      <TagIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal"
                    >
                      Districts
                    </Typography>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-md mt-2 transition-colors ${
                        isActive
                          ? "bg-blue-gray-100 text-[#FF8C00]"
                          : "hover:bg-blue-gray-50"
                      }`
                    }
                    to="/demonstration-types"
                  >
                    <ListItemPrefix>
                      <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal"
                    >
                      Demonstration Types
                    </Typography>
                  </NavLink>
                </>
              ) : null}

              {/* Common Menu for All Users */}
              <NavLink
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-md mt-2 transition-colors ${
                    isActive
                      ? "bg-blue-gray-100 text-[#FF8C00]"
                      : "hover:bg-blue-gray-50"
                  }`
                }
                to="/upazila-agriculture-offices"
              >
                <ListItemPrefix>
                  <BuildingOfficeIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Agriculture Offices
                </Typography>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-md mt-2 transition-colors ${
                    isActive
                      ? "bg-blue-gray-100 text-[#FF8C00]"
                      : "hover:bg-blue-gray-50"
                  }`
                }
                to="/farmers"
              >
                <ListItemPrefix>
                  <UserGroupIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Mango Producer
                </Typography>
              </NavLink>
              {/* Super Admin */}
              {superAdminRoleId === roleId ? (
                <>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-md mt-2 transition-colors ${
                        isActive
                          ? "bg-blue-gray-100 text-[#FF8C00]"
                          : "hover:bg-blue-gray-50"
                      }`
                    }
                    to="/comments"
                  >
                    <ListItemPrefix>
                      <ChatBubbleLeftIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal"
                    >
                      Message
                    </Typography>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-md mt-2 transition-colors ${
                        isActive
                          ? "bg-blue-gray-100 text-[#FF8C00]"
                          : "hover:bg-blue-gray-50"
                      }`
                    }
                    to="/newses"
                  >
                    <ListItemPrefix>
                      <NewspaperIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal"
                    >
                      Nesw
                    </Typography>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-md mt-2 transition-colors ${
                        isActive
                          ? "bg-blue-gray-100 text-[#FF8C00]"
                          : "hover:bg-blue-gray-50"
                      }`
                    }
                    to="/gallery-folders"
                  >
                    <ListItemPrefix>
                      <FolderIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal"
                    >
                      Gallery Folder
                    </Typography>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-md mt-2 transition-colors ${
                        isActive
                          ? "bg-blue-gray-100 text-[#FF8C00]"
                          : "hover:bg-blue-gray-50"
                      }`
                    }
                    to="/image-gallery"
                  >
                    <ListItemPrefix>
                      <PhotoIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal"
                    >
                      Image Gallery
                    </Typography>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-md mt-2 transition-colors ${
                        isActive
                          ? "bg-blue-gray-100 text-[#FF8C00]"
                          : "hover:bg-blue-gray-50"
                      }`
                    }
                    to="/video-gallery"
                  >
                    <ListItemPrefix>
                      <PlayCircleIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal"
                    >
                      Vieo Gallery
                    </Typography>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-md mt-2 transition-colors ${
                        isActive
                          ? "bg-blue-gray-100 text-[#FF8C00]"
                          : "hover:bg-blue-gray-50"
                      }`
                    }
                    to="/pdfs"
                  >
                    <ListItemPrefix>
                      <DocumentTextIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal"
                    >
                      PDF
                    </Typography>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-md mt-2 transition-colors ${
                        isActive
                          ? "bg-blue-gray-100 text-[#FF8C00]"
                          : "hover:bg-blue-gray-50"
                      }`
                    }
                    to="/testimonials"
                  >
                    <ListItemPrefix>
                      <ChatBubbleLeftRightIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal"
                    >
                      Testimonials
                    </Typography>
                  </NavLink>
                </>
              ) : null}
            </List>
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
