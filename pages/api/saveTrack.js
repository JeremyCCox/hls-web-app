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

        try {
            let randomName = crypto.randomUUID()
            console.log(process.env.FILESTORAGE+randomName)
            fs.writeFile(process.env.FILESTORAGE+randomName,data.audio,(err)=>{
                if(err) {
                    console.log("error is:")
                    console.log(err)
                    throw new Error("Something went wrong")
                }
                console.log("File saved")
            })

            data.audio = randomName
            await client.connect()
            const db = client.db('musicdata');
            let queryResult = await db.collection('tracks').insertOne({data})

            res.status(201).json({ message: 'Data saved successfully!',data:queryResult});
        } catch (error) {
            console.error("Savetrack Error",error)
            res.status(500).json({ message: 'Something went wrong!' });
        } finally {
            console.log("closing")
            await client.close();
        }
    } else {
        res.status(405).json({ message: 'Method not allowed!' });
    }
}