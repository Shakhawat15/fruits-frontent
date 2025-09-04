import { UserCircleIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { MenuOutlined } from "@mui/icons-material";
import PropTypes from "prop-types";
import { imageBaseURL } from "../../../API/config";
import { getUser, removeSession } from "../../../helper/SessionHelper";

const Header = ({ toggleSidebar }) => {
  const user = getUser();

  const handleLogout = () => {
    removeSession();
  };

  return (
    <header className="py-2 px-4 shadow-md bg-white w-full flex items-center justify-between z-10 sticky top-0">
      <div className="flex items-center space-x-3">
        {/* Toggle always visible so you can collapse/expand on any screen size */}
        <Button
          onClick={toggleSidebar}
          className="p-2 rounded-lg bg-blue-gray-100 hover:bg-blue-gray-200 transition-all"
          variant="text"
        >
          <MenuOutlined className="h-6 w-6 text-gray-700" />
        </Button>
        <Typography color="gray" variant="h6">
          {user?.name || "Admin"}
        </Typography>
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-2">
        <Menu>
          <MenuHandler>
            <Button
              variant="text"
              className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition"
            >
              {user?.photo_path ? (
                <img
                  src={`${imageBaseURL}/${user.photo_path}`}
                  alt="User Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon className="h-8 w-8 text-blue-gray-500" />
              )}
            </Button>
          </MenuHandler>
          <MenuList className="p-2 shadow-lg rounded-lg">
            <MenuItem className="hover:bg-blue-50 rounded-lg">Profile</MenuItem>
            <MenuItem className="hover:bg-blue-50 rounded-lg">
              Settings
            </MenuItem>
            <MenuItem
              className="hover:bg-blue-50 rounded-lg"
              onClick={handleLogout}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </header>
  );
};

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Header;
