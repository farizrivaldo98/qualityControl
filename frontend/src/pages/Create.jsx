import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Select,
  Button,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import CanvasJSReact from "../canvasjs.react";

function Create() {
  const [inputItem, setInputItem] = useState("");
  const [inputNoCatalog, setInputCatalog] = useState("");
  const [inputBrandName, setInputBrandName] = useState("");
  const [inputNoLocker, setInputNoLocker] = useState(0);
  const [inputQuantity, setInputQuantity] = useState(0);
  const [inputUnit, setInputUnit] = useState("");
  const [inputKeterangan, setInputKeterangan] = useState("");

  const itemHendeler = (e) => {
    setInputItem(e.target.value.toUpperCase());
  };
  const noCatalogHendeler = (e) => {
    setInputCatalog(e.target.value);
  };
  const inputBrandNameHendeler = (e) => {
    setInputBrandName(e.target.value);
  };
  const noLockerHendeler = (e) => {
    setInputNoLocker(e.target.value);
  };
  const qualityHendeler = (e) => {
    setInputQuantity(e.target.value);
  };
  const unitHendeler = (e) => {
    setInputUnit(e.target.value);
  };
  const keteranganHendeler = (e) => {
    setInputKeterangan(e.target.value);
  };

  const addData = async () => {
    let tempData = {
      item_name: inputItem,
      no_catalog: inputNoCatalog,
      brand: inputBrandName,
      qty: inputQuantity,
      unit: inputUnit,
      no_locker: inputNoLocker,
      ket: inputKeterangan,
    };
    let response = await axios.post(
      "http://10.126.10.42:8002/qc/create",
      tempData
    );
    alert(response.request.statusText);
  };

  return (
    <div className="text-center pt-4 pb-2">
      <h1 className="font-extrabold text-2xl text-teal-600  mb-4">
        Quality Control Item Management
      </h1>
      <div className="mr-60 ml-60 ">
        <div className="flex flex-col px-auto mb-4">
          <Card>
            <Input
              placeholder="Nama Item"
              size="md"
              type="text"
              className="mb-3"
              onChange={itemHendeler}
            />
            <Input
              placeholder="No. Catalog"
              size="md"
              type="text"
              className="mb-3"
              onChange={noCatalogHendeler}
            />

            <Input
              placeholder="Brand Name"
              size="md"
              type="text"
              className="mb-3"
              onChange={inputBrandNameHendeler}
            />

            <Select
              placeholder="Locker Number"
              className="mb-3"
              onChange={noLockerHendeler}
            >
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
            <Input
              placeholder="Quality (just Number)"
              size="md"
              type="text"
              className="mb-3"
              onChange={qualityHendeler}
            />

            <Select placeholder="Unit" className="mb-3" onChange={unitHendeler}>
              <option value="Box">Box</option>
              <option value="Pcs">Pcs</option>
              <option value="Pack">Pack</option>
              <option value="Pasang">Pasang</option>
            </Select>
            <Input
              placeholder="Exp."
              size="md"
              type="text"
              className="mb-3"
              onChange={keteranganHendeler}
            />

            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() => {
                addData();
              }}
            >
              Submit
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Create;
