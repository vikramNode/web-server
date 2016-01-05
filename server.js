var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var middleware = require('./middleware');
var _ = require('underscore');

var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());
app.use(middleware.requireAuth);

app.get('/todos', function (req, res) {
    var queryParams = req.query;
    console.log(queryParams);
    var filteredTodos = todos;    
    
    if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'true'){
        filteredTodos = _.where(filteredTodos, {completed: true});
        res.json(filteredTodos);
    }
    else if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'false'){
        filteredTodos = _.where(filteredTodos, {completed: false});
        res.json(filteredTodos);
    }else{
        res.json(todos);
    }
    
});

app.get('/todos/:id', function (req, res) {
    //getting id
    var todoId = parseInt(req.params.id);
    //console.log(todoId);
    
    //looping an array items
    var idfound = _.findWhere(todos, {
        id: todoId
    });
    
  
    if (idfound) {
        res.json(idfound);
    } else {
        res.status(404).send();
        //res.status(404).send();
    }

    //res.send('Asking todo id is '+ req.params.id)
});

//POST
app.post('/todos', function (req, res) {
    var body = _.pick(req.body, 'description', 'completed');
    
    if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
        return res.status(400).send();
    }
        
    body.description = body.description.trim();
    
    body.id = todoNextId++;
    todos.push(body);
    //console.log('descrption '+ body.description)
    res.json(body);
});


//Delete Method
app.delete('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id);
    var deleteIdFound = _.findWhere(todos, {
        id: todoId
    });
    //console.log(deleteIdFound);
   
    if (deleteIdFound) {
        todos = _.without(todos, deleteIdFound);
        res.json(deleteIdFound);
    } else {
        res.json({"error":"No Todo Found"})
        res.status(404).send();
        //res.status(404).send();
    }
});


//PUT Method  todos/:id/1
app.put('/todos/:id', function(req, res){
    
    var body = _.pick(req.body, 'description', 'completed');
    var todoId = parseInt(req.params.id);
    var putIdFound = _.findWhere(todos, {
        id: todoId
    });
    
    if(!putIdFound){
        return res.status(400).send();
    }
    
    
    var validAttributes = {};
    
    if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
        validAttributes.completed = body.completed;
        res.b
    } else if(body.hasOwnProperty('completed')){
        return res.status(400).send();
    } else{
        
    }
    
    if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0){
        validAttributes.description = body.description;
    } else if(body.hasOwnProperty('description')){
        return res.status(400).send();
    } else{
        
    }
    
    var putId = _.extend(putIdFound, validAttributes);
    res.json(putId);
});



app.use(express.static(__dirname + '/public'));

var port = 3000;

app.listen(port, function () {
    console.log('Port running on ' + port + ' Running ');
});