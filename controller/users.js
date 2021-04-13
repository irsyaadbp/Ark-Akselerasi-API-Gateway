const apiAdapter = require("../helper/apiAdapter");
const jwt = require("jsonwebtoken");
const FormData = require("form-data");

const cloudinary = require("cloudinary").v2;
const upload = require("../helper/upload");

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

exports.updateProfile = async (req, res) => {
  try {
    // If just x-www-form-urlencoded
    const user = await api.put(`/users/${req.params.id}`, req.body);

    // Start FormData
    // const formData = new FormData();

    // if (req.file) {
    //   formData.append("image", req.file);
    // }

    // for (let key in req.body) {
    //   formData.append(key, req.body[key]);
    // }

    // console.log(formData);

    // const user = await api.put(`/users/${req.params.id}`, formData);
    // END FormData

    // START WITH CLOUDINARY
    // jika menggunakan cloudinary, berarti untuk di setiap service yang menggunakan multer di hilangkan saja
    // karena upload sudah dihandle oleh cloudinary, tinggal kirim string url image nya aja

    // const filePath = await upload(req.file.path);

    // console.log(filePath.url);

    // const user = await api.put(`/users/${req.params.id}`, {
    //   ...req.body,
    //   image: filePath.url,
    // });
    // END WITH CLOUDINARY

    return res.json(user.data);
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
