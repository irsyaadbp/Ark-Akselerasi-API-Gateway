const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    callback(null, fileName);
  },
});

const upload = multer({
  //multer settings
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  limits: {
    fileSize: 4 * 1000 * 1000, //expect 4mb
  },
});

const formMiddleware = (req, res, next) => {
  const multerUpload = upload.single("image");
  multerUpload(req, res, function (err) {
    if (err) {
      // A Multer error occurred when uploading.
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    // Everything is fine
    next();
  });
};

module.exports = formMiddleware;
