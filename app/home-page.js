'use client'
import {useEffect, useState} from "react";
import Link from "next/link";

export default function HomePage(){
    const [testAudio,setTestAudio] = useState("")
    const [done,setDone] = useState(false)
    const handleClick=()=>{
        fetch('/api/streamTrack?filename=',{
            method:"GET",
            headers:{
                Accept:"text/event-stream"
            }
        }).then(async res => {
            let reader = res.body.getReader();

            while (true) {
                const {done, value} = await reader.read();
                if (done) {
                    setDone(true)
                    break;
                }
                setTestAudio((prevData) => prevData + new TextDecoder().decode(value));
            }

        }).then(data=>{
            // setTestAudio(data.data.data.audio)

            // console.log(blob);
        }).catch(err=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        console.log(testAudio)
    },[testAudio])
    return (
        <div>
            <Link href={"/first"} >First</Link>
            <label>
                <Link href={"/listen"}>Listen</Link>
            </label>

            <audio src={done?testAudio:""} controls> </audio>
            <input type={"button"} onClick={handleClick}/>
        </div>
    );
}