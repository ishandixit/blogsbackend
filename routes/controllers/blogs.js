var express = require('express')
var app = express()
var bandsModel = require('../models/blogs');


exports.logic=async(req,res,next)=>{
    var bandId;
    let actionType = req.body.actionType;
    if(actionType != null || undefined){
        switch (actionType) {
            case "find":
                let bandsData = await bandsModel.blogsModel.find({}).exec()
                if(bandsData.length > 0){
                    return res.status(200).send({
                        "outputCode":200,
                        "message":"Fetched blogs data successfully",
                        "data":bandsData
                    })
                }else{
                    return res.status(201).send({
                        "outputCode":201,
                        "message":"There is no data of blogs"
                    })
                }
                break;
            case "get":
            bandId = req.body.bandId;
            if(bandId != null){
                let getBandData = await bandsModel.blogsModel.findById(bandId).exec()
                if(getBandData != undefined){
                    return res.status(200).send({
                        "outputCode":200,
                        "message":"Fetched blogs data successfully",
                        "data":getBandData
                    })
                }else{
                    return res.status(201).send({
                        "outputCode":201,
                        "message":"There is no blogs against this ID"
                    })
                }
            }else{
                return res.status(205).send({
                    "outputCode":205,
                    "message":"Please provide blogId"
                })
            }           
                break;
            case "post":
                let name = req.body.name;
                if(name != undefined){
                    // let checkAlreadyExist = await bandsModel.blogsModel.findOne({"name":name}).exec()
                    // if(checkAlreadyExist === null){
                        let bandData = new bandsModel.blogsModel({
                            "name":name
                        })
                        await bandData.save();
                        return res.status(200).send({
                            "outputCode":200,
                            "message":"Band added successfully",
                            "data":bandData
                        })
                    // }else{
                    //     return res.status(205).send({
                    //         "outputCode":205,
                    //         "message":"This band already exists"
                    //     })
                    // }
                }else{
                    return res.status(205).send({
                        "outputCode":205,
                        "message":"Please provide name of band"
                    })
                }
                break;
            case "edit":
            bandId = req.body.bandId;
                if(bandId != undefined){
                    let bandDataUpdate = await bandsModel.blogsModel.findById(bandId).exec()
                    if(bandDataUpdate){
                        for(let i in req.body){
                            bandDataUpdate[i] = req.body[i]
                        }
                        await bandDataUpdate.save();
                        return res.status(200).send({
                            "outputCode":200,
                            "message":"Band updated successfully",
                            "data":bandDataUpdate
                        })
                    }else{
                        return res.status(404).send({
                            "outputCode":404,
                            "message":"Error in updating band data"
                        })
                    }
                    
                }else{
                    return res.status(205).send({
                        "outputCode":205,
                        "message":"Please provide bandId"
                    })
                }
                break;
            case "remove":
            bandId = req.body.bandId;
            if(bandId != undefined){
                let getBandData = await bandsModel.blogsModel.findById(bandId).exec()
                if(getBandData != undefined){
                    let removeBand = await bandsModel.blogsModel.findByIdAndRemove(bandId).exec()
                    res.status(200).send({
                        "outputCode":200,
                        "message":"Band successfully removed"
                    })
                }else{
                    res.status(404).send({
                        "outputCode":404,
                        "message":"This type of band don't exist or bandId is incorrect"
                    })
                }
            }else{
                return res.status(205).send({
                    "outputCode":205,
                    "message":"Please provide bandId"
                })
            }
                break;
            default:
                break;
        }
    }else{
        return res.status(404).send({
            "outputCode":404,
            "message":"Please provide action type"
        })
    }
    
    
}