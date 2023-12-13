import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Select,
  SimpleGrid,
  Heading,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Input,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import CanvasJSReact from "../canvasjs.react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const data = [
  {
    no: 1,
    tanggal: "2023-08-17",
    noPolisi: "AB 123 CD",
    rfid: "RFID123",
    status: "Aktif",
  },
  {
    no: 2,
    tanggal: "2023-08-18",
    noPolisi: "XYZ 456",
    rfid: "RFID456",
    status: "Tidak Aktif",
  },
  {
    no: 3,
    tanggal: "2023-08-19",
    noPolisi: "JKL 789 EF",
    rfid: "RFID789",
    status: "Aktif",
  },
  {
    no: 4,
    tanggal: "2023-08-20",
    noPolisi: "MNO 555 FG",
    rfid: "RFID555",
    status: "Tidak Aktif",
  },
  {
    no: 5,
    tanggal: "2023-08-21",
    noPolisi: "QRS 777 HI",
    rfid: "RFID777",
    status: "Aktif",
  },
  {
    no: 6,
    tanggal: "2023-08-22",
    noPolisi: "TUV 111 JK",
    rfid: "RFID111",
    status: "Tidak Aktif",
  },
  {
    no: 7,
    tanggal: "2023-08-23",
    noPolisi: "XYZ 999 LM",
    rfid: "RFID999",
    status: "Aktif",
  },
  {
    no: 8,
    tanggal: "2023-08-24",
    noPolisi: "ABC 222 OP",
    rfid: "RFID222",
    status: "Tidak Aktif",
  },
  {
    no: 9,
    tanggal: "2023-08-25",
    noPolisi: "DEF 333 QR",
    rfid: "RFID333",
    status: "Aktif",
  },
  {
    no: 10,
    tanggal: "2023-08-26",
    noPolisi: "GHI 444 ST",
    rfid: "RFID444",
    status: "Tidak Aktif",
  },
];

function Report() {
  const [getDataHistorical, setGetDataHistorical] = useState([]);
  const [getStartDate, setGetStartDate] = useState();
  const [getFinishDate, setGetFinishDate] = useState();

  const fetchData = async () => {
    let response = await axios.get(
      "http://10.126.15.141:8002/qc/gethistorian",
      {
        params: {
          start: getStartDate,
          finish: getFinishDate,
        },
      }
    );

    setGetDataHistorical(response.data);
    console.log(getDataHistorical);
  };
  const startDateHendeler = (e) => {
    setGetStartDate(e.target.value);
  };
  const finishDateHendeler = (e) => {
    setGetFinishDate(e.target.value);
  };

  return (
    <div className="text-center pt-4 pb-2">
      <h1 className="font-extrabold text-2xl text-teal-600  mb-4">
        Quality Control Item Management
      </h1>
      <div className="mr-4">
        <div className="mb-4 py-2">
          <Card>
            <div className="flex flex-row justify-center items-center m-2">
              <div className="flex-grow mr-2">
                <label htmlFor="dateInput">Start Date:</label>
                <Input
                  id="dateInput"
                  size="md"
                  type="date"
                  onChange={startDateHendeler}
                />
              </div>

              <div className="flex-grow mr-2">
                <label htmlFor="dateInput">End Date:</label>
                <Input
                  id="dateInput"
                  size="md"
                  type="date"
                  onChange={finishDateHendeler}
                />
              </div>

              <div>
                <Button
                  colorScheme="teal"
                  variant="solid"
                  onClick={() => {
                    fetchData();
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(800px))"
          >
            {/* =============================================================================== */}
            <Card>
              <CardHeader>
                <Heading size="md"> Log Gate</Heading>
              </CardHeader>
              <CardBody style={{ maxHeight: "400px", overflowY: "auto" }}>
                <Table variant="striped" colorScheme="teal" size="md">
                  <TableCaption>Data Tabel</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>No</Th>
                      <Th>Date</Th>
                      <Th>Initial</Th>
                      <Th>Item Name</Th>
                      <Th>Item Locker</Th>
                      <Th>Quantity Pickup</Th>
                      <Th>Ext.</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {getDataHistorical.map((item, index) => (
                      <Tr key={index}>
                        <Td>{item.id}</Td>
                        <Td>{item.date}</Td>
                        <Td>{item.initial}</Td>
                        <Td>{item.item_name}</Td>
                        <Td>{item.item_locker}</Td>
                        <Td>{item.quality_pickup}</Td>
                        <Td>{item.ket}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
}

export default Report;
