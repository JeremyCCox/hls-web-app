'use client'


import {useEffect, useState} from "react";
import Hls from "hls.js";

export default function Dev(){
    const [vidSrc,setVidSrc] = useState("")
    const test = ()=>{
        console.log("test")
        fetch("/api/streamTrackDirect",{
            method:"GET",
        }).then(res=>{
            if(res.ok){
                return res.json()
            }
        }).then(data=>{
            console.log(data)
        }).catch(err=>{
            console.log(err)
        })
    }

    const video = document.getElementById("video")
    useEffect(()=>{
        if(Hls.isSupported()){
            let hls = new Hls();
            hls.loadSource(vidSrc)
            hls.attachMedia(video)
        }
    },[vidSrc])

    return(
        <>
            <input type={"button"} onClick={test}/>
            <video id={"video"}></video>
        </>
    )
}