const profilemodel = require("../Model/Imagemodel");
const cloudinary = require("../config/Cloudinary");

const newpost = async (req, res) => {
	try {
		const cloudImg = await cloudinary.uploader.upload(req.file.path);

		console.log("first");

		const { course, name, section, summary } = req.body;
		const newfile = await profilemodel.create({
			course,
			name,
			image: cloudImg.secure_url,
			section,
			summary
		});
		res.status(201).json({
			message: "Update posted",
			data: newfile,
		});
	} catch (error) {
		res.status(400).json({
			message: "An error occured while loading",
			data: error.message,
		});
	}
};

const getpost = async (req, res) => {
	try {
		const newpost = await profilemodel.find();

		res.status(201).json({
			message: "Data gotten successfully",
			data: newpost,
		});
	} catch (error) {
		res.status(400).json({
			message: "An error occured",
			data: error.message,
		});
	}
};

const Delete = async (req, res) => {
	try {
		const deletepost = await profilemodel.findByIdAndDelete(req.params.id)

		res.status(201).json({
			message: "Upload deleted",
			data: deletepost
		})
	} catch (error) {
		res.status(400).json({
			message: "failed to delete",
			data: error.message
		})
	}
}

module.exports = { getpost, newpost, Delete };