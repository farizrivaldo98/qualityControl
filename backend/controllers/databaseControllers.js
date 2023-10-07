const { db, query } = require("../database");
const { request, response } = require("express");
const { log } = require("util");

module.exports = {
  getMyData: async (request, response) => {
    let fetchQuerry = "SELECT * FROM parammachine_saka.quality;";
    db.query(fetchQuerry, (err, result) => {
      return response.status(200).send(result);
    });
  },
  createMyData: async (request, response) => {
    const { item_name, no_catalog, brand, qty, unit, no_locker, ket } =
      request.body;
    let createQuerry = `INSERT INTO quality VALUES (null, ${db.escape(
      item_name
    )},
     ${db.escape(no_catalog)}, ${db.escape(brand)},${db.escape(
      qty
    )},${db.escape(unit)},
      ${db.escape(no_locker)}, ${db.escape(ket)});`;
    db.query(createQuerry, (err, result) => {
      if (err) {
        return response.status(400).send(err.message);
      } else {
        let fatchquerry = "SELECT * FROM parammachine_saka.quality;";
        db.query(fatchquerry, (err, result) => {
          return response.status(200).send(result);
        });
      }
    });
  },
};
