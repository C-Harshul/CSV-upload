const express = require("express");
const router = express.Router();
const Financials = require("../models/financials");
const auth = require("../middleware/authentication")

router.post("/create",auth, async (req, res) => {
  const companyFinancials = new Financials(req.body);
  try {
    await companyFinancials.save();
    res.send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get("/read",auth, async (req, res) => {
  try {
    const query = req.query;
    const companies = await Financials.find(query);
    if (companies.length === 0) {
      res.status(404).send();
    }
    res.send(companies);
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
});

router.patch("/update/:id",auth, async (req, res) => {
  const id = req.params.id;
  const updates = Object.keys(req.body);
  const allowed = ["Revenue_million_USD"];
  const isValidOperation = updates.every((update) => allowed.includes(update));
  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid Updates" });
  }
  try {
    const company = await Financials.findById(id);
    if (company === null) {
      res.status(404).send();
    }
    for (const update of updates) {
      company[update] = req.body[update];
    }
    company.save();
    res.send({ "Update status": "Done" });
  } catch (e) {
    console.log(e);
    res.status();
  }
});

router.delete("/delete/:id",auth,async (req, res) => {
  try {
    const id = req.params.id;
    const company = await Financials.findById(id);
    if (company === null) {
      res.status(404).send();
    }
    company.remove();
    res.send({ "Deletion status": "Done" });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

module.exports = router;
