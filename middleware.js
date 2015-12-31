//adding middleware
var middleware = {
    requireAuth: function(req, res, next){
        var date = new Date;
        console.log(req.method + ' '+ req.originalUrl+' '+ date);
        console.log("Private Route Hit");
        next();
    }
};

module.exports = middleware;