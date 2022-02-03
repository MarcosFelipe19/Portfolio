const express = require('express')
const router = express.Router()
const cors = require('cors')
const workControler = require('../controllers/workController')
const uploadWork = require('./midlleware/uploadImages')

// const options ={
//     origin:"file:///C:/Users/Felipe/Documents/Trabalho/Portf%C3%B3lio-2/Portfolio/public/index.html",
//     optionsSuccessStatus: 200,
// }

router.use(cors())

router.get('/size', workControler.size)

router.get('/newListWork/:start/:end', workControler.newListWork)
router.get('/all', workControler.allPosts)
router.post('/newPost', uploadWork.single('image'), workControler.newPost)
router.delete('/deletePost', workControler.deletePost)
router.put('/updatePost', workControler.updatePost)

module.exports =  router