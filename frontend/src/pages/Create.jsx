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
import { Chart } from "react-google-charts";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Create() {
  const [dailyPower, setDailyPower] = useState([]);

  const options = {
    theme: "light1",
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
            />
            <Input
              placeholder="No. Catalog"
              size="md"
              type="text"
              className="mb-3"
            />

            <Input
              placeholder="Brand Name"
              size="md"
              type="text"
              className="mb-3"
            />

            <Select placeholder="Locker Number" className="mb-3">
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
              placeholder="Quantity (just Number)"
              size="md"
              type="text"
              className="mb-3"
            />

            <Select placeholder="Unit" className="mb-3">
              <option value="Box">Box</option>
              <option value="Pcs">Pcs</option>
              <option value="Pack">Pack</option>
              <option value="Pasang">Pasang</option>
            </Select>
            <Input placeholder="Exp." size="md" type="text" className="mb-3" />

            <Button colorScheme="teal" variant="solid">
              Submit
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Create;
