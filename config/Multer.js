const multer = require("multer");
const path = require("path")
console.log(path)

const Storage = multer.diskStorage({
  destination: (
    req,
    file,
    cb
  ) => {
    cb(null, path.join(__dirname, "../Uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
// const filefilter = (req, file, cb) => {
// 	if (
// 		file.minetype === "/jpg" ||
// 		file.minetype === "/png" ||
// 		file.minetype === "/jpeg"
// 	) {
// 		cb(null, true);
// 	}
// };

const imageUploader = multer({
	storage: Storage,
	// fileFilter: filefilter,
	// limits: {
	// 	fileSize: 1024 * 1024 * 2,
	// },
}).single("image");

module.exports = imageUploader;