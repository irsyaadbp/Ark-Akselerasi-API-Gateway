const express = require("express");
const userRoutes = require("./users");
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "This app is service user for coffee apps",
  });
});

router.use("/users", userRoutes);

router.all("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Url is not valid, please check the documentation",
  });
});

module.exports = router;
