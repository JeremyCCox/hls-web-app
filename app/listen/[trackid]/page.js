import MusicDisplay from "../../../components/MusicDisplay";
import {MongoClient, ObjectId} from "mongodb";

export default async function Page({params}) {
    const track = await getTrack(params.trackid)

    return (
        <>
            <MusicDisplay track={track}/>
        </>
    )
}
export async function getTrack(trackid){
    const client = new MongoClient(process.env.MONGODB_URI);

    try{
        await client.connect()
        const db = client.db(process.env.DATABASE);
        const tracks  = await db
            .collection("tracks")
            .find({_id:new ObjectId(trackid)})
            .toArray()
        return JSON.parse(JSON.stringify(tracks))[0]

    }catch(err){
        console.error(err)
    }finally{
        await client.close()
    }
}
export async function getAudio(audioId){
    // console.log(audioId)
    // try{
    //     let filePath = "audiofiles/"+audioId
    //     fs.readFile(filePath,(err,data)=>{
    //         return data;
    //     })
    // }catch(err){
    //     console.log(err)
    // }

}