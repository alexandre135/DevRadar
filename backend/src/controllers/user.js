const axios = require('axios')
const user = require('../models/user')
const stringToArray = require('../utils/stringToArray')
const { findConnections, sendMessage } = require('../webSocket')

module.exports ={
    async getAll(req, res){
        const listAll = await user.find()
        
        return res.status('200').json(listAll)
    },

    async saveUser(req, res){
        const { github_username, techs, latitude, longitude } = req.body
        
        let userCreate = await user.findOne({ github_username })
        console.log(userCreate)

        if(!userCreate){
            const arrayTechs = stringToArray(techs)
        
            const gitResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            const {name = login, bio, avatar_url} = gitResponse.data

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            userCreate = await user.create({
                github_username,
                name,
                bio,
                avatar_url,
                techs: arrayTechs,
                location
            })

            //filtra conexoes para websocket

            const sendSocketMessageTo = findConnections( { latitude, longitude }, arrayTechs )
            sendMessage(sendSocketMessageTo, 'newUser', userCreate)

        }
        return res.status('200').json(userCreate)
    },

}