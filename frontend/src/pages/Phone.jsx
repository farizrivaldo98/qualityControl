import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Select,
  Td,
  Button,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

function Phone() {
  const [inputText, setInputText] = useState("");
  const [getMyData, setGetMyData] = useState([]);
  const [seletIdItem, setSelectidItem] = useState(null);
  const [selectName, setSelectName] = useState();
  const [selectQTY, setSelectQTY] = useState();
  const [selectUnit, setSelectUnit] = useState();
  const [selectLocker, setSelectLocker] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get("http://10.126.15.135:8002/qc/getMyData");
      setGetMyData(response.data);
    };
    fetchData();
  }, []);

  const inputHandler = (e) => {
    setInputText(e.target.value.toUpperCase());
  };

  const selectItemHendeler = (id) => {
    setSelectidItem(id);

    const selectDataName = getMyData
      .filter((item) => item.id === id)
      .map((item) => item.item_name);

    const selectDataQTY = getMyData
      .filter((item) => item.id === id)
      .map((item) => item.qty);

    const selectDataUnit = getMyData
      .filter((item) => item.id === id)
      .map((item) => item.unit);

    const selectDataLocker = getMyData
      .filter((item) => item.id === id)
      .map((item) => item.no_locker);

    setSelectName(selectDataName);
    setSelectQTY(selectDataQTY);
    setSelectUnit(selectDataUnit);
    setSelectLocker(selectDataLocker);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // Mengatur efek scroll menjadi smooth
    });
  };

  const renderItemList = () => {
    const itemList = getMyData.filter((el) => {
      if (inputText === "") {
        return el;
      } else {
        return el.item_name.includes(inputText);
      }
    });
    return itemList.map((item, index) => (
      <Tr key={index}>
        <Td
          style={{
            fontSize: "9px",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          p={1}
        >
          {item.item_name}
        </Td>
        <Td
          style={{
            fontSize: "9px",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          p={1}
        >
          {item.qty}
        </Td>
        <Td
          style={{
            fontSize: "9px",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          p={1}
        >
          {item.unit}
        </Td>
        <Td
          style={{
            fontSize: "9px",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          p={1}
        >
          {item.no_locker}
        </Td>
        <Td
          style={{
            fontSize: "9px",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          p={1}
        >
          <Button
            style={{ fontSize: "10px" }}
            className="p-1"
            p={1}
            colorScheme="blue"
            onClick={() => {
              scrollToBottom();
              selectItemHendeler(item.id);
            }}
          >
            Get
          </Button>
        </Td>
      </Tr>
    ));
  };

  return (
    <div className="text-center pt-4 pb-2">
      <h1 className="font-extrabold text-xl text-teal-600 mb-4">
        {" "}
        {/* Mengurangi ukuran teks */}
        Quality Control Item Management
      </h1>
      <div className="mx-4">
        <div className="flex flex-col px-auto mb-4">
          <Card>
            <Input
              placeholder="Search Component"
              size="xs"
              type="text"
              className="p-2"
              onChange={inputHandler}
            />
          </Card>
        </div>

        <div className="mb-4">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Log Gate</h2>
            </CardHeader>
            <CardBody>
              <Table
                variant="striped"
                colorScheme="teal"
                size="sm"
                overflowX="auto"
              >
                <Thead>
                  <Tr>
                    <Th>Item Name</Th>
                    <Th>QTY</Th>
                    <Th>Unit</Th>
                    <Th>No Locker</Th>
                    <Th>Act</Th>
                  </Tr>
                </Thead>
                <Tbody>{renderItemList()}</Tbody>
              </Table>
            </CardBody>
          </Card>
        </div>

        <div className="flex flex-col px-auto ">
          <Card className="p-3">
            <Select placeholder="Initial">
              <option value="ABC">ABC</option>
              <option value="DEF">DEF</option>
              <option value="SAF">SAF</option>
              <option value="GHI">GHI</option>
              <option value="JKL">JKL</option>
              <option value="MNO">MNO</option>
              <option value="PQR">PQR</option>
              <option value="STU">STU</option>
              <option value="VWX">VWX</option>
              <option value="YZA">YZA</option>
            </Select>
            <div className="mt-2">
              <h1 style={{ textAlign: "left", margin: "10px 0" }}>
                Item Name = {selectName}
              </h1>
              <h1 style={{ textAlign: "left", margin: "10px 0" }}>
                Quantity Item = {selectQTY}
              </h1>
              <h1 style={{ textAlign: "left", margin: "10px 0" }}>
                Unit Item = {selectUnit}
              </h1>
              <h1 style={{ textAlign: "left", margin: "10px 0" }}>
                Locker Item = {selectLocker}
              </h1>
            </div>
            <div className="mt-2">
              <Select placeholder="Select Quality">
                {Array.from({ length: Number(selectQTY) }).map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1} {selectUnit}
                  </option>
                ))}
              </Select>
            </div>
            <div className="mt-3 ">
              <Button colorScheme="green">Pick Up Item</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Phone;
