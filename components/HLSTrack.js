'use client'
import Hls from "hls.js";
import {forwardRef, useEffect, useRef} from "react";

// export default function HLSTrack(props){
const HLSTrack = forwardRef((props,ref) =>{
    // const videoSource = "http://localhost:3001/"+props.trackId+"/"+props.trackId+".m3u8"; // for using separate HLS server
    const audioSource = "/api/streamDirect/"+props.trackId+"/"+props.trackId+".m3u8";


    useEffect(()=>{
        console.log("Video Source:",audioSource)
        const {current: audio} = ref
        if(!audio) return;
        if (audio.canPlayType("application/vnd.apple.mpegurl")) { // Safari
            audio.src = audioSource;
        }else
        if(Hls.isSupported()){
            const hls = new Hls();
            hls.loadSource(audioSource)
            hls.attachMedia(audio)
            return()=>{
                hls?.destroy();
            }
        }
    },[audioSource])


    return(
            <audio ref={ref} controls>
            </audio>
    )
});
export default HLSTrack;