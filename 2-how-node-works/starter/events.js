const EventEmitter = require("events");
const http = require('http')
class Sales extends EventEmitter{
    constructor(){
        super();
    }
}
const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log(`A new sale has been made!`);
});
myEmitter.on("newSale", () => {
  console.log(`Customer name: Jonas`);
});

myEmitter.on("newSale", stock =>{
    console.log(`there are now ${stock} items are left in stock`)
})

myEmitter.emit("newSale", 9);


///////////////

const  server = http.createServer();
server.on('request', (req,res)=>{
    console.log('Request Revceived ')
    console.log(req.url)
    res.end('Request Revceived') //send response to client
})

server.on('request', (req,res)=>{
    console.log('Another Request Revceived') //send response to client
})
server.on('close', ()=>{
    console.log('Server is closing...')
})
server.listen(8000, "127.0.0.1", ()=>{
    console.log('Server listening on port ', 'localhost:'+8000)
})