// pages/api/saveData.js
import {MongoClient} from 'mongodb';
// import * as mongodb from "mongodb";
import { Readable } from 'stream'
import * as mongodb from "mongodb";
import fs from 'fs'

export default async function (req, res) {
    if (req.method === 'POST') {

        const { data } = req.body;

        const client = new MongoClient(process.env.MONGODB_URI);

        try {

            // let randomName = crypto.randomUUID()
            // fs.writeFile(randomName,data.audio,'base64',(err)=>{
            //     if(err) throw new Error("Something went wrong")
            //     console.log("File saved")
            // })
            //
            // data.audio = randomName
            // await client.connect()
            // const db = client.db(process.env.DATABASE);
            // await db.collection('tracks').insertOne({data})

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