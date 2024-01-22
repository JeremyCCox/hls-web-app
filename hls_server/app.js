const express = require('express')
const HlsServer = require('hls-server')
const cors = require('cors')
const http = require('http')
const fs = require('fs')
const app = express()
const port = 3001;


http.createServer(function (request, response) {
    // console.log('request starting...');
    var filePath = 'streamStorage/' + request.url;
    console.log(filePath)
    fs.readFile(filePath, function(error, content) {
        response.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        }
        else {
            response.end(content, 'utf-8');
        }
    });

}).listen(port);
console.log(`Server running at http://127.0.0.1:${port}/`);
//
//
//
// // let server = http.createServer()
// // let hls = new HlsServer(server,{
// //     path:"/stream",
// //     dir:"/streamStorage"
// // })
// // server.listen(port)
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });
// // app.use(cors({origin:"*",method:"*",headers:"*"}))
// // app.options("*", (req,res)=>{
// //     res.setHeader("Access-Control-Allow_Origin","all")
// //     res.setHeader("Access-Control-Allow_Headers","*")
// //     res.setHeader("Access-Control-Allow_Methods","*")
// // })
// app.get('/',(req,res)=>{
//     res.send("test")
// })
//
// let server = app.listen(port,"localhost",()=>{
//     console.log('Listening on port ', port)
// })
//
// new HlsServer(server,{
//     provider:{
//         exists:(req,cb)=>{
//             const ext = req.url.split('.').pop();
//             if( ext !== 'm3u8' && ext !== 'ts' ){
//                 return cb(null,true)
//             }
//
//             fs.access("streamStorage"+req.url, fs.constants.F_OK, (err)=>{
//                 if(err){
//                     console.log("File doesn't exist")
//                     return cb(null,false)
//                 }
//                 cb(null,true)
//             });
//
//         },
//         getManifestStream:(req,cb) =>{
//             const stream = fs.createReadStream("streamStorage"+req.url)
//             cb(null,stream)
//         },
//         getSegmentStream:(req,cb) =>{
//             const stream = fs.createReadStream("streamStorage"+req.url)
//             cb(null,stream)
//         }
//     }
// })
