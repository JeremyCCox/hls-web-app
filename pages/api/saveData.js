// pages/api/saveData.js
import { MongoClient } from 'mongodb';
import * as mongodb from "mongodb";
import { Readable } from 'stream'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { data } = req.body;

        const client = new MongoClient(process.env.MONGODB_URI);

        try {
            await client.connect()
            const db = client.db('musicdata');
            await db.collection('tracks').insertOne({data})

            res.status(201).json({ message: 'Data saved successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong!' });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ message: 'Method not allowed!' });
    }
}