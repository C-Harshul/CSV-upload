const express = require("express");
require("./db/mongoose");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const csvRoutes = require("./routes/csv");
const crudRoutes = require("./routes/crud")
const userRoutes = require("./routes/user")

app.use("/csv", csvRoutes);
app.use("/crud",crudRoutes)
app.use('/user',userRoutes)
app.listen(port, () => {
  console.log("Server on port" + port);
});
