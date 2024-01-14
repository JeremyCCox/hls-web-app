import MusicDisplay from "../../../components/MusicDisplay";
import {MongoClient, ObjectId} from "mongodb";
import fs from "fs";

export default async function Page({params}) {
    const track = await getTrack(params.trackid)

    return (
        <>
            <MusicDisplay track={track}/>
        </>
    )
}
export async function getTrack(trackid){
    try{
        const client = new MongoClient(process.env.MONGODB_URI);
        const db = client.db('musicdata');
        const tracks  = await db
            .collection("tracks")
            .find({_id:new ObjectId(trackid)})
            .toArray()
        // console.log(tracks)
        return JSON.parse(JSON.stringify(tracks))[0]

    }catch(err){
        console.error(err)
    }
}
