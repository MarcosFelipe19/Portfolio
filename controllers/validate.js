const joi = require('@hapi/joi')

const registerValidate = (data)=>{
    
    const schema = joi.object({
        name: joi.string().required().min(3).max(50),
        email:joi.string().required().min(5).max(50),
        password:joi.string().required().min(8).max(200),
        admin: joi.boolean().required()
    })

    return schema.validate(data)

}
const loginValidate = (data)=>{
    
    const schema = joi.object({
        email:joi.string().required().min(5).max(50),
        password: joi.string().required().min(8).max(200)
    })

    return schema.validate(data)
}

const updateValidate = (data)=>{
    const schema =  joi.object({
        title:  joi.string().required().min(3).max(30),
        image: joi.string().required().min(4).max(100),
        address: joi.string().required().min(4).max(100),
    })

    return schema.validate(data) 
}

const newPostValidate = (data)=>{
    const schema =  joi.object({
        title:  joi.string().required().min(3).max(50),
        description:  joi.string().min(3).max(200),
        image: joi.string().required().min(4).max(100),
        address: joi.string().required().min(4).max(100),
    })

    return schema.validate(data)
} 

module.exports.registerValidate = registerValidate
module.exports.loginValidate = loginValidate
module.exports.newPostValidate = newPostValidate
module.exports.updateValidate = updateValidate