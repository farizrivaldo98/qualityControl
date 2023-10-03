import React from "react";
import { Card, Select, Button, Input } from "@chakra-ui/react";
import CanvasJSReact from "../canvasjs.react";

function Create() {
  return (
    <div className="text-center pt-4 pb-2">
      <h1 className="font-extrabold text-2xl text-teal-600  mb-4">
        Quality Control Item Management
      </h1>
      <div className="mr-4">
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
            </Select>

            <Input
              placeholder="Quantity"
              size="md"
              type="number"
              className="mb-3"
            />
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
