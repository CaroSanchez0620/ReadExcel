var mongoose  =  require('mongoose');  
   
var excelSchema = new mongoose.Schema({  
    'Fecha_Ingreso':{
        prop:'Fecha_Ingreso',
        type: String,
        required: true
    },
    'Id_Empleado':{
        prop:'Id_empleado',
        type: String,
        required: true
    },
    'Cedula':{
        prop:'Cedula',
        type: String,
        required: true
    },
    'Correo_Electronico':{
        prop:'Correo_Electronico',
        type:String,
        required: true
    },
    'N_SeguroSocial':{
        prop:'N_SeguroSocial',
        type:String,
        required: true
    },
    'Empresa':{
        prop:'Empresa',
        type:String,
        required: true
    },
    'Puesto':{
        prop:'Puesto',
        type:String,
        required: true
    },
    'Id_Datos_Generales':{
        prop:'Id_Datos_Generales',
        type:String,
        required: true
    }
});  
   
module.exports = mongoose.model('userModel',excelSchema);  