// 'use server'
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg"
import http from 'http'

// ffmpeg.setFfmpegPath(ffmpegInstaller.path)

export default async function Page(req,res){
    if(req.method === "GET"){
        // console.log("ada")
        let filePath = "streamStorage/"+req.url.split("/")[3]+"/"+req.url.split("/")[4]
        console.log(filePath)

        fs.readFile(filePath, function(error, content) {
            res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
            if (error) {
                if(error.code == 'ENOENT'){
                    fs.readFile('./404.html', function(error, content) {
                        res.end(content, 'utf-8');
                    });
                }
                else {
                    res.writeHead(500);
                    res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    res.end();
                }
            }
            else {
                res.end(content, 'utf-8');
            }
        });
        // let filePath = process.env.FILESTORAGE+req.query.filename
        // let filePath = process.env.FILESTORAGE+req.query.filename
        // let fileName = "bb788396-05cc-4aa1-bca0-272bad7bedac.m3u8"
        // let filePath = "streamStorage/"+req.url.split("/").pop()
        //
        // fs.readFile(filePath, (err,data)=>{
        //     // console.log(data.substring(0,50));
        //     if(err){
        //         console.log(err)
        //         // res.end("")
        //     }else{
        //         res.end(data,'utf-8')
        //     }
        // })
        // res.status(200)
        // let pseudoData={
        //     duration:160.50961451247164,
        //     length:7078474,
        //     numberOfChannels:2,
        //     sampleRate:44100,
        // }
        // ffmpeg(filePath,{timeout:432000}).addOptions([
        //     '-hls_time '+pseudoData.duration,
        //     '-f hls'
        // ]).output("streamStorage/"+fileName+".m3u8").on('end',()=>{
        //     console.log("finished creating stream files")
        // }).run();

        // fs.stat(filePath,(err,stats)=> {
        //     if (err) {
        //         console.log(err);
        //     }
        //     console.log(stats)
        // })
    }else{
        res.status(405)
    }
}