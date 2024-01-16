import MusicDisplay from "../../components/MusicDisplay";
import Tracklist from "../../components/Tracklist";
import {MongoClient} from "mongodb";

export default async function Page() {
    // const tracks = await getTracks()
    return (
        <>
            <Tracklist />
        </>
    )
}

export async function getTracks(){
    const client = new MongoClient(process.env.MONGODB_URI);
    try{
        await client.connect()
        const db = client.db('musicdata');
        const tracks  = await db
            .collection("tracks")
            .find({})
            .toArray()
        return JSON.parse(JSON.stringify(tracks))

    }catch(err){
        console.error(err)
    }finally {
        await client.close()
    }
}