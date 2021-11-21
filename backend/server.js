const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const app            = express();
const fileUpload = require('express-fileupload');
const bodyParser    = require("body-parser");
var fs = require("fs");

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./frontend'));

var server = app.listen(8001, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

 })

app.get('/api/degree', function (req, res){
     fs.readFile(__dirname + "/" + "/degree.json", 'utf8', function(err, data) {
        degree = JSON.parse(data);
        console.log( data );
        console.log(degree);
        res.end(data);
     })
 })

app.get('/api/program/:id', function (req, res){
     const { id } = req.params;
     fs.readFile(__dirname+"/"+"/program-course.json", 'utf8', function (err, data){
         var programs = JSON.parse(data);
         const program = programs.filter(item=>item.id==id);
         console.log(program[0]["Children"]); 
         var pro = JSON.stringify(program[0]["Children"]);
         console.log(pro);
         res.end(pro);
     })
 })

 app.post('/api/save', function(req, res){

 })

 // default options
app.use(fileUpload());

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/somewhere/on/your/server/' + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});


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