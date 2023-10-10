const express = require("express");
const databaseControllers = require("../controllers/databaseControllers");
const routers = express.Router();

routers.get("/getMyData", databaseControllers.getMyData);
routers.post("/create", databaseControllers.createMyData);
routers.patch("/edit/:id", databaseControllers.editData);
routers.patch("/update/:id", databaseControllers.updateData);
routers.delete("/delete/:id", databaseControllers.deleteData);

module.exports = routers;
