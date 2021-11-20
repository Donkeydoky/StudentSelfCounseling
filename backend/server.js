const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const app            = express();
const db            = require("./config/db");
const path = require('path')
var fs = require("fs");

const port = 8000;

app.use(express.urlencoded({extended: true}));

require('./app/routes')(app, {});app.listen(
    port, () => {  
        console.log('We are live on ' + port);
    }
);

const client = new MongoClient(db.url);
app.route('./app/degree').get(function(req, res) 
    {
        client.connect(url, function(err, db) {
            var cursor = db.collection('degree').find({}).toArray();
            //noinspection JSDeprecatedSymbols
            cursor.each(function(err, item) {

                if (item != null) {
                    str = str + "    degree id " + item._id + "</br>";
                }
            });
            res.send(str);
            console.log(str);
            db.close();
        });
    });

// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("studentSelfConselling");
//     const movies = database.collection("degree");
//     // Query for a movie that has the title 'The Room'
//     const query = { "Degree name": "The Room" };
//     const options = {
//       // sort matched documents in descending order by rating
//       sort: { "imdb.rating": -1 },
//       // Include only the `title` and `imdb` fields in the returned document
//       projection: { _id: 0, title: 1, imdb: 1 },
//     };
//     const movie = await movies.findOne(query);
//     // since this method returns the matched document, not a cursor, print it directly
//     console.log(movie);
//     const findResult = await movies.find({}).toArray();
//     console.log(findResult[1]);
//     var str = "";
//     findResult.forEach(function(err, item) {

//         if (item != null) {
//             str = str + "    degree id " + item._id + "</br>";
//         }
//     });
//     console.log(str)
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);

 app.get('/degree', function (req, res){
     fs.readFile(__dirname + "/" + "/degree.json", 'utf8', function(err, data) {
        console.log( data );
        res.end(data);
     })
 })
 
 var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
    app.use(express.static('../frontend'))
 })

function err(status, msg) {
        var err = new Error(msg);
        err.status = status;
        return err;
}