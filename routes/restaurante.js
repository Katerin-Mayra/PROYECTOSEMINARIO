var express = require("express");

var router = express.Router();
var REST= require("../database/restaurante");

router.get("/restaurante",(req,res)=>{
 //filtrar
    //http://localhost:8000/api/1.0/restaurante?
    var filter={};
    var params=req.query;
    var select="";
   
    var order = {};
    //filtrar un nombre
    //http://localhost:8000/api/1.0/restaurante?name=kati
    if(params.name != null){
        var expresion=new RegExp(params.name);
        filter["name"]=expresion;
       
    }
    //filtrar mas datos
    //http://localhost:8000/api/1.0/restaurante?name=kati&filters=name,nit
    if(params.filters != null){
        select =params.filters.replace(/,/g, " ");
    }
     //filtrar el orden segun el nombre
     //http://localhost:8000/api/1.0/restaurante?filters=name,nit&agegt=10&&agelt=60&order=name,1
     //(-1) de Z a A o 9 a 0    ,(1) de A a Z o 0 a 9

    if (params.order != null) {
        var data = params.order.split(",");
        var number = parseInt(data[1]);
        order[data[0]] = number;
    }



    //muestro los datos get de usuario
   REST.find(filter).//filtro de nombre
   select(select). //filtro de mas datos
   sort(order).  //filtro ordenar segun el parametro y el numero
   exec((err,docs)=>{
       if(err){
           res.status(500).json({msn:"Error en el servidor"});
           return;
       }
       res.status(200).json(docs);
       return;
   });
});

router.post("/restaurante",(req,res)=>{
    var RESTRest =req.body;
    var RESTDB=new REST (RESTRest);
    RESTDB.save((err,docs)=>{
        if (err) {
            var errors = err.errors;
            var keys = Object.keys(errors);
            var msn = {};
            for (var i = 0; i < keys.length; i++) {
                msn[keys[i]] = errors[keys[i]].message;
            }
            res.status(500).json(msn);
            return;
        }
        res.status(200).json(docs);
        return;
    })
});

router.put("/restaurante",(req,res)=>{
    var params=req.query;
    var bodydata=req.body;
    if(params.id == null){
        res.status(300),json({msn: "EL parametro ID es necesario"});
        return;
    }
    //creamos filtros para put que es lo que puedo hacer q se actualize
    var allowkeylist = ["name","nit", "direccion", "telefono"];

    var keys = Object.keys(bodydata);
    var updateobjectdata = {};
    //filtrar los datos que no necestito que se actualize
    for (var i = 0; i < keys.length; i++) {
        if (allowkeylist.indexOf(keys[i]) > -1) {  //con indexOF busca la llave
            updateobjectdata[keys[i]] = bodydata[keys[i]];
        }
    }
    //actualizamos los datos
    REST.update({_id: params.id},{$set: updateobjectdata}, (err, docs) => {
        if (err) {
            res.status(500).json({msn: "Existen problemas en la base de datos"});
             return;
         } 
         res.status(200).json(docs);
    });
});

router.delete("/restaurante",(req,res)=>{
    var params = req.query;
    if (params.id == null) {
        res.status(300).json({msn: "El parámetro ID es necesario"});
        return;
    }
    REST.remove({_id: params.id}, (err, docs) => {
        if (err) {
            res.status(500).json({msn: "Existen problemas en la base de datos"});
             return;
         } 
         res.status(200).json(docs);
    });
});

module.exports = router;