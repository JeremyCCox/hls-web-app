// pages/api/saveData.js
import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path'
import {Orbit} from "next/dist/compiled/@next/font/dist/google";
import * as Path from "path";

export default async function (req, res) {
    if (req.method === 'GET') {
        // const { data } = req.body;
        const client = new MongoClient(process.env.MONGODB_URI);
        try {
            await client.connect()
            const db = client.db('musicdata');
            const tracks  = await db
                .collection("tracks")
                .find({})
                .toArray()
            // for(const track of trackData){
            //     await fs.readFile(track.data.audio,'utf8' ,async (err, data) => {
            //         if (err) throw err;
            //         track.data.audio = data
            //         res.status(201).json({ message: 'Data fetched successfully!', data:track });
            //     })
            // }
            // console.log(tracks)
            res.status(201).json(tracks)
            // return JSON.parse(JSON.stringify(tracks))
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