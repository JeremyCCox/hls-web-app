// pages/api/saveData.js
import { MongoClient } from 'mongodb';

export default async function (req, res) {
    if (req.method === 'GET') {
        // const { data } = req.body;
        const client = new MongoClient(process.env.MONGODB_URI);

        try {
            const db = client.db('musicdata');
            const tracks  = await db
                .collection("tracks")
                .find({})
                // .sort()
                // .limit(20)
                .toArray()
            
            res.status(201).json({ message: 'Data fetched successfully!', data:tracks });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong!' });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ message: 'Method not allowed!' });
    }
}