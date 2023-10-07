const express = require("express");
const databaseControllers = require("../controllers/databaseControllers");
const routers = express.Router();

routers.get("/getMyData", databaseControllers.getMyData);
routers.post("/create", databaseControllers.createMyData);

module.exports = routers;
