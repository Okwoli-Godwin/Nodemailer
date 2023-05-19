const mongoose = require("mongoose")

const mySchema = mongoose.Schema({
    course: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    }
})

const profilemodel = mongoose.model("myProfile", mySchema)

module.exports = profilemodel