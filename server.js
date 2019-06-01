const express = require("express");

const accountsDb = require("./data/accounts-model.js");

const server = express();

server.use(express.json());

// your code here
server.get("/", (req, res, next) => {
  res.send(`
  <h1>Lambda Backend/h1>
  <h2>This is Roenz's DB I Challenge</h2>
  `);
});

server.get("/api/accounts", async (req, res) => {
  try {
    const accounts = await accountsDb.find();
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving accounts information"
    });
  }
});

server.get("/api/accounts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const account = await accountsDb.findById(id);
    if (account) {
      res.status(200).json(account);
    } else {
      res.status(404).json({ message: "Invalid ID" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving account information"
    });
  }
});

server.post("/api/accounts", async (req, res) => {
  const account = req.body;
  if (!account.name) {
    res.status(404).json({ message: "Missing account name" });
  } else if (!account.budget) {
    res.status(404).json({ message: "Missing account budget" });
  } else {
    try {
      const addingAccount = await accountsDb.add(account);
      res.status(200).json(addingAccount);
    } catch (err) {
      res.status(500).json({
        message: "Error adding account"
      });
    }
  }
});

server.delete("/api/accounts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const account = await accountsDb.remove(id);
    if (account) {
      res.status(204).json(account);
    } else {
      res.status(404).json({ message: "Invalid ID" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving account information"
    });
  }
});

server.put("/api/accounts/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ message: "missing ID or wrong ID" });
  } else if (!req.body.name || !req.body.budget) {
    res.status(404).json({ message: "Missing name or budget" });
  } else {
    try {
      const updatingAccount = await accountsDb.update(id, req.body);
      res.status(200).json(updatingAccount);
    } catch (err) {
      res.status(500).json({
        message: "Error updating account"
      });
    }
  }
});

module.exports = server;
