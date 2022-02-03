const jwt = require('jsonwebtoken')

module.exports = (req, res, next)=>{
    const token = req.header('authorization-token')
    if(!token) return res.status(400).send('access Danied')

    try {
        const userVerify = jwt.verify(token, process.env.TOKEN)
        req.user = userVerify
        next()
    } catch (error) {
        res.status(401).send('access Danied')
    }
}