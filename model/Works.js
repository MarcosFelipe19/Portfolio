const mongoose = require('mongoose')

const workSchema = mongoose.Schema({
    title:{type: String, required: true, minlength:3, maxlength:50},
    description:{type: String, minlength: 3, maxlength:200},
    image: {type:String, required: true, minlength:4, maxlength:100},
    address:{type:String, required:true, minlength:3, maxlength:100},
    createAt:{type:Date, default: Date.now}
})

module.exports = mongoose.model('Work', workSchema)

