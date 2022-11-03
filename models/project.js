const { Schema, model} = require('mongoose');

const ProjectSchema = new Schema({
    number: {
        type:Number,
        required:[true, 'El número es requerido'],
        unique:true,
    },
    title: {
        type:String,
        required:[true, 'El título es requerido'],
    },
    initialDate: {
        type:Date,
        required:[true, 'La fecha de inicio es requerido'],
    },
    finalDate: {
        type:Date,
        required:[true, 'La fecha final es requerido'],
    },
    value: {
        type:Number,
        required:[true, 'El valor es requerido'],
    },
    client: {
        type: Schema.ObjectId, ref: "cliente",
        required: true
    },
    projectType: {
        type: Schema.ObjectId, ref: "tipoproyecto",
        required: true
    },
    university: {
        type: Schema.ObjectId, ref: "universidade",
        required: true
    },
    stage: {
        type: Schema.ObjectId, ref: "etapa",
        required: true
    },
}, {timestamps:true, versionKey:false});

module.exports = model('Proyecto',ProjectSchema);