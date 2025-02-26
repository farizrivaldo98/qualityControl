import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Select,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Stat,
  Heading,
  StatLabel,
  StatNumber,
  SimpleGrid,
} from "@chakra-ui/react";
import CanvasJSReact from "../canvasjs.react";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Create() {
  const [dailyPower, setDailyPower] = useState([]);
  const [powerArea, setPowerArea] = useState();
  const [startDate, setStartDate] = useState();
  const [finishDate, setFinishDate] = useState();
  const [stats, setStats] = useState({});

  useEffect(() => {
    const calculateStats = (data) => {
      if (!Array.isArray(data) || data.length === 0)
        return { min: 0, max: 0, avg: 0, sum: 0 };
      const sum = data.reduce((acc, curr) => acc + curr.y, 0);
      const avg = (sum / data.length).toFixed(2);
      const min = Math.min(...data.map((d) => d.y));
      const max = Math.max(...data.map((d) => d.y));
      return { min, max, avg, sum };
    };
    const stats1 = calculateStats(dailyPower);
    setStats(stats1);
  }, [dailyPower]);

  const fetchDataDayly = async () => {
    let response = await axios.get(
      "http://10.126.15.137:8002/part/PowerDaily",
      {
        params: {
          area: powerArea,
          start: startDate,
          finish: finishDate,
        },
      }
    );
    console.log(response.data);

    if (powerArea === "cMT-Gedung-UTY_MVMDP_data") {
      var multipliedData = response.data.map((data) => ({
        label: data.label,
        y: data.y,
        x: data.x,
      }));
    } else if (
      powerArea === "cMT-Gedung-UTY_LVMDP1_data" ||
      powerArea === "cMT-Gedung-UTY_LVMDP2_data" ||
      powerArea === "cMT-Gedung-UTY_SDP.1-Produksi_data"
    ) {
      var multipliedData = response.data.map((data) => ({
        label: data.label,
        y: data.y,
        x: data.x,
      }));
    } else {
      var multipliedData = response.data.map((data) => ({
        label: data.label,
        y: data.y,
        x: data.x,
      }));
    }

    setDailyPower(multipliedData);
    console.log(multipliedData);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      dailyPower.map((data, index) => ({
        No: index + 1,
        Date: data.label,
        "Power Consumption (KWh)": data.y,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Daily Power");
    XLSX.writeFile(wb, "daily_power.xlsx");
  };

  let getPowerArea = (e) => {
    var dataInput = e.target.value;
    setPowerArea(dataInput);
  };

  let dateStart = (e) => {
    var dataInput = e.target.value;
    setStartDate(dataInput);
  };

  let dateFinish = (e) => {
    var dataInput = e.target.value;
    setFinishDate(dataInput);
  };

  const options = {
    theme: "dark1",
    title: {
      text: "Daily Power",
    },
    subtitles: [
      {
        text: "kilo watt per hour",
      },
    ],
    axisY: {
      prefix: "",
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "splineArea",
        name: "Kwh",
        showInLegend: true,
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: dailyPower,
      },
    ],
  };

  return (
    <div className="text-center pt-4 pb-2">
      <Heading
        className="text-teal-600"
        textAlign="center"
        as="h1"
        size="xl"
        mb={6}
      >
        HISTORICAL POWER
      </Heading>
      <div className="mr-60 ml-60 justify-center ">
        <div className="flex flex-row px-auto mb-4 justify-center">
          <div className="flex flex-row ">
            <div className="mr-3">
              <h2>AREA</h2>
              <Select placeholder="Select Panel" onChange={getPowerArea}>
                <option value="cMT-Gedung-UTY_MVMDP_data">MVMDP</option>
                <option value="cMT-Gedung-UTY_LVMDP1_data">LVMDP1</option>
                <option value="cMT-Gedung-UTY_LVMDP2_data">LVMDP2</option>
                <option value="cMT-Gedung-UTY_Inverter1-6_SP_data">
                  Solar-Panel1-6
                </option>
                <option value="cMT-Gedung-UTY_Inverter7-12_SP_data">
                  Solar-Panel7-12
                </option>
                <option value="cMT-Gedung-UTY_SDP.1-Utility_data">
                  SDP.1-Utility
                </option>
                <option value="cMT-Gedung-UTY_PPLP.1-UTY_Lt.2_data">
                  PPLP.1-UtilityLt.2
                </option>
                <option value="cMT-Gedung-UTY_PP.1-Chiller_data">
                  PP.1-Chiller
                </option>
                <option value="cMT-Gedung-UTY_PPLP.1-UTY_Lt.1_data">
                  PPLP.1-UtilityLt.1
                </option>
                <option value="cMT-Gedung-UTY_PP.1-Genset_data">
                  PP.1-Genset
                </option>
                <option value="cMT-Gedung-UTY_PP.1-Boiler&PW_data">
                  PP.1-Boiler & PW
                </option>
                <option value="cMT-Gedung-UTY_PP.1-Kompressor_data">
                  PP.1-Kompressor
                </option>
                <option value="cMT-Gedung-UTY_PP.1-HWP_data">PP.1-HWP</option>
                <option value="cMT-Gedung-UTY_PP.1-PUMPS_data">
                  PP.1-PUMPS
                </option>
                <option value="cMT-Gedung-UTY_PP.1-Lift_data">PP.1-Lift</option>
                <option value="cMT-Gedung-UTY_PP.1-AC1.1_data">
                  PP.1-AC1.1
                </option>
                <option value="cMT-Gedung-UTY_PP.1-AC1.2_data">
                  PP.1-AC1.2
                </option>
                <option value="cMT-Gedung-UTY_PP.1-AC1.3_data">
                  PP.1-AC1.3
                </option>
                <option value="cMT-Gedung-UTY_PP.1-AC2.3_data">
                  PP.1-AC2.3
                </option>
                <option value="cMT-Gedung-UTY_SDP.1-Produksi_data">
                  SDP.1-Produksi
                </option>
                <option value="cMT-Gedung-UTY_SDP.2-Produksi_data">
                  SDP.2-Produksi
                </option>
                <option value="cMT-Gedung-UTY_PP.2-Hydrant_data">
                  PP.2-Hydrant.
                </option>
                <option value="cMT-Gedung-UTY_PP.2-Fatigon_data">
                  PP.2-Fatigon
                </option>
                <option value="cMT-Gedung-UTY_PP.2-Puyer_data">
                  PP.2-Puyer
                </option>
                <option value="cMT-Gedung-UTY_PP.2-Mixagrib_data">
                  PP.2-Mixagrib
                </option>
                <option value="cMT-Gedung-UTY_PP.2-LabLt.2_data">
                  PP.2-LabLt.2
                </option>
                <option value="cMT-Gedung-UTY_PP.2-Fasilitas_data">
                  PP.2-Fasilitas
                </option>
                <option value="cMT-Gedung-UTY_PP.2-PackWH_data">
                  PP.2-PackWH
                </option>
                <option value="cMT-Gedung-UTY_LP.2-PRO1.1_data">
                  LP.2-PRO1.1
                </option>
                <option value="cMT-Gedung-UTY_LP.2-PRO1.2_data">
                  LP.2-PRO1.2
                </option>
                <option value="cMT-Gedung-UTY_LP.2-PRO1.3_data">
                  LP.2-PRO1.3
                </option>
                <option value="cMT-Gedung-UTY_LP.2-PRO2.3_data">
                  LP.2-PRO2.3
                </option>
                <option value="cMT-Gedung-UTY_LP.2-PRO3.1_data">
                  LP.2-PRO3.1
                </option>
                <option value="cMT-Gedung-UTY_LP.2-PRO4.1_data">
                  LP.2-PRO4.1
                </option>
                <option value="cMT-Gedung-UTY_LP.2WH1.1_data">
                  LP.2-WH1.1
                </option>
                <option value="cMT-Gedung-UTY_LP.2MEZZ1.1_data">
                  PPLP.2-Mezz1.1
                </option>
                <option value="cMT-Gedung-UTY_PPLP.2-PosJaga1_data">
                  PPLP.1-PosJaga1
                </option>
                <option value="cMT-Gedung-UTY_PPLP.2-PosJaga2_data">
                  PPLP.1-PosJaga2
                </option>
                <option value="cMT-Gedung-UTY_PPLP.2-Workshop_data">
                  PPLP.1-Workshop
                </option>
                <option value="cMT-Gedung-UTY_PPLP.2-Koperasi_data">
                  PPLP.1-Koperasi
                </option>
                <option value="cMT-Gedung-UTY_GCP_Genset_data">
                  GCPGenset
                </option>
                <option value="cMT-Gedung-UTY_SDP_Genset_data">
                  SDPGenset
                </option>
                <option value="cMT-Gedung-UTY_PP.1WWTP_data">PP.1-WWTP</option>
                <option value="cMT-Gedung-UTY_PP.2DumbWaiter_data">
                  PP.1-DumbWaiter
                </option>
                <option value="cMT-Gedung-UTY_PPLP.2OfficeLt1_data">
                  PP.1-OfficeLt.1
                </option>
                <option value="cMT-Gedung-UTY_PP.2Pumpit_data">
                  PP.1-PumpitUtama
                </option>
                <option value="cMT-Gedung-UTY_Chiller1_data">PPChiller1</option>
                <option value="cMT-Gedung-UTY_Chiller2_data">PPChiller2</option>
                <option value="cMT-Gedung-UTY_Chiller3_data">PPChiller3</option>
                <option value="cMT-Gedung-UTY_PP.2-AC 3.1 RND_data">
                  PP.2-AC 3.1 RND
                </option>
                <option value="cMT-Gedung-UTY_LP.2-PRO 3.1 RND_data">
                  LP.2-PRO 3.1 RND
                </option>
              </Select>
            </div>
            <div className="mr-3">
              <h2>Start Time</h2>
              <Input
                onChange={dateStart}
                placeholder="Select Date and Time"
                size="md"
                type="date"
              />
            </div>
            <div>
              <h2>Finish Time</h2>
              <Input
                onChange={dateFinish}
                placeholder="Select Date and Time"
                size="md"
                type="date"
              />
            </div>
            <div>
              <Button
                className="ml-4 mt-6"
                colorScheme="gray"
                onClick={() => fetchDataDayly()}
              >
                Submit
              </Button>
            </div>
            <Button
              className="ml-4 mt-6"
              colorScheme="teal"
              onClick={exportToExcel}
            >
              Export to Excel
            </Button>
          </div>
        </div>
        <div id="pdfContent">
          <div className="flex flex-row justify-center mx-12 pb-10">
            <CanvasJSChart className="" options={options} />
          </div>
          <SimpleGrid
            className="mb-8"
            columns={{ base: 1, md: 2, lg: 4 }}
            spacing={5}
          >
            <Stat>
              <StatLabel>Min</StatLabel>
              <StatNumber>{stats.min}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Max</StatLabel>
              <StatNumber>{stats.max}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Average</StatLabel>
              <StatNumber>{stats.avg}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Sum</StatLabel>
              <StatNumber>{stats.sum}</StatNumber>
            </Stat>
          </SimpleGrid>
          <div className="flex flex-row justify-center mx-12 pb-10">
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th textAlign="center">No</Th>
                  <Th textAlign="center">Date</Th>
                  <Th textAlign="center">Power Consumption (KWh)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dailyPower.map((data, index) => (
                  <Tr key={index}>
                    <Td textAlign="center">{index + 1}</Td>
                    <Td textAlign="center">{data.label}</Td>
                    <Td textAlign="center">{data.y}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
