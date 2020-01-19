const users = require('../models/user')
const stringToArray = require('../utils/stringToArray')


module.exports = {
    async search(req, res){
        const { latitude, longitude, techs } = req.query
        const techsArray = stringToArray(techs)

        const returnSearch = await users.find({
            techs:{
                $in: techsArray,
            },
            location:{
                $near:{
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000,
                }
            }
        })

        return res.json({ returnSearch })
    }
}