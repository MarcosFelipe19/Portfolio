const res = require('express/lib/response')
const Work = require('../model/Works')
const { updateValidate, newPostValidate } = require('./validate')
const fs = require('fs')
const { createConnection } = require('net')


const workControler = {
    async size(req, res) {
        let workAll = await Work.find({})

        if (workAll.length > 0) {
            res.json({ size: workAll.length })
        } else {
            res.json({ size: 1 })
        }
    },
    async newListWork(req, res) {
        let start = req.params.start
        let end = req.params.end

        const workAll = await Work.find({})

        if (workAll.length > 0) {
            if (workAll.length < end) end = workAll.length
            const newListWork = workAll.slice(start, end)
            res.json(newListWork)
        } else {
            res.send("No registered objects!")
        }

    },
    newPost(req, res) {
        if (!req.file) {
            return res.status(400).send('imagem inválida')
        }

        req.body.description = (req.body.description) ? req.body.description : 'false'
        req.body.image = req.file.filename

        const { error } = newPostValidate(req.body)
        if (error) return res.status(400).send('Campos inválidos')

        let work = new Work({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            address: req.body.address
        })

        try {
            const workSave = work.save()
            res.json({ admin: true })
        } catch (error) {
            res.send("algo deu errado!")
        }


    },
    async deletePost(req, res) {
        let id = req.body.id
        const path =  "./public/assets/projetos/images/" + req.body.image

        try {
            let ok;
            fs.access(path, fs.constants.F_OK, (err) => {
                if(err){
                    console.log(err)
                }else{
                    fs.unlink(path, function(err){
                        if(err){
                           console.log(err)
                        }
                    }) 
                }
            })

            const postDelete = await Work.findOneAndDelete({ id })
            res.send('post deletado') 
        } catch (error) {
            res.send('algo deu errado')
        }
    },
    async updatePost(req, res) {
        let id = req.body.id
        let description = (req.body.description) ? req.body.description : null
        try {
            const postUpdate = await Work.findOneAndUpdate({ id },
                { title: req.body.title, description: description, image: req.body.image, address: req.body.address })
            res.send(postUpdate)
        } catch (error) {
            res.send(error)
        }

    },
    async allPosts(req, res){

        let posts = await Work.find({})

        res.json(posts)
    }
}

module.exports = workControler