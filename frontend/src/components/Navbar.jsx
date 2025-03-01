import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";

function Navbar() {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <nav className="fixed top-0 left-0 w-full bg-neutral-800 shadow-md p-4 flex justify-between items-center z-50">
      {/* Logo */}
      <div className="text-white text-2xl font-semibold px-6 tracking-wide">
        POWER
      </div>

      {/* Navigation Items */}
      <div className="flex space-x-8">
        <button
          className="text-white flex items-center space-x-2 hover:text-gray-300 transition duration-300"
          onClick={() => navigate("/Home")}
        >
          <HomeIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Dashboard</span>
        </button>

        <button
          className="text-white flex items-center space-x-2 hover:text-gray-300 transition duration-300"
          onClick={() => navigate("/create")}
        >
          <DescriptionIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Historical</span>
        </button>
      </div>

      {/* Theme Toggle */}
      <IconButton
        onClick={toggleColorMode}
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        isRound
        className="text-white hover:bg-gray-600 transition duration-300"
      />
    </nav>
  );
}

export default Navbar;
