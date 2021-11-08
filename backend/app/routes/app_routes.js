module.exports = function(app, db) {

};

module.exports = function(app, db) {  
    app.post('/app', (req, res) => {    
    // You'll create your note here.    
        console.log(req.body)
        res.send('Hello')
    });
};