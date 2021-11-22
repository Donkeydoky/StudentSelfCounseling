const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
var fs = require("fs");
const DownloadFile = "dowloadFile.json";
const uploadFile = "dowloadFile.json";

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./frontend"));

var server = app.listen(8001, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});

app.get("/api/degree", function (req, res) {
  fs.readFile(
    __dirname + "/" + "./app/resources/degree.json",
    "utf8",
    function (err, data) {
      degree = JSON.parse(data);
      // console.log(data);
      // console.log(degree);
      res.end(data);
    }
  );
});

app.get("/api/program/:id", function (req, res) {
  const { id } = req.params;
  fs.readFile(
    __dirname + "/" + "./app/resources/program-course.json",
    "utf8",
    function (err, data) {
      var programs = JSON.parse(data);
      const program = programs.filter((item) => item.id == id);
      // console.log(program[0]["Children"]);
      var pro = JSON.stringify(program[0]["Children"]);
      // console.log(pro);
      res.end(pro);
    }
  );
});

// save the data into local server response the the parsing data back
app.post("/save", (req, res) => {
  //console.log('Got body:', req.body);
  let data = JSON.stringify(req.body);
  //console.log(data);
  fs.writeFile(
    __dirname + "/" + "app/resources/temp/" + DownloadFile,
    data,
    function (err) {
      if (err) return console.log(err);
      console.log("tempfile.json saved");
    }
  );

  res.end(JSON.stringify({ path: "/save-get" }));
});

app.get("/save-get", (req, res) => {
  const file = `${__dirname}/app/resources/temp/${DownloadFile}`;
  res.download(file);
});

// default options
app.use(fileUpload());
// upload file and save it to the local server, then parse it to send back
app.post("/upload", function (req, res) {
  console.log(req.files.name);
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + "/app/resources/temp/" + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
    // res.send('/upload-get');
    fs.readFile(
      __dirname + "/app/resources/temp/" + sampleFile.name,
      "utf8",
      function (err, data) {
        degree = JSON.parse(data);
        // console.log(data);
        // console.log(degree);
        res.end(data);
      }
    );
  });
});

app.get("/upload-get", function (req, res) {
  let sampleFile;
  sampleFile = req.files.sampleFile;
  fs.readFile(
    __dirname + "/app/resources/temp/" + sampleFile.name,
    "utf8",
    function (err, data) {
      degree = JSON.parse(data);
      //console.log(data);
      //console.log(degree);
      res.end(data);
    }
  );
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
