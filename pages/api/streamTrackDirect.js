
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg"
import http from 'http'

ffmpeg.setFfmpegPath(ffmpegInstaller.path)

export default async function (req,res){
    if(req.method === "GET"){

        // let filePath = process.env.FILESTORAGE+req.query.filename
        let fileName = "bb788396-05cc-4aa1-bca0-272bad7bedac"
        let filePath = process.env.FILESTORAGE+fileName

       await fs.readFile(filePath, 'utf8',(err,data)=>{
            // console.log(data.substring(0,50));
           if(err){
               console.log(err)
           }
           let buffer = Buffer.from(
               data.split('base64,')[1],
               "base64"
           )
           fs.writeFileSync(process.env.FILESTORAGE+'tempfile.wav',buffer)
                let pseudoData={
                   duration:160.50961451247164,
                   length:7078474,
                   numberOfChannels:2,
                   sampleRate:44100,
               }
               ffmpeg(process.env.FILESTORAGE+'tempfile.wav',{timeout:432000}).addOptions([
                   '-hls_time '+pseudoData.duration,
                   '-f hls'
               ]).output("streamStorage/"+fileName+".m3u8").on('end',()=>{
                   console.log("finished creating stream files")
                   fs.rm(process.env.FILESTORAGE+'tempfile.wav',(err)=>{
                       console.log(err)
                   })
               }).run();

       })

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
        res.status(201).json({message:"Got to end of script?"})

    }else{
        res.status(405)
    }
}