const express = require("express");
const databaseControllers = require("../controllers/databaseControllers");
const routers = express.Router();

routers.get("/getMyData", databaseControllers.getMyData);
routers.post("/create", databaseControllers.createMyData);
routers.patch("/edit/:id", databaseControllers.editData);
routers.patch("/update/:id", databaseControllers.updateData);
routers.delete("/delete/:id", databaseControllers.deleteData);
routers.patch("/pickup/:id", databaseControllers.pickupData);
routers.post("/history", databaseControllers.historyPickup)
routers.get("/gethistorian", databaseControllers.getHistori)

module.exports = routers;
