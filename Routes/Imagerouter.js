const express = require("express")
const { getpost, newpost, Delete } = require("../Controller/Imagecontroller")
const uploader = require("../config/Multer")
const imagerouter = express.Router()

imagerouter.route("/getall").get(getpost)
imagerouter.route("/create").post(uploader, newpost)
imagerouter.route("/delete/:id").delete(Delete)

module.exports = imagerouter