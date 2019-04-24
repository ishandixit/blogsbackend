var mongoose = require('mongoose');

var blogsSchema = new mongoose.Schema({
    "name":{type:String},
    "userId":{type:mongoose.Schema.Types.ObjectId,ref:"users"}
})

var blogsModel = mongoose.model('blogs',blogsSchema);

module.exports={
    "blogsModel":blogsModel
}