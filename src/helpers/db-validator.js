const Client = require("../../models/client");
// const Project = require("../../models/project");
const ProjectType = require("../../models/project-type");
const Stage = require("../../models/stage");
const University = require("../../models/university");



 const projectTypeExistsByName= async(nombre='') => {

    const projectType = await ProjectType.findOne({nombre});
   //  const projectTypes = await ProjectType.find();
   

    if(projectType){
        throw new Error(`El tipo de proyecto ${nombre} ya existe!`);
    }
   //  if(projectNames.includes(p)){
   //     throw new Error(`El tipo de proyecto ${nombre} ya existe!`);
   //  }
 }

 const projectTypeExistsById = async(id = "") => {
   try {
      if(!id) {
         return
      }
      const projectType = await ProjectType.findById(id);
      if(!projectType) {
        throw new Error(`No existe este tipo de proyecto con ID = ${id}`);
      }
      
   } catch (error) {
      throw new Error(`No existe este tipo de proyecto con ID = ${id}`)
   }
 }
 const clientExistsById = async(id = "") => {
   try {
      if(!id) {
         return
      }

      const client = await Client.findById(id);
      if(!client) {
        throw new Error(`No existe el cliente con ID = ${id}`);
      }
      
   } catch (error) {
      throw new Error(`No existe el cliente con ID = ${id}`)
   }
 }

 const clientExistsByEmail = async(email="", req) => {
   
    const client = await Client.findOne({email});
    if(client) {
      throw new Error(`El email ${email} ya existe. Intenta otro`)
    }
 }

 const stageExistsByName= async(name='') => {

   const stage = await Stage.findOne({name});

  
   if(stage){
       throw new Error(`El tipo de proyecto ${name} ya existe!`);
   }

}

const stageExistsById = async(id = "") => {
   try {

      if(!id) {
         return
      }

      const stage = await Stage.findById(id);
      if(!stage) {
        throw new Error(`No existe esta etapa con ID = ${id}`);
      }
      
   } catch (error) {
      throw new Error(`No existe esta etapa con ID = ${id}`);
   }
 }

 const universityExistsByName= async(name='') => {

   const university = await University.findOne({name});

  
   if(university){
       throw new Error(`La universidad con nombre ${name} ya existe!`);
   }

}

const universityExistsByPhone= async(phone='') => {

   const university = await University.findOne({phone});

  
   if(university){
       throw new Error(`Ya existe una universidad con teléfono = ${phone}`);
   }

}

const universityExistById = async(id = '') => {
   try {

      if(!id) {
         return
      }

      const university = await University.findById(id);
      if(!university) {
        throw new Error(`No existe esta universidad con ID = ${id}`);
      }
      
   } catch (error) {
      throw new Error(`No existe esta universidad con ID = ${id}`);
   }
}




 
 module.exports = {
    projectTypeExistsByName,
    projectTypeExistsById,
    clientExistsByEmail,
    clientExistsById,
    stageExistsByName,
    stageExistsById,
    universityExistsByName,
    universityExistsByPhone,
    universityExistById
 }