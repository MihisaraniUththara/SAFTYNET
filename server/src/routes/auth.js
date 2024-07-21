const { Router } = require('express')
const router = Router()

router.get('/register', (req, res) => {
    return res.send('hell yeah!')
})

module.exports = router