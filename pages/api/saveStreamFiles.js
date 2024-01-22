import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg"
import http from 'http'

ffmpeg.setFfmpegPath(ffmpegInstaller.path)
export default async function (req,res){
    if(req.method === "GET"){

        let fileName = req.query.filename
        let trackLength= req.query.trackLength;
        let filePath = process.env.FILESTORAGE+fileName
        // let filePath = process.env.FILESTORAGE+fileName
        console.log(filePath)
        await fs.readFile(filePath, 'utf8',(err,data)=>{
            // console.log(data.substring(0,50));
            if(err){
                console.log("Error here!")
                console.log(err)
            }
            let buffer = Buffer.from(
                data.split('base64,')[1],
                "base64"
            )
            fs.writeFileSync(process.env.FILESTORAGE+'tempfile.wav',buffer)
            fs.mkdirSync("streamStorage/"+fileName)
            let pseudoData={
                duration:160.50961451247164,
                length:7078474,
                numberOfChannels:2,
                sampleRate:44100,
            }
            ffmpeg(process.env.FILESTORAGE+'tempfile.wav',{timeout:432000}).addOptions([
                '-profile:v baseline',
                // '-level: 3.0',
                '-start_number 0',
                '-hls_list_size 0',
                '-hls_time 20',
                '-f hls'
            ]).output("streamStorage/"+fileName+"/"+fileName+".m3u8").on('end',()=>{
                console.log("finished creating stream files")
                res.status(200)
                fs.rm(process.env.FILESTORAGE+'tempfile.wav',(err)=>{
                    console.log(err)
                })
            }).run();
        })
        // res.status(200)
    }else(
        res.status(405)
    )
}