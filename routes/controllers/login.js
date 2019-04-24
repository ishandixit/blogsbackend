
var bcrypt = require('bcryptjs');
var profileModel = require('../models/userModule')


exports.logic = async (req, res) => {
    try {
        if (Object.keys(req.body).length > 0) {
            console.log(req.body,"-------")
            if (req.body.name != null || req.body.email != null) {
                if (req.body.password != null) {
                    let userData = await profileModel.usersModel.findOne({
                        "email": req.body.email
                    }).exec()
                    if (userData !== null) {
                        console.log(userData)
                        let userPassword = await bcrypt.compare(req.body.password, userData.password)
                        console.log(userPassword)                        
                        if (userPassword) {
                            console.log(userPassword)
                            return res.status(200).send({
                                "outputCode": 200,
                                "message": "User successfully logged in",
                                "userData": userData
                            })
                        } else {
                            return res.status(205).send({
                                "outputCode": 205,
                                "message": "User password does not match"
                            })
                        }
                    } else {
                        return res.status(204).send({
                            "outputCode": 204,
                            "message": "Error in getting user data/userNmae or emailAddress is not correct"
                        })
                    }
                } else {
                    return res.status(202).send({
                        "outputCode": 202,
                        "message": "Please provide password for login"
                    })
                }
            } else {
                return res.status(201).send({
                    "outputCode": 201,
                    "message": "Please provide userName/emailAddress for login"
                })
            }
        } else {
            return res.status(205).send({
                "outputCode": 205,
                "message": "Please provide data in body"
            })
        }
    } catch (error) {
        return res.status(300).send({
            "outputCode": 300,
            "message": "Error in logic of login api",
            "error": error
        })
    }
}