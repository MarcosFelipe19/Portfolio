const express = require('express')
const router = express()
const auth = require('../controllers/authController')
const cors = require('cors')

router.use(cors())

router.get('/', auth, (req, res)=>{
    
    if(req.user.admin){
        res.json({admin:req.user.admin})
    }else{
        res.status(400).send('acesso negado!')
    }
})

module.exports = router