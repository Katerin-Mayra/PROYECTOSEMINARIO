//CREAR EL ESQUEMA ESTRUCTURA DE LA TABLA


var mongoose= require("./connect"); //conectar con el connect.js
var USERSCHEMA =new mongoose.Schema({
    name:String,
    lastname:String,
    age:Number,
    date:Date
    
});
var USER = mongoose.model("user",USERSCHEMA);
module.exports=USER;
