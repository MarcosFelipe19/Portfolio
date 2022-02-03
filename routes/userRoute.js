const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/userControllers')
const cors = require('cors')

router.use(cors())


router.get('/login',express.urlencoded({extended:true}), userControllers.login)
router.get('/all', express.json(), userControllers.allUsers)
router.post('/register',express.json(), userControllers.register )
router.delete('/deleteUser', express.json(), userControllers.deleteUser)


module.exports = router