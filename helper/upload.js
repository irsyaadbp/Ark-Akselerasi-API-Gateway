const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CD_CLOUD_NAME,
  api_key: process.env.CD_API_KEY,
  api_secret: process.env.CD_SECRET,
});
const upload = (file, options) => {
  let config = { use_filename: true };

  if (options) {
    config.options = options;
  }
  return cloudinary.uploader.upload(file, config);
};

module.exports = upload;
