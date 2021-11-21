const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const app            = express();
const db            = require("./config/db");
const bodyParser    = require("body-parser");
const path = require('path')
var fs = require("fs");

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

var server = app.listen(8001, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
    app.use(express.static('../frontend'))
 })

app.get('/api/degree', function (req, res){
     fs.readFile(__dirname + "/" + "/degree.json", 'utf8', function(err, data) {
        console.log( data );
        res.end(data);
     })
 })

app.get('/api/program/:id', function (req, res){
     const { id } = req.params;
     fs.readFile(__dirname+"/"+"/program-course.json", 'utf8', function (err, data){
         var programs = JSON.parse(data);
         const program = programs.filter(item=>item.id==id);
         var pro = JSON.stringify(program);
         console.log(programs);
         res.end(pro);
     })
 })

 app.post('/api/save', function(req, res){

 })

//  const client = new MongoClient(db.url);
//  app.route('./app/degree').get(function(req, res) 
//      {
//          client.connect(url, function(err, db) {
//              var cursor = db.collection('degree').find({}).toArray();
//              //noinspection JSDeprecatedSymbols
//              cursor.each(function(err, item) {
 
//                  if (item != null) {
//                      str = str + "    degree id " + item._id + "</br>";
//                  }
//              });
//              res.send(str);
//              console.log(str);
//              db.close();
//          });
//      });