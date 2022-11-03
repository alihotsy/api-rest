const { Schema, model } = require('mongoose');

const UniversitySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true
    }
}, {timestamps:true, versionKey:false });

module.exports = model('universidade', UniversitySchema);