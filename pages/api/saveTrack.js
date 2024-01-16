import {MongoClient} from 'mongodb';
import fs from 'fs'

// const app = express()
export const config = {
    api: {
        bodyParser: {
            sizeLimit:'4gb'
        },
    },
};

export default async function handler (req, res) {



    if (req.method === 'POST') {

        const data = req.body;

        const client = new MongoClient(process.env.MONGODB_URI);
        fs.readdir("./audiofiles/",(err,data)=>{
            console.log(data)
        })
        try {
            let randomName = crypto.randomUUID()
            fs.writeFile("app/"+process.env.FILESTORAGE+randomName,data.audio,(err)=>{
                if(err) throw new Error("Something went wrong")
                console.log("File saved")
                fs.readdir(".",(err,data)=>{
                    console.log(data)
                })
            })

            data.audio = randomName
            await client.connect()
            const db = client.db('musicdata');
            await db.collection('tracks').insertOne({data})

            res.status(201).json({ message: 'Data saved successfully!'});
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Something went wrong!' });
        } finally {
            console.log("closing")
            await client.close();
        }
    } else {
        res.status(405).json({ message: 'Method not allowed!' });
    }
}