const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const strRequired = {
    type: String,
    required: true
}

const studentSchema = new mongoose.Schema({
    name: strRequired,
    email: strRequired,
    password: strRequired
})

studentSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt()
	this.password = await bcrypt.hash(this.password, salt)
	next()
})

studentSchema.statics.login = async function (email, password) {
	const student = await this.findOne({ email })
	if (student) {
		const auth = await bcrypt.compare(password, student.password)
		if (auth)
			return student
		throw Error('Incorrect Password')
	}
	throw Error('Incorrect Email')
}

const Student = mongoose.model('student', studentSchema)

module.exports = Student
