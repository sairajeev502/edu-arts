const { Router } = require('express')
const jwt = require('jsonwebtoken')

const router = Router()

const login_post = async (req, res) => {
    const { email, password } = req.body

    console.log({ email, password })
    
    res.status(200).json({ email, password })
}

router.post('/login', login_post)

module.exports = router
