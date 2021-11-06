const mongoose = require('mongoose')

const strRequired = {
    type: String,
    required: true
}

const courseSchema = new mongoose.Schema({
    name: strRequired,
    phone: strRequired,
    pname: strRequired,
    source: strRequired,
    courses: mongoose.Schema.Types.Mixed,
    address: strRequired,
    dob: strRequired,
    batch: strRequired
})

const Course = mongoose.model('course', courseSchema)

module.exports = Course

