import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Heading,
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
  const [inputText, setInputText] = useState("");
  const [getMayData, setGetMyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get("http://10.126.15.141:8002/qc/getMyData");
      setGetMyData(response.data);
    };
    fetchData();
  }, []);

  const inputHandeler = (e) => {
    setInputText(e.target.value.toUpperCase());
  };

  const renderItemList = () => {
    const ItemList = getMayData.filter((el) => {
      if (inputText == "") {
        return el;
      } else {
        return (
          (el.item_name && el.item_name.includes(inputText)) ||
          (el.no_catalog && el.no_catalog.includes(inputText)) ||
          (el.brand && el.brand.includes(inputText))
        );
      }
    });
    return ItemList.map((item, index) => (
      <Tr key={index}>
        <Td>{item.id}</Td>
        <Td>{item.item_name}</Td>
        <Td>{item.no_catalog}</Td>
        <Td>{item.brand}</Td>
        <Td>{item.qty}</Td>
        <Td>{item.unit}</Td>
        <Td>{item.no_locker}</Td>
      </Tr>
    ));
  };

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
              onChange={inputHandeler}
            />
          </Card>
        </div>

        <div>
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(800px))"
            // templateColumns="repeat(auto-fill, minmax(800px, 2fr))"
          >
            <Card>
              <CardHeader>
                <Heading size="md"> Log Gate</Heading>
              </CardHeader>
              <CardBody style={{ maxHeight: "700px", overflowY: "auto" }}>
                <Table variant="striped" colorScheme="teal" size="md">
                  <TableCaption>Data Tabel</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>No</Th>
                      <Th>Item Name</Th>
                      <Th>No Catalog</Th>
                      <Th>Brand</Th>
                      <Th>QTY</Th>
                      <Th>Unit</Th>
                      <Th>No Locker</Th>
                    </Tr>
                  </Thead>
                  <Tbody>{renderItemList()}</Tbody>
                </Table>
              </CardBody>
            </Card>
            {/* =============================================================================== */}
            {/* <Card>
              <CardHeader>
                <Heading size="md"> Log Gate</Heading>
              </CardHeader>
              <CardBody style={{ maxHeight: "700px", overflowY: "auto" }}>
                <Table variant="striped" colorScheme="teal" size="md">
                  <TableCaption>Data Tabel</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>No</Th>
                      <Th>Item Name</Th>
                      <Th>No Catalog</Th>
                      <Th>Brand</Th>
                      <Th>QTY</Th>
                      <Th>Unit</Th>
                    </Tr>
                  </Thead>
                  <Tbody>{renderItemList()}</Tbody>
                </Table>
              </CardBody>
            </Card> */}
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
}

export default Home;
