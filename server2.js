var express = require('express');

var app = express();

var middleware = {
    requireAuthentication : function(req, res, next){
        console.log('Private Route Hit');
        next();
    },
    logger : function(req, res, next){
        console.log(req.method+' '+req.originalUrl);
        next();
    }
}

app.use(middleware.requireAuthentication, middleware.logger);

app.get('/', function(req,res){
    res.send('Hello Express');
    //req.send('Hello Express');
    //console.log("got a Response");
})

app.get('/aboutus', function(req,res){
    res.send
    
    ('Hello About Us');
    //console.log("got a Response");
})



app.listen(3000, function(){
    console.log('Express Server Started!');
});