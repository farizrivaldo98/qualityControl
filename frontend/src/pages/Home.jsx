import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
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

// const options = {
//   theme: "dark2",
//   backgroundColor: "#1e1e1e",
//   // title: {
//   //   text: "Truck per Day",
//   //   fontColor: "#007acc",
//   // },
//   // subtitles: [
//   //   {
//   //     text: "total truck hour",
//   //     fontColor: "#dadcde",
//   //   },
//   // ],
//   axisY: {
//     prefix: "",
//   },
//   toolTip: {
//     shared: true,
//   },
//   data: [
//     {
//       type: "spline",
//       name: "Gate 1",
//       fontColor: "#dadcde",
//       showInLegend: true,
//       xValueFormatString: "",
//       yValueFormatString: "",
//       dataPoints: [
//         { label: "08.00", y: 10 },
//         { label: "09.00", y: 15 },
//         { label: "10.00", y: 25 },
//         { label: "11.00", y: 30 },
//         { label: "12.00", y: 28 },
//         { label: "13.00", y: 10 },
//         { label: "14.00", y: 15 },
//         { label: "15.00", y: 25 },
//         { label: "16.00", y: 30 },
//         { label: "17.00", y: 28 },
//       ],
//     },
//     {
//       type: "spline",
//       name: "Gate 2",
//       fontColor: "#dadcde",
//       showInLegend: true,
//       xValueFormatString: "",
//       yValueFormatString: "",
//       dataPoints: [
//         { label: "08.00", y: 12 },
//         { label: "09.00", y: 23 },
//         { label: "10.00", y: 34 },
//         { label: "11.00", y: 31 },
//         { label: "12.00", y: 12 },
//         { label: "13.00", y: 4 },
//         { label: "14.00", y: 7 },
//         { label: "15.00", y: 12 },
//         { label: "16.00", y: 8 },
//         { label: "17.00", y: 12 },
//       ],
//     },
//   ],
// };
function Home() {
  return (
    <div className="text-center pt-4 pb-2">
      <h1 className="font-extrabold text-2xl text-teal-600  mb-4">
        Quality Control Item Management
      </h1>
      <div className="mr-4">
        <div className="flex flex-col px-auto mb-4">
          <Card>
            <Input
              placeholder="Search Component"
              size="md"
              type="text"
              className="mb-3"
            />

            <Button colorScheme="teal" variant="solid">
              Submit
            </Button>
          </Card>
        </div>

        <div>
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(800px, 2fr))"
          >
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
                      <Th>Tanggal</Th>
                      <Th>No Polisi</Th>
                      <Th>RFID</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map((item, index) => (
                      <Tr key={index}>
                        <Td>{item.no}</Td>
                        <Td>{item.tanggal}</Td>
                        <Td>{item.noPolisi}</Td>
                        <Td>{item.rfid}</Td>
                        <Td>{item.status}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
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
                      <Th>Tanggal</Th>
                      <Th>No Polisi</Th>
                      <Th>RFID</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map((item, index) => (
                      <Tr key={index}>
                        <Td>{item.no}</Td>
                        <Td>{item.tanggal}</Td>
                        <Td>{item.noPolisi}</Td>
                        <Td>{item.rfid}</Td>
                        <Td>{item.status}</Td>
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

export default Home;
