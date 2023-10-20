import React, { useEffect, useState } from "react";
import {
  Box,
  useColorMode,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import DescriptionIcon from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";
import AdfScannerIcon from "@mui/icons-material/AdfScanner";
import AddToHomeScreenIcon from "@mui/icons-material/AddToHomeScreen";
function Navbar() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { toggleColorMode } = useColorMode();
  const colorMode = useColorModeValue("light", "dark");

  const handleHover = (hovering) => {
    setIsHovered(hovering);
  };

  useEffect(() => {
    const navbar = document.querySelector(".navbar");

    navbar.addEventListener("mouseenter", () => {
      handleHover(true);
    });

    navbar.addEventListener("mouseleave", () => {
      handleHover(false);
    });

    return () => {
      navbar.removeEventListener("mouseenter", () => {
        handleHover(true);
      });
      navbar.removeEventListener("mouseleave", () => {
        handleHover(false);
      });
    };
  }, []);

  return (
    <div
      className={`flex float-left pr-7 ${
        isHovered ? "w-60" : "w-16 opacity-80 hover:opacity-100 mr-6"
      } navbar`}
    >
      <div className="flex flex-col h-screen p-3 bg-gray-800 shadow w-60">
        <div className="space-y-3">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-white">QC</h2>
          </div>

          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm ml-1">
                <button
                  onClick={toggleColorMode}
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  {colorMode === "light" ? (
                    <MoonIcon className="w-6 h-6 text-gray-100" />
                  ) : (
                    <SunIcon className="w-6 h-6 text-gray-100" />
                  )}
                  {isHovered && <span className="text-gray-100">Mode</span>}
                </button>
              </li>

              <li className="rounded-sm">
                <button
                  className="flex items-center p-2 space-x-3 rounded-md"
                  onClick={() => {
                    navigate(`/Home`);
                  }}
                >
                  <HomeIcon className="w-6 h-6 text-gray-100" />
                  {isHovered && <span className="text-gray-100">Home</span>}
                </button>
              </li>

              {/* Tambahkan ikon lainnya */}

              <li className="rounded-sm">
                <button
                  onClick={() => {
                    navigate(`/edit`);
                  }}
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <DescriptionIcon className="w-6 h-6 text-gray-100" />
                  {isHovered && <span className="text-gray-100">Edit</span>}
                </button>
              </li>
              <li className="rounded-sm">
                <button
                  onClick={() => {
                    navigate(`/Phone`);
                  }}
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <AddToHomeScreenIcon className="w-6 h-6 text-gray-100" />
                  {isHovered && <span className="text-gray-100">Phone</span>}
                </button>
              </li>

              <li className="rounded-sm">
                <button
                  onClick={() => {
                    navigate(`/create`);
                  }}
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <SettingsIcon className="w-6 h-6 text-gray-100" />
                  {isHovered && <span className="text-gray-100">Create</span>}
                </button>
              </li>

              <li className="rounded-sm">
                <button
                  onClick={() => {
                    navigate(`/Report`);
                  }}
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <AdfScannerIcon className="w-6 h-6 text-gray-100" />
                  {isHovered && <span className="text-gray-100">Report</span>}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
