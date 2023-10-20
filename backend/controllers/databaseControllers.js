const { db, query } = require("../database");
const { request, response } = require("express");
const { log } = require("util");

module.exports = {
  getMyData: (request, response) => {
    let fetchQuerry = "SELECT * FROM parammachine_saka.quality;";
    db.query(fetchQuerry, (err, result) => {
      return response.status(200).send(result);
    });
  },
  createMyData: (request, response) => {
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

  editData: (request, response) => {
    let idParams = request.params.id;
    let editQuerry = `UPDATE parammachine_saka.quality set qty = NULL, no_locker  = NULL WHERE id = ${db.escape(
      idParams
    )} `;
    db.query(editQuerry, (err, result) => {
      if (err) {
        return response.status(400).send(err.message);
      } else {
        return response
          .status(200)
          .send({ isSucess: true, message: "Succes update data" });
      }
    });
  },

  updateData: (request, response) => {
    let idParams = request.params.id;
    let qtyParams = request.body.no_qty;
    let lockerParams = request.body.no_locker;

    let updateQuery = `UPDATE parammachine_saka.quality set qty = ${db.escape(
      qtyParams
    )}, no_locker = ${db.escape(lockerParams)} WHERE id = ${db.escape(
      idParams
    )} `;

    db.query(updateQuery, (err, result) => {
      if (err) {
        return response.status(400).send(err.message);
      } else {
        return response
          .status(200)
          .send({ isSucess: true, message: "Succes update data" });
      }
    });
  },
  deleteData: (request, response) => {
    let idParams = request.params.id;
    let query = `DELETE FROM parammachine_saka.quality WHERE id = ${db.escape(
      idParams
    )}`;
    db.query(query, (err, result) => {
      if (err) {
        return response.status(400).send(err.message);
      } else {
        return response
          .status(200)
          .send({ isSucess: true, message: "Succes delete data" });
      }
    });
  },
  pickupData: (request, response) => {
    let idParams = request.params.id;
    let qtyParams = request.body.no_qty;
    console.log(idParams, qtyParams);
    let pickupQuery = `UPDATE parammachine_saka.quality set qty = ${db.escape(
      qtyParams
    )} WHERE id = ${db.escape(idParams)} `;
    db.query(pickupQuery, (err, result) => {
      if (err) {
        return response.status(400).send(err.message);
      } else {
        return response
          .status(200)
          .send({ isSucess: true, message: "Succes update data" });
      }
    });
  },
};
