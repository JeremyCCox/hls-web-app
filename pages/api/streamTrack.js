import { MongoClient } from 'mongodb';
import fs from 'fs';

export default async function (req, res) {
    if (req.method === 'GET') {
        // const { data } = req.body;
        const client = new MongoClient(process.env.MONGODB_URI);
        try {
            // const db = client.db('musicdata');
            // const trackData  = await db
            //     .collection("tracks")
            //     .find({})
            //     .toArray()
            // let track = trackData[0]
            console.log("Data: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            console.log(process.cwd())
            fs.readdir(".",(err,data)=>{
                console.log(data)
            })
            fs.readdir("./audiofiles/",(err,data)=>{
                console.log(data)
            })
            let filePath = process.env.FILESTORAGE+req.query.filename
            // let filePath = "12b5f1fa-722f-4ce8-8b7f-531017ce9494"
            fs.stat(filePath,(err,stats)=>{
                if(err){
                    console.log(err);
                }
                // console.log(stats)
                res.writeHead(201)
                let readStream = fs.createReadStream(filePath)
                readStream.pipe(res)
                // // const range = req.headers.range;
                // const fileSize = stats.size;
                // const chunkSize = 1024 * 1024;
                // const start = 5;
                // const end = Math.min(start + chunkSize, fileSize - 1);
                //
                // const headers = {
                //     "Content-Type": "audio/wav",
                //     "Content-Length": end - start,
                //     "Content-Range": "bytes " + start + "-" + end + "/" + fileSize,
                //     "Accept-Ranges": "bytes",
                // };
                // res.writeHead(206, headers);
                // // console.log(track.data.audio)
                // const fileStream = fs.createReadStream("12b5f1fa-722f-4ce8-8b7f-531017ce9494", { start, end });
                // const ffmpegStream = ffmpeg(fileStream)
                //     .format('wav')
                //     .on('end', () => {
                //         console.log('Streaming finished');
                //     })
                //     .on('error', (err) => {
                //         console.error("thrown",err);
                //     });
                //
                // ffmpegStream.pipe(res);


            });
            // console.log("end")
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Something went wrong!' });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ message: 'Method not allowed!' });
    }
}