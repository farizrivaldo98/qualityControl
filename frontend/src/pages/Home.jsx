import React, { useState } from "react";
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Heading,
  Icon,
} from "@chakra-ui/react";
import {
  FaPlug,
  FaTint,
  FaFire,
  FaBolt,
  FaCog,
  FaIndustry,
  FaSnowflake,
  FaTools,
} from "react-icons/fa";

const Dashboard = () => {
  const [showPowerConsumption, setShowPowerConsumption] = useState(false);

  const data = [
    {
      title: "MVMDP",
      value: "8825.25 KWh",
      cost: "Rp 26.475.750,00",
      icon: FaPlug,
      onClick: () => setShowPowerConsumption(!showPowerConsumption),
    },
    { title: "PDAM", value: "45 kubik", cost: "Rp 180.000,00", icon: FaTint },
    {
      title: "Boiler",
      value: "43.357 MBTU",
      cost: "Rp 60.700,00",
      icon: FaFire,
    },
  ];

  const powerConsumption = [
    { title: "LVDMP", value: "8614", cost: "Rp 25.842.000,00", icon: FaBolt },
    { title: "Chiller", value: "1125", icon: FaSnowflake },
    { title: "Utility", value: "1986", icon: FaCog },
    { title: "SDP 1 Production", value: "1364", icon: FaIndustry },
    { title: "SDP 2 Production", value: "1924", icon: FaIndustry },
    { title: "Hydrant", value: "1", icon: FaTools },
  ];

  return (
    <div>
      <Box className="p-6  min-h-screen text-white">
        <Heading
          className="text-teal-600"
          textAlign="center"
          as="h1"
          size="xl"
          mb={6}
        >
          MAIN DASHBOARD
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          {data.map((item, index) => (
            <Box
              key={index}
              className="p-4 bg-gray-800 rounded-lg shadow-lg cursor-pointer"
              onClick={item.onClick}
            >
              <Icon as={item.icon} className="text-4xl text-teal-400 mb-2" />
              <Stat>
                <StatLabel>{item.title}</StatLabel>
                <StatNumber>{item.value}</StatNumber>
                <StatHelpText className="text-green-400">
                  {item.cost}
                </StatHelpText>
              </Stat>
            </Box>
          ))}
        </SimpleGrid>

        {showPowerConsumption && (
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} className="mt-6">
            {powerConsumption.map((item, index) => (
              <Box key={index} className="p-4 bg-gray-800 rounded-lg shadow-lg">
                <Icon as={item.icon} className="text-4xl text-teal-400 mb-2" />
                <Stat>
                  <StatLabel>{item.title}</StatLabel>
                  <StatNumber>{item.value}</StatNumber>
                  {item.cost && (
                    <StatHelpText className="text-green-400">
                      {item.cost}
                    </StatHelpText>
                  )}
                </Stat>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </div>
  );
};

export default Dashboard;
