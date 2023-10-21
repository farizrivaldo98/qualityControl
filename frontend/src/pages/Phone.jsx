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
  const [initialData, setInitialData] = useState("");
  const [qualityData, setQualityData] = useState(null);
  const [keteranganData, setKeteranganData] = useState("");
  const [myDate, setMyDate] = useState()


 




  const fetchData = async () => {
    let response = await axios.get("http://10.126.15.141:8002/qc/getMyData");
    setGetMyData(response.data);
  };

  useEffect(() => {
    
    fetchData();
  }, []);

  const KeteranganHendeler = (e) => {
    setKeteranganData(e.target.value)
  }

  const inputHandler = (e) => {
    setInputText(e.target.value.toUpperCase());
  };

  const initialSelectHendeler = (e) => {
    setInitialData(e.target.value);
  };

  const choseQualityHendeler = (e) => {
    setQualityData(e.target.value);
  };

  const historyPickupHendeler = async() => {
    var myData = {
      date : myDate,
      initial : initialData,
      item_name : selectName[0],
      item_locker : Number(selectLocker[0]),
      quality : selectQTY[0],
      quality_pickup : Number(qualityData),
      ket : keteranganData
    }
    let response = await axios.post("http://10.126.15.141:8002/qc/historian",myData)

  }

  const submitButonHendeler = async (e) => {
    var transaction = { no_qty: selectQTY[0] - Number(qualityData) };
    var id = seletIdItem;
    let response = await axios.patch(
      `http://10.126.15.141:8002/qc/pickup/${id}`,
      transaction
    );
    historyPickupHendeler()
    if (response) {
      if (transaction.no_qty < 3) {
        // Redirect ke link WhatsApp jika transaksi kurang dari 3
        alert(
          `Akan menghubungi Whatsapp Admin karna barang ${selectName} mulai habis`
        );

        window.location.href = `https://api.whatsapp.com/send?phone=6289626340073&text=Minta%20untuk%20pembelian%20barang%20${selectName}%20karena%20barang%20tinggal%20${transaction.no_qty}%20di%20lemari%20nomor%20${selectLocker}%0A%0ATrimakasih%20:)`;
        setTimeout(function () {
          window.location.reload();
        }, 1000);
        return;
      } else {
        // Jika transaksi lebih besar atau sama dengan 3, tampilkan alert
        alert(response.data.message);
        window.location.reload();
      }
      window.location.reload();
    }
    fetchData();
  };

  useEffect(() => {
    const now = new Date();
    function formatDateForMySQL(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
  
      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      return formattedDateTime;
    }
    const formattedNowForMySQL = formatDateForMySQL(now);
    setMyDate(formattedNowForMySQL)
    fetchData();
  }, []);

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
    itemList.sort((a, b) => a.no_locker - b.no_locker);

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
            <div className="mt-2 ml-1">
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
            <Input
              placeholder="Initial"
              size="xs"
              type="text"
              className="p-2"
              onChange={initialSelectHendeler}
            />
            <div className="mt-2">
              <Select
                placeholder="Select Quality"
                onChange={choseQualityHendeler}
              >
                {Array.from({ length: Number(selectQTY) }).map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1} {selectUnit}
                  </option>
                ))}
              </Select>
            </div>
            <div className="mt-2">
            <Input
              placeholder="Keterangan"
              size="xs"
              type="text"
              className="p-2"
             onChange={KeteranganHendeler}
            />
            </div>
            <div className="mt-3 ">
              {initialData && qualityData ? (
                <Button
                  colorScheme="green"
                  onClick={() => {
                    submitButonHendeler();
                  }}
                >
                  Pick Up Item
                </Button>
              ) : (
                <div></div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Phone;
