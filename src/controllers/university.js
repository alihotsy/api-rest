const { response } = require("express");
const University = require("../../models/university");

const createUniversity = async(req, res = response) => {
    const { name, address, phone } = req.body;
    const university = new University({name,address,phone});
    await university.save();
    res.json(university)
}

const getAllUniversities = async(req, res = response) => {

    const [total,universities] = await Promise.all([
        University.countDocuments(),
        University.find()
      ]);
   
      res.json({
        total,
        universities
      })
};

const updateUniversity = async(req, res = response) => {

    const { id } = req.params;
    const { name, address, phone } = req.body;

    const [findUniversityByName, findUniversityByPhone] = 
           await Promise.all([
            University.findOne({name}),
            University.findOne({phone})
           ])
    //Permite validar y en consecuencia actualizar el correo sin que se repita de otro cliente. 
     //También si el correo viejo coincide con el nuevo, de todas formas lo actualiza: es como
     //si no se hubiera actualizado.
    
    if(id === findUniversityByName?._id.toString() || !findUniversityByName) {
        // const university = await University.findByIdAndUpdate(id,{name,address,phone});
        if(id === findUniversityByPhone?._id.toString() || !findUniversityByPhone) {
            const university = await University.findByIdAndUpdate(id,{name,address,phone});
            return res.json(university);
        }
           return res.status(400).json({
                msg:'Este teléfono ya existe de otra universidad. No se puede actualizar'
            })
        // return res.json(university);
    }
 
    res.status(400).json({
        msg:'Este nombre ya existe de otra universidad. No se puede actualizar'
    })
};

module.exports = {
    createUniversity,
    getAllUniversities,
    updateUniversity
}