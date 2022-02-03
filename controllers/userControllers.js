const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {registerValidate, loginValidate} = require('./validate')
const express = require('express')


const userController = {
    async login(req, res) {

        const {error} = loginValidate(req.query)
        if(error) return res.status(400).send(error.message)
        
        const selectedUser = await User.findOne({email: req.query.email})
        if(!selectedUser) return res.status(400).send('Email or password incorrect')

        const passwordAndUserMatch  = bcrypt.compareSync(req.query.password, selectedUser.password)
        if(!passwordAndUserMatch) return res.status(400).send('Email or password incorrect')
        
        const token = jwt.sign({id_:selectedUser._id, admin: selectedUser.admin}, process.env.TOKEN, {
            expiresIn: 60*60
        })

        // res.header('authorization-token', token)
        // res.send('user logged')
        res.send(token)
    },  
    async register(req, res) {
        const {error} = registerValidate(req.body)
        if(error) return res.status(400).send(error.message) 

        const selectedUser = await User.findOne({email:req.body.email})
        if(selectedUser) return res.status(400).send('Email já cadastrado!')

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
            admin: req.body.admin
        })

        try {
            const userSave = user.save()
            res.send('Usuário cadastrado com sucesso!')
        } catch (error) {
            res.send('Houve um error')
        }
     },
    async allUsers(req, res){
        
        let users = await User.find({})

        res.json(users)
    },
    async deleteUser(req, res){
        let id = req.body.id
        try {
            const userDelete = await User.findOneAndDelete({ id })
            res.send('Usuário deletado') 
        } catch (error) {
            res.send('algo deu errado')
        }
    }
}

module.exports = userController