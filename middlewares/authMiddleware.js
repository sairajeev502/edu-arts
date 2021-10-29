const jwt = require('jsonwebtoken')
const Student = require('../models/Student')
const Admin = require('../models/Admin')

const checkAdmin = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'thoorigaii', async (err, decodedToken) => {
            if (err) {
                console.log(err)
                next()
            } else {
                let admin = await Admin.findById(decodedToken.id)
                if (admin)
                    next()
                else
                    res.redirect('/adminLogin')
            }
        })
    } else {
        res.redirect('/adminLogin')
    }
}
const checkStudent = (req, res, next) => {
	const token = req.cookies.jwt
	if (token) {
		jwt.verify(token, 'thoorigaii', async (err, decodedToken) => {
			if (err) {
				console.log(err.message)
				res.locals.student = null
				next()
			} else {
				let stud = await Student.findById(decodedToken.id)
				res.locals.student = stud
				next()
			}
		})
	} else {
		res.locals.student = null
		if (req.originalUrl === '/') {
			next()
		}
		res.redirect('/login')
	}
}

module.exports = { checkStudent, checkAdmin }
