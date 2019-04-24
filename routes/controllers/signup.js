var express = require('express')
var app = express()
var bcrypt = require('bcryptjs');
var randomstring = require("randomstring");
var profileModel = require('../models/userModule')
let tempPassword = "1234"
let salt = 10;
exports.logic = async (req, res) => {
    try {
        let data = req.body
        console.log(data,"  data")
        let signUpSuccess;
        let password
        let checkForAlreadyExists = await profileModel.usersModel.findOne({
            "email": data.email
        }).lean().exec()
        if (checkForAlreadyExists == null || checkForAlreadyExists == undefined) {
            if(data.password !== null){
                console.log(data.password,"  password")
                password = await bcrypt.hash(data.password, salt)
                console.log(password)
            }else{
                console.log(tempPassword)
                password = await bcrypt.hash(tempPassword, salt)
                console.log(password)
            }          

            if (data != null || data != undefined || data != "") {
                    signUpSuccess = new profileModel.usersModel({
                        "name": data.name,
                        "email": data.email,
                        "password": password,
                        "contactNumber":data.contactNumber
                    })
                    await signUpSuccess.save()
                    return res.status(200).send({
                        "outputCode": 200,
                        "message": "user successfully signed up ",
                        "data": signUpSuccess
                    })
                
               
            } else {
                return res.status(300).send({
                    "outputCode": 300,
                    "message": "Please provide data in the body"
                })
            }
        } else {
            return res.status(201).send({
                "outputCode": 201,
                "message": "looks like you are already registered"
            })
        }

    } catch (error) {
        return res.status(300).send({
            "outputCode": 300,
            "message": "internal db error",
            "error":error
        })
    }
}