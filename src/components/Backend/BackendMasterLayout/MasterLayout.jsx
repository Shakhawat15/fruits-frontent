import { BuildingStorefrontIcon, CubeIcon } from "@heroicons/react/24/outline";
import {
  BriefcaseIcon,
  InboxIcon,
  ShoppingBagIcon,
  TagIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { List, ListItemPrefix, Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import { getUser } from "../../../helper/SessionHelper";

export default function MasterLayout({ children }) {
  MasterLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const [menuOpenIndex, setMenuOpenIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [role, setRole] = useState(null); // state for role
  const location = useLocation();

  // Fetch user role only once when component mounts
  useEffect(() => {
    const userRole = getUser()?.role_id;
    setRole(userRole);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const setFromMQ = () => setSidebarOpen(mq.matches);
    setFromMQ();
    mq.addEventListener("change", setFromMQ);
    return () => mq.removeEventListener("change", setFromMQ);
  }, []);

  useEffect(() => {
    const paths = [
      "/users",
      "/user-roles",
      "/product-types",
      "/categories",
      "/products-list",
      "/order-list",
      "/settings",
      "/menu",
    ];
    paths.forEach((path, index) => {
      if (location.pathname.startsWith(path)) {
        setMenuOpenIndex(index + 1);
      }
    });
  }, [location]);

  const handleAccordion = (value) => {
    setMenuOpenIndex(menuOpenIndex === value ? 0 : value);
  };

  // Menu items for Admin
  const adminMenu = [
    { name: "Dashboard", icon: "dashboard", path: "/dashboard" },
    { name: "Users", icon: UsersIcon, path: "/users" },
    { name: "User Roles", icon: BriefcaseIcon, path: "/user-roles" },
    { name: "Product Type", icon: TagIcon, path: "/product-types" },
    { name: "Sellers", icon: BuildingStorefrontIcon, path: "/seller-list" },
    { name: "Products", icon: CubeIcon, path: "/products-list" },
    { name: "Orders", icon: InboxIcon, path: "/order-list" },
  ];

  // Menu items for Seller
  const sellerMenu = [
    { name: "Add Product", icon: ShoppingBagIcon, path: "/products-list" },
    { name: "Orders", icon: InboxIcon, path: "/order-list" },
  ];

  const menuToRender =
    role === "68b8fb8bf143996efa66acaa" ? sellerMenu : adminMenu;

  return (
    <div className="flex flex-col h-screen relative">
      <Header toggleSidebar={() => setSidebarOpen((prev) => !prev)} />
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`h-full ${sidebarOpen ? "w-60" : "w-16"} ${
            sidebarOpen ? "p-4" : "p-2"
          } 
          shrink-0 transition-all duration-300 ease-in-out bg-white shadow-xl shadow-blue-gray-900/5`}
        >
          <List>
            {menuToRender.map((menu) => (
              <NavLink
                key={menu.name}
                className={({ isActive }) =>
                  `flex items-center rounded-md mt-2 transition-colors px-2 py-2 ${
                    isActive
                      ? "bg-blue-gray-100 text-blue-500"
                      : "hover:bg-blue-gray-50"
                  }`
                }
                to={menu.path}
              >
                <ListItemPrefix>
                  <menu.icon className="h-5 w-5" />
                </ListItemPrefix>
                {sidebarOpen && (
                  <Typography
                    color="blue-gray"
                    className="ml-2 mr-auto font-normal"
                  >
                    {menu.name}
                  </Typography>
                )}
              </NavLink>
            ))}
          </List>
        </aside>

        {/* Content */}
        <main className="flex-grow overflow-auto p-4 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
