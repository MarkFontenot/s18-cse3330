const Hapi = require('hapi');

//init server
//add connection 
const server = new Hapi.Server({
    port: 8000, 
    host: 'localhost'
});

//dynamic route: 
server.route({
    method: 'GET',
    path:'/user/{name}',
    handler: function(request, h){
        console.log('server processing a /{name} request');
        return('Hello '+ request.params.name);
    }	
});

//home Route 
server.route({
    method: 'GET',
    path:'/',
    handler: function(request, h){
        console.log('server processing a / request');
        return('<h1>Hello,World</h1>');
    }	
});

//start server 
server.start((err)=>{
    if (err){ 
        throw err;
    }   
}
,console.log(`Server Running At:`, server.info.uri)
);

