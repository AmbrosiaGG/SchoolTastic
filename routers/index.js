const express = require("express")
const router = express.Router()

router.get('/', async (req, res) => {
    res.render('../views/index.ejs', {
        title: process.env.title
    })
})

router.get('/login', async (req, res) => {
    res.render('../views/login.ejs', {
        title: process.env.title
    })
})

module.exports = router