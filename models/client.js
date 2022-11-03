const { Schema, model } = require('mongoose');

const ClientSchema = new Schema({
    name:{
        type:String,
        required:[true, 'El nombre es requerido']
    },
    email:{
        type:String,
        required:[true, 'El email es requerido'],
        unique:true
    },

},{timestamps:true, versionKey:false});

module.exports = model('cliente', ClientSchema);