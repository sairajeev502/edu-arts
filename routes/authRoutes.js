const { Router } = require('express')
const jwt = require('jsonwebtoken')

const Student = require('../models/Student')
const Admin = require('../models/Admin')
const Course = require('../models/Course')
const router = Router()

const handleErrors = (err) => {
    let errors = { email: '', password: '' }

    if (err.message === 'Incorrect Email') {
        errors.email = err.message
        return errors
    }
    if (err.message === 'Incorrect Password') {
        errors.password = err.message
        return errors
    }
    return errors
}

const maxAge = 3 * 24 * 60 * 60

const createToken = (id) =>
    jwt.sign({ id }, "thoorigaii", {
        expiresIn: maxAge,
    })

const login_post = async (req, res) => {
    const { email, password } = req.body

    try {
        const stud = await Student.login(email, password)
        if (stud) {
            const token = createToken(stud._id)
            res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
            res.status(200).json({ stud: stud._id })
        } else {
            throw Error("Wrong credentials")
        }
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ err: errors })
    }
}

const register_post = async (req, res) => {
    try {
        const stud = await Student.create(req.body)
        res.status(200).json({ stud: stud._id })
    } catch (e) {
        res.status(400).json({ e })
    }
}

const admin_login = async (req, res) => {
    const { email, password } = req.body

    try {
        const admin = await Admin.login(email, password)
        if (admin) {
            const token = createToken(admin._id)
            res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
            res.status(200).json({ admin: admin._id })
        } else {
            throw Error("Wrong credentials")
        }
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ err: errors })
    }
}

const courseRegister = async (req, res) => {
    try {
        const course = await Course.create(req.body)
        res.status(200).json({ id: course._id })
    } catch (e) {
        res.status(400).json({ e })
    }
}

router.post('/login', login_post)
router.post('/adminlogin', admin_login)
router.post('/register', register_post)
router.post('/course', courseRegister)

module.exports = router
