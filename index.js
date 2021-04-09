require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./router");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("This is api gateway for Coffee shop app");
});
