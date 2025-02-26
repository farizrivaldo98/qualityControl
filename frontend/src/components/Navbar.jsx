import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";
import { useColorMode } from "@chakra-ui/react";

function Navbar() {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 shadow-lg p-3 flex justify-between items-center">
      {/* Logo */}
      <div className="text-white text-xl font-bold px-4">RSUD</div>

      {/* Navigation Items */}
      <div className="flex space-x-6">
        <button
          className="text-white flex items-center space-x-2 hover:text-gray-300"
          onClick={() => navigate("/Home")}
        >
          <HomeIcon className="w-6 h-6" />
          <span>Dashboard</span>
        </button>

        <button
          className="text-white flex items-center space-x-2 hover:text-gray-300"
          onClick={() => navigate("/create")}
        >
          <DescriptionIcon className="w-6 h-6" />
          <span>Historical</span>
        </button>
      </div>

      {/* Theme Toggle */}
      <IconButton
        onClick={toggleColorMode}
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        isRound
        className="text-white"
      />
    </nav>
  );
}

export default Navbar;
