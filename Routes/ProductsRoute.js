const express = require('express');
const router = express.Router();

router.get('/all', (req,res)=>{
    res.send("ALL");
})

router.get('/add', (req,res)=>{
    res.send("Add");
})

module.exports = router;