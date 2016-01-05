var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var middleware = require('./middleware');
var _ = require('underscore');

var todos =[];
var todoNextId = 1;

app.use(bodyParser.json());
app.use(middleware.requireAuth);

app.get('/todos', function(req, res){
    res.json(todos);
});

app.get('/todos/:id', function(req, res){
    //res.send('About Us');
    //res.sendFile(__dirname +'/public' + '/about.html');
    
    //getting id
    var todoId = parseInt(req.params.id);
        //console.log(todoId);
    var idfound = _.findWhere(todos, {id: todoId});;
    //looping an array items
    
    
    
    todos.forEach(function(v, i){
        console.log(v.id);
        if(v.id === todoId){
            idfound = v;
            //console.log(idfound);
        }
        else{
            //res.status(404).send();
        }
    });
        
        if(idfound){
            res.json(idfound);
        }else{
            res.status(404).send();
            //res.status(404).send();
        }
    
    //res.send('Asking todo id is '+ req.params.id)
});

//POST
app.post('/todos', function(req, res){
    var body = req.body;
    body.id = todoNextId++;
    todos.push(body);
    //console.log('descrption '+ body.description)
    res.json(body);
});

app.use(express.static(__dirname + '/public'));

var port = 3000;

app.listen(port, function(){
    console.log('Port running on '+ port + ' Running ');
}
    );