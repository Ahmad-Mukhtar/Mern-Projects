const mongoose = require("mongoose");

const movieSchema=new mongoose.Schema({
title:{type:String},
desc:{type:String},
img:{type:String},
imgTitle:{type:String},
imgsm:{type:String},
trailer:{type:String},
video:{type:String},
year:{type:String},
limit:{type:String},
genre:{type:String},
isSeries:{type:Boolean,default:false}
},
{timestamps:true}
)

module.exports=mongoose.model("Movie",movieSchema)