var express = require('express')
var app = express()
var userModel = require('../models/userModule');


exports.logic = async (req, res, next) => {
    var userId;
    let actionType = req.body.actionType;
    if (actionType != null || undefined) {
        switch (actionType) {
            case "find":
                let userData = await userModel.usersModel.find({}).exec()
                if (userData.length > 0) {
                    return res.status(200).send({
                        "outputCode": 200,
                        "message": "Fetched users data successfully",
                        "data": userData
                    })
                } else {
                    return res.status(201).send({
                        "outputCode": 201,
                        "message": "There is no data of users"
                    })
                }
                break;
            case "get":
                userId = req.body.userId;
                if (userId != null) {
                    let getUserData = await userModel.userModel.findById(userId).exec()
                    if (getUserData != undefined) {
                        return res.status(200).send({
                            "outputCode": 200,
                            "message": "Fetched users data successfully",
                            "data": getUserData
                        })
                    } else {
                        return res.status(201).send({
                            "outputCode": 201,
                            "message": "There is no user against this ID"
                        })
                    }
                } else {
                    return res.status(205).send({
                        "outputCode": 205,
                        "message": "Please provide userId"
                    })
                }
                break;
            case "post":
                let name = req.body.name;
                if (name != undefined) {
                    let checkAlreadyExist = await userModel.userModel.findOne({"name":name}).exec()
                    if(checkAlreadyExist === null){
                        let userData = new userModel.userModel({
                            "name": name
                        })
                        await userData.save();
                        return res.status(200).send({
                            "outputCode": 200,
                            "message": "User added successfully",
                            "data": userData
                        })
                    }else{
                        return res.status(205).send({
                            "outputCode":205,
                            "message":"This user already exist"
                        })
                    }
                   
                } else {
                    return res.status(205).send({
                        "outputCode": 205,
                        "message": "Please provide name of user"
                    })
                }
                break;
            case "edit":
                userId = req.body.userId;
                if (userId != undefined) {
                    let userDataUpdate = await userModel.userModel.findById(userId).exec()
                    if (userDataUpdate) {
                        for (let i in req.body) {
                            userDataUpdate[i] = req.body[i]
                        }
                        await userDataUpdate.save();
                        return res.status(200).send({
                            "outputCode": 200,
                            "message": "user updated successfully",
                            "data": userDataUpdate
                        })
                    } else {
                        return res.status(404).send({
                            "outputCode": 404,
                            "message": "Error in updating user data"
                        })
                    }

                } else {
                    return res.status(205).send({
                        "outputCode": 205,
                        "message": "Please provide userId"
                    })
                }
                break;
            case "remove":
                userId = req.body.userId;
                if (userId != undefined) {
                    let userData = await userModel.userModel.findById(userId).exec()
                    if (userData != undefined) {
                        await userModel.userModel.findByIdAndRemove(userId).exec()
                        res.status(200).send({
                            "outputCode": 200,
                            "message": "user successfully removed"
                        })
                    } else {
                        res.status(404).send({
                            "outputCode": 404,
                            "message": "This type of user don't exist or userId is incorrect"
                        })
                    }
                } else {
                    return res.status(205).send({
                        "outputCode": 205,
                        "message": "Please provide userId"
                    })
                }
                break;
            default:
                return res.status(404).send({
                    "outputCode": 404,
                    "message": "Please provide action type"
                })
                break;
        }
    } else {
        return res.status(404).send({
            "outputCode": 404,
            "message": "Please provide action type"
        })
    }


}