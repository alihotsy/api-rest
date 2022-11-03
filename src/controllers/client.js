const { response } = require("express");
const Client = require("../../models/client");

const createClient = async(req,res = response ) => {
    
     const { name, email } = req.body;
     const client = new Client({name,email});
     await client.save();
     res.json(client)
}

const getAllClients = async(req,res = response) => {
   
   const [total,clients] = await Promise.all([
     Client.countDocuments(),
     Client.find()
   ]);

   res.json({
     total,
     clients
   })
}

const updateClient = async(req,res = response) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const findClientByEmail = await Client.findOne({ email});

    //Permite validar y en consecuencia actualizar el correo sin que se repita de otro cliente. 
     //También si el correo viejo coincide con el nuevo, de todas formas lo actualiza: es como
     //si no se hubiera actualizado.
    
    if(id === findClientByEmail?._id.toString() || !findClientByEmail) {
        const updateClient = await Client.findByIdAndUpdate(id,{name,email});
        return res.json(updateClient)
    }
 
    res.status(400).json({
        msg:'El email ya existe de otro cliente. No se puede actualizar'
    })

    

}

module.exports = {
    createClient,
    getAllClients,
    updateClient,
}