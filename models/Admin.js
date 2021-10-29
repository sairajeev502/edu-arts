const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const strRequired = {
    type: String,
    required: true
}

const adminSchema = new mongoose.Schema({
    email: strRequired,
    password: strRequired,
})

adminSchema.statics.login = async function (email, password) {
    const admin = await this.findOne({ email })
    if (admin) {
        const auth = await bcrypt.compare(password, admin.password)
        if (auth) 
            return admin
        throw Error('Incorrect Password')
    }
    throw Error('Incorrect Email')
}

const Admin = mongoose.model('admin', adminSchema)

module.exports = Admin
