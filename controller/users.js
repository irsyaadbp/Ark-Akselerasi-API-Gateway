const apiAdapter = require("../helper/apiAdapter");
const jwt = require("jsonwebtoken");

const api = apiAdapter(process.env.URL_SERVICE_USER);
exports.register = async (req, res) => {
  try {
    const user = await api.post("/users/register", req.body);

    return res.json(user.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(500).json({
        success: false,
        message: "Service unavailable",
      });
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await api.post("/users/login", req.body);

    const data = user.data.result;

    const token = jwt.sign({ data }, process.env.SECRET_TOKEN, {
      expiresIn: "1d",
    });

    return res.json({
      success: true,
      message: "Login success",
      result: {
        ...data,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    if (error.code === "ECONNREFUSED") {
      return res.status(500).json({
        success: false,
        message: "Service unavailable",
      });
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await api.get(`/users/${req.params.id}`);

    return res.json(user.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(500).json({
        success: false,
        message: "Service unavailable",
      });
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
