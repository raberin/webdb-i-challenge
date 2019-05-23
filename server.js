const express = require("express");

const accountsDb = require("./data/accounts-model.js");

const server = express();

// your code here
server.get("/", (req, res, next) => {
  res.send(`
  <h1>Lambda Backend/h1>
  <h2>This is Roenz's DB I Challenge</h2>
  `);
});

server.get("/api/accounts", async (req, res, next) => {
  try {
    const accounts = await accountsDb.find();
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving accounts information"
    });
  }
});

module.exports = server;
