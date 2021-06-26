const express = require("express");
require("./db/mongoose");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const csvRoutes = require("./routes/csv");

app.use("/csv", csvRoutes);

app.listen(port, () => {
  console.log("Server on port" + port);
});
