// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const url = "mongodb://localhost/emailTestingDB";
// const lifeURI =
// 	"mongodb+srv://uniabuja-server:uniabuja-server@cluster0.8usbdhw.mongodb.net/server?retryWrites=true&w=majority";

// const router = require("../Routes/EmailRoutes")
// const imagerouter = require("../Routes/Imagerouter");
// const userRouter = require("../Routes/userroute")

// const port = 3030;

// const app = express();
// mongoose.connect(lifeURI).then(() => {
// 	console.log("connected");
// });

// app.use(express.json());
// app.use(cors());

// app.use("/api", router);
// app.use("/api/image", imagerouter);
// app.use("/api/user", userRouter)

// app.listen(port, () => {
// 	console.log(`listenning on ${port}`);
// });




const nodemailer = require("nodemailer")
const express = require("express")
const multer = require("multer")
const bodyParser = require("body-parser")
const fs = require("fs")
const app = express()
app.use(express.json())



app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var to;
var subject;
var body;
var path;

var Storage = multer.diskStorage({
	destination:function(req, file, callback){
		callback(null, "./Images")
	},
	filename:function(req, file, callback) {
		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
	}
})

var upload = multer({
	storage: Storage
}).single("image")

app.use(express.static("public"))

app.get("/", (req, res) => {
	res.sendFile("/index.html")
})

app.post("/sendemail", (req, res) => {
	//execute this middleware to upload the image

	upload(req, res,function(err){
		if(err){
			console.log(err)
			return res.end("Something went wrong")
		} else {
			to = req.body.to
			subject = req.body.subject
			body = req.body.body

			path = req.file.path

			console.log(to)
			console.log(subject)
			console.log(body)
			console.log(path)

			var transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					user: "okwolig12@gmail.com",
					pass: "mamamatthew69"
				}
			})

			var mailOptions = {
				from: "okwolig12@gmail.com",
				to: to,
				subject: subject,
				text: body,
				attachments: [
					{
						path: path
					}
				]
			}

			transporter.sendMail(mailOptions, function(err, info){
				if(err){
					console.log(err)
				} else {
					console.log("Email sent" + info.response)

					fs.unlink(path, function(err){
						if(err) {
							return res.end(err)
						} else {
							console.log("deleted")
							return res.redirect("/result.html")
						}
					})
				}
			})
		}
	})
})


app.listen(5000, () => {
	console.log("Server is up and running")
})