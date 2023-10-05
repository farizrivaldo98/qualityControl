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
import CanvasJSReact from "../canvasjs.react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const data = [
  {
    id: 1,
    item_name: "PHASE SEPARATOR PAPERS GRADE 480",
    no_catalog: "FT-3-602-090",
    brand: "SARTORIUS",
    qty: 4,
    unit: "PACK",
    no_locker: 11,
  },
  {
    id: 2,
    item_name: "REGENERATED CELLULOSE FILTERS",
    no_catalog: "18407-47-N",
    brand: "SARTORIUS",
    qty: 5,
    unit: "PACK",
    no_locker: 11,
  },
  {
    id: 3,
    item_name: "REGENERATED CELLULOSE FILTERS",
    no_catalog: "18406-47-N",
    brand: "SARTORIUS",
    qty: 3,
    unit: "PCS",
    no_locker: 11,
  },
  {
    id: 4,
    item_name: "HOLDER 13MM SST SWINNY SYRINGE",
    no_catalog: "XX3001200",
    brand: "MILLIPORE",
    qty: 1,
    unit: "PCS",
    no_locker: 11,
  },
  {
    id: 5,
    item_name: "WHATMAN 2 FILTER PAPERS",
    no_catalog: "1442-125",
    brand: "NA",
    qty: 7,
    unit: "PACK",
    no_locker: 11,
  },
  {
    id: 6,
    item_name: "MEMBRANE DISC 47 MM 0.45 UM",
    no_catalog: "WAT200538",
    brand: "WATERS",
    qty: 2,
    unit: "PCS",
    no_locker: 11,
  },
  {
    id: 7,
    item_name: "MEMBRANE DISC 47 MM 0.2 UM",
    no_catalog: "186009330",
    brand: "WATERS",
    qty: 3,
    unit: "PACK",
    no_locker: 11,
  },
  {
    id: 8,
    item_name: "REUSABLE SYRINGE FILTER HOLDERS 13MM MEMBRANE FILTERS",
    no_catalog: "16514-E",
    brand: "SARTORIUS",
    qty: 2,
    unit: "PCS",
    no_locker: 11,
  },
  {
    id: 9,
    item_name: "SCREW 9MM PTFE",
    no_catalog: "186000847C",
    brand: "WATERS",
    qty: 2,
    unit: "PACK",
    no_locker: 11,
  },
  {
    id: 10,
    item_name: "CLIPBOARD STIRAGE CASE",
    no_catalog: "NA",
    brand: "NA",
    qty: 2,
    unit: "PCS",
    no_locker: 11,
  },
  {
    id: 11,
    item_name: "SAMPLE PANS SET OF 80 PANS",
    no_catalog: "NA",
    brand: "METTLER",
    qty: 3,
    unit: "PACK",
    no_locker: 11,
  },
  {
    id: 12,
    item_name: "RIBBON CARTRIDGE ERC-38-B (TINTA TOC dan DISOLUSI)",
    no_catalog: "TM-U22, U20, U21, U23",
    brand: "EPSON",
    qty: 9,
    unit: "PCS",
    no_locker: 11,
  },
  {
    id: 13,
    item_name: "PIPETTE TETES PENDEK DOT MERAH",
    no_catalog: "NA",
    brand: "NA",
    qty: 60,
    unit: "PCS",
    no_locker: 11,
  },
  {
    id: 14,
    item_name: "PH INDIKATOR - LAKMUS PAPER",
    no_catalog: "1.09489.0003",
    brand: "NA",
    qty: 4,
    unit: "PACK",
    no_locker: 11,
  },
  {
    id: 15,
    item_name: "PH INDICATOR STRIPS - UNIVERSAL INDICATOR",
    no_catalog: "1.09535.0001",
    brand: "NA",
    qty: 5,
    unit: "PACK",
    no_locker: 11,
  },
  {
    id: 16,
    item_name: "TINTA POLARIMETER IR91",
    no_catalog: "XR30 3000101",
    brand: "NA",
    qty: 1,
    unit: "PCS",
    no_locker: 11,
  },
  {
    id: 17,
    item_name: "PITA TINTA PRINTER ERC-22 PURPLE",
    no_catalog: "ERC-22",
    brand: "NA",
    qty: 12,
    unit: "PCS",
    no_locker: 11,
  },
  {
    id: 18,
    item_name: "KERTAS PERKAMEN",
    no_catalog: "NA",
    brand: "NA",
    qty: 7,
    unit: "PACK",
    no_locker: 11,
  },
  {
    id: 19,
    item_name: "POROUS FILTER 10 MICRON",
    no_catalog: "NA",
    brand: "NA",
    qty: 2,
    unit: "PACK",
    no_locker: 11,
  },
  {
    id: 20,
    item_name: "DISPOSABLE GLASS CAPILLARIES 0.5 UM",
    no_catalog: "227729",
    brand: "NA",
    qty: 5,
    unit: "PACK",
    no_locker: 11,
  },
  {
    id: 21,
    item_name: "DISPOSABLE GLASS CAPILLARIES 10.0 UM",
    no_catalog: "22.773",
    brand: "NA",
    qty: 7,
    unit: "PACK",
    no_locker: 11,
  },
  {
    id: 22,
    item_name: "10 UM DISPOSABLE INOCULATION LOOPS / OSE DISPOSABLE",
    no_catalog: "65-0010",
    brand: "NA",
    qty: 9,
    unit: "PACK",
    no_locker: 11,
  },
  {
    id: 23,
    item_name: "WEIGHING BOAT KECIL",
    no_catalog: "NA",
    brand: "NA",
    qty: 12,
    unit: "PCS",
    no_locker: 11,
  },
  {
    id: 24,
    item_name: "PUMP KUNING KARET",
    no_catalog: "NA",
    brand: "NA",
    qty: 8,
    unit: "PCS",
    no_locker: 11,
  },
  {
    id: 25,
    item_name: "PINSET RUBBER",
    no_catalog: "I50094540",
    brand: "NA",
    qty: 2,
    unit: "PCS",
    no_locker: 11,
  },
  {
    id: 26,
    item_name: "PINSET TANPAA RUBBER",
    no_catalog: "4142000",
    brand: "NA",
    qty: 2,
    unit: "PCS",
    no_locker: 11,
  },
  {
    id: 27,
    item_name: "BATANG PENGADUK 30 CM",
    no_catalog: "NA",
    brand: "NA",
    qty: 8,
    unit: "PCS",
    no_locker: 11,
  },
  {
    id: 28,
    item_name: "BATANG PENGADUK 20 CM",
    no_catalog: "NA",
    brand: "NA",
    qty: 8,
    unit: "PCS",
    no_locker: 11,
  },
  {
    id: 29,
    item_name: "STAINLESS STEEL",
    no_catalog: "04.1421.00",
    brand: "NA",
    qty: 4,
    unit: "pcs",
    no_locker: 11,
  },
  {
    id: 30,
    item_name: "STAINLESS STEEL",
    no_catalog: "04.1420.00",
    brand: "NA",
    qty: 4,
    unit: "pcs",
    no_locker: 11,
  },
  {
    id: 31,
    item_name: "THERMOLOGGER",
    no_catalog: "NA",
    brand: "NA",
    qty: 2,
    unit: "PCS",
    no_locker: 11,
  },
  {
    id: 32,
    item_name: "KUVET",
    no_catalog: "",
    brand: "",
    qty: 0,
    unit: "",
    no_locker: 11,
  },
  {
    id: 33,
    item_name: "L-SHAPED SPREADER, POLYSTYRENE STERILE",
    no_catalog: "651001",
    brand: "BIOLOGIX",
    qty: 15,
    unit: "PCS",
    no_locker: 11,
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
function Edit() {
  const [inputTest, setInputText] = useState("");
  const [dropDownTest, setDropDown] = useState(0);
  const [lockerSelect, setLockerSelect] = useState();

  const inputHandeler = (e) => {
    setInputText(e.target.value.toUpperCase());
  };

  const dropDownHendeler = (e) => {
    setDropDown(e.target.value);
  };

  const selectHendeler = (e) => {
    setLockerSelect(e.target.value);
  };
  const editHendeler = (id) => {
    alert(`${id} Sudah Edit`);
  };
  const updateHendeler = (id) => {
    alert(`${id} Sudah Update`);
  };
  const deleteHendeler = (id) => {
    alert(`${id} Sudah Delete`);
  };

  const renderItemList = () => {
    const ItemList = data.filter((el) => {
      if (inputTest == "" && dropDownTest == 0) {
        return el;
      }
      if (inputTest == "" && !dropDownTest == 0) {
        return el.no_locker == dropDownTest;
      }
      if (!inputTest == "" && dropDownTest == 0) {
        return el.item_name.includes(inputTest);
      }
      if (!inputTest == "" && !dropDownTest == 0) {
        return el.no_locker == dropDownTest && el.item_name.includes(inputTest);
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
        {/* <Td>{item.no_locker}</Td> */}
        <Td>
          {item.no_locker === null ? (
            <Select onChange={selectHendeler}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
              <option value={15}>15</option>
              <option value={16}>16</option>
              <option value={17}>17</option>
              <option value={18}>18</option>
              <option value={19}>19</option>
              <option value={20}>20</option>
              <option value={21}>21</option>
              <option value={22}>22</option>
              <option value={23}>23</option>
              <option value={24}>24</option>
              <option value={25}>25</option>
            </Select>
          ) : (
            item.no_locker
          )}
        </Td>
        <Td>
          {item.no_locker === null ? (
            <Button
              colorScheme="blue"
              onClick={() => {
                updateHendeler(item.id);
              }}
            >
              Update
            </Button>
          ) : (
            <Button
              className="mr-2"
              colorScheme="green"
              onClick={() => {
                editHendeler(item.id);
              }}
            >
              Edit
            </Button>
          )}
          <Button colorScheme="red" onClick={() => deleteHendeler(item.id)}>
            Delet
          </Button>
        </Td>
      </Tr>
    ));
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
                <Input
                  placeholder="Search Component"
                  size="md"
                  type="text"
                  onChange={inputHandeler}
                />
              </div>

              <div className="flex-grow mr-2">
                <Select onChange={dropDownHendeler}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                  <option value={11}>11</option>
                  <option value={12}>12</option>
                  <option value={13}>13</option>
                  <option value={14}>14</option>
                  <option value={15}>15</option>
                  <option value={16}>16</option>
                  <option value={17}>17</option>
                  <option value={18}>18</option>
                  <option value={19}>19</option>
                  <option value={20}>20</option>
                  <option value={21}>21</option>
                  <option value={22}>22</option>
                  <option value={23}>23</option>
                  <option value={24}>24</option>
                  <option value={25}>25</option>
                </Select>
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
              <CardBody style={{ maxHeight: "800px", overflowY: "auto" }}>
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
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
}

export default Edit;
