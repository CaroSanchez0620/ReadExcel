const express     = require('express');  
const mongoose    = require('mongoose');  
const multer      = require('multer');  
const path        = require('path');  
const userModel    = require('./models/userModel');  
const excelToJson = require('convert-excel-to-json');
const bodyParser  = require('body-parser');  
const storage = multer.diskStorage({  
destination:(req,file,cb)=>{  
cb(null,'./public/uploads');  
},  
filename:(req,file,cb)=>{  
cb(null,file.originalname);  
}  
});  
var uploads = multer({storage:storage});  
//coneccion a la base de datos
mongoose.connect('mongodb+srv://Carolina:Caro0620@clustermongo.hfqna.mongodb.net/empleado',{
    useNewUrlParser:true,
    useUnifiedTopology:true})  
.then(()=>console.log('Coneccion a base de datos'))  
.catch((err)=>console.log(err))  
//inicio de aplicacion  
var app = express();  
//set the template engine  
app.set('view engine','ejs');  
//obtiene los datos 
app.use(bodyParser.urlencoded({extended:false}));  
//carpeta 
app.use(express.static(path.resolve(__dirname,'public')));  
//route for Home page
app.get('/', (req, res) => {
res.sendFile(__dirname + '/archivo.component.html');
});
// Upload excel file and import to mongodb
app.post('/uploadfile', upload.single("uploadfile"), (req, res) =>{
importExcelData2MongoDB(__dirname + '/uploads/' + req.file.filename);
console.log(res);
});
// Import Excel File to MongoDB database
function importExcelData2MongoDB(filePath){
// -> Read Excel File to Json Data
const excelData = excelToJson({
sourceFile: filePath,
sheets:[{
// Excel Sheet Name
name: 'Empleado',
// Header Row -> be skipped and will not be present at our result object.
header:{
rows: 1
},
// Mapping columns to keys
columnToKey: {
A: 'Fecha_Ingreso',
B: 'Id_Empleado',
C: 'Cedula',
D: 'Correo_Electronico',
E: 'N_SeguroSocial',
F: 'Empresa',
G: 'Puesto',
H: 'id_Datos_Generales'
}
}]
});
// -> Log Excel Data to Console
console.log(excelData);
 
// Insert Json-Object to MongoDB
userModel.insertMany(jsonObj,(err,data)=>{  
if(err){  
console.log(err);  
}else{  
res.redirect('/');  
}  
}); 
fs.unlinkSync(filePath);
}
//assign port  
//var port = process.env.PORT || 3000;  
//app.listen(port,()=>console.log('server run at port '+port));  