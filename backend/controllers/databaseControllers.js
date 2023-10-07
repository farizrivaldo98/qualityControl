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
};
