import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Checkbox,
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
function Edit() {
  const [inputTest, setInputText] = useState("");
  const [dropDownTest, setDropDown] = useState(0);
  const [lockerSelect, setLockerSelect] = useState(null);
  const [qtySelect, setQTYSelect] = useState(null);
  const [getMayData, setGetMyData] = useState([]);
  const [backupQTY, setBeckupQTY] = useState();
  const [backupLOCKER, setBackupLOCKER] = useState();
  const [editEnable, setEditEnable] = useState(true);

  const fetchData = async () => {
    let response = await axios.get("http://10.126.15.141:8002/qc/getMyData");
    setGetMyData(response.data);
  };

  const inputHandeler = (e) => {
    setInputText(e.target.value.toUpperCase());
  };

  const dropDownHendeler = (e) => {
    setDropDown(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectHendeler = (e) => {
    setLockerSelect(Number(e.target.value));
  };

  const updateInputHandeler = (e) => {
    setQTYSelect(e.target.value);
  };
  const editHendeler = async (id, qty, locker) => {
    setBeckupQTY(Number(qty));
    setBackupLOCKER(Number(locker));
    setLockerSelect(null);
    setQTYSelect(null);
    let response = await axios.patch(`http://10.126.15.141:8002/qc/edit/${id}`);
    fetchData();
  };

  const updateHendeler = async (id) => {
    setEditEnable(true);
    if (lockerSelect == null) {
      var locker = backupLOCKER;
    } else {
      var locker = lockerSelect;
    }
    if (qtySelect == null) {
      var data_qty = backupQTY;
    } else {
      data_qty = qtySelect;
    }
    console.log(locker, data_qty);
    let dataUser = { no_locker: locker, no_qty: data_qty };
    let response = await axios.patch(
      `http://10.126.15.141:8002/qc/update/${id}`,
      dataUser
    );
    if (response) {
      alert(response.data.message);
    }
    fetchData();
  };
  const deleteHendeler = async (id) => {
    // Menampilkan konfirmasi dialog
    const confirmation = window.confirm(
      "Apakah Anda yakin ingin menghapus Item ini ?"
    );

    if (confirmation) {
      try {
        // Jika pengguna menekan "OK" di konfirmasi dialog
        const response = await axios.delete(
          `http://10.126.15.141:8002/qc/delete/${id}`
        );

        if (response) {
          alert(response.data.message);
        }
        fetchData();
      } catch (error) {
        // Tangani kesalahan jika ada
        console.error("Terjadi kesalahan saat menghapus pengguna:", error);
      }
    } else {
      // Jika pengguna menekan "Batal" di konfirmasi dialog
      alert("Item tidak dihapus.");
    }
  };

  const renderItemList = () => {
    const ItemList = getMayData.filter((el) => {
      if (inputTest == "" && dropDownTest == 0) {
        return el;
      }
      if (inputTest == "" && !dropDownTest == 0) {
        return el.no_locker == dropDownTest || el.no_locker == null;
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
        <Td>
          {item.no_locker === null ? (
            <Input
              placeholder={backupQTY}
              size="md"
              type="text"
              onChange={updateInputHandeler}
            />
          ) : (
            item.qty
          )}
        </Td>
        <Td>{item.unit}</Td>
        {/* <Td>{item.no_locker}</Td> */}
        <Td>
          {item.no_locker === null ? (
            <Select placeholder={backupLOCKER} onChange={selectHendeler}>
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
              className="mr-2"
              onClick={() => {
                updateHendeler(item.id, item.qty, item.no_locker);
              }}
            >
              Update
            </Button>
          ) : (
            <>
              <Button
                className="mr-2"
                colorScheme="green"
                onClick={() => {
                  editHendeler(item.id, item.qty, item.no_locker);
                }}
              >
                Edit
              </Button>
            </>
          )}
          <>
            <Button colorScheme="red" onClick={() => deleteHendeler(item.id)}>
              Delete
            </Button>
          </>
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
                <Select onChange={dropDownHendeler} placeholder="Locker Number">
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
