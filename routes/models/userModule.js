var mongoose = require('mongoose');

var userModuleSchema = new mongoose.Schema({
    "name":{type:String},
    "email":{type:String},
    "contactNumber":{type:String},
    "password":{type:String},
    "personalDetails":{type:Object}
})

var usersModel = mongoose.model('users',userModuleSchema);

module.exports={
    "usersModel":usersModel
}