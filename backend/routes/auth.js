const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    obj = {
        a: 'Best',
        number: 28
    }
    res.json(obj)
})

module.exports = router