'use client'
import styled from "styled-components";
import {useEffect, useReducer, useRef, useState} from "react";
import MP3Tag from "mp3tag.js";
import { ID3Writer } from 'browser-id3-writer';
// import Image from "next/image"
// import pauseButton from "/assets/pause.png"
import Buffer from "buffer";
import {act} from "react-dom/test-utils";
import {appendMutableCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";
import {
    DisplayBody,
    InfoDisplay,
    InfoInput,
    LoadButton,
    MusicBox,
    MusicInfo,
    PlayButton
} from "./MusicDisplayComponents";
import Navigator from "./Navigator";
import HLSTrack from "./HLSTrack";




const trackReducer = (state,action) =>{
    switch (action.type){
        case("setAttrib"):
            return {
                ...state,
                [action.attrib]: action.value
            }
        case("setTags"):
            return {
                ...state,
                title: action.tags.title,
                artist: action.tags.artist,
                album: action.tags.album,
                genre: action.tags.genre,
                comment: action.tags.comment,
                year: action.tags.year,
                track: action.tags.track

            }
        case("change"):
            return {
                ...state,
                [action.tag]:action.value
            }
        case("replace"):
            return(action.value)
        case("buildAudio"):
            console.log(state)
            return{
                // action.value
                state
            }
    }
}

const trackInitializer=(initialTrack)=>{
    // console.log(initialTrack)
    return{
        name:initialTrack.data.name,
        title: initialTrack.data.title,
        artist: initialTrack.data.artist,
        album: initialTrack.data.album,
        genre: initialTrack.data.genre,
        comment: initialTrack.data.comment,
        image: initialTrack.data.image,
        year: initialTrack.data.year,
        track: initialTrack.data.track,
        trackId:initialTrack._id,
        audioId:initialTrack.data.audio,
        // trackdata:initialTrack.data.trackdata,
    }
}
const audioReducer=(state,action)=>{
    switch(action.type){
        case("append"):
            return(state + action.value)
        case("reset"):
            return("")

    }
}
const audioInitializer = (audioId)=>{
    console.log(audioId)
    return("")
}

function MusicDisplay(props){
    const [track, trackDispatch] = useReducer(trackReducer,props.track,trackInitializer)
    const [audio, audioDispatch] = useReducer(audioReducer,props.audio,audioInitializer)
    const audioRef = useRef(null);
    // const [audio, audioDispatch] = useReducer(trackReducer, "",undefined)
    // const [audio, setAudio] = useState()

    const getImage=(file)=>{
        let reader = new FileReader()
        reader.onload=()=>{
            let buffer = reader.result
            let writer = new ID3Writer(buffer)
            writer.setFrame('TIT2','SAWEADWADSA')
            // let img= document.createElement("img")
            // img.onloadend=()=> {
            //     let canvas = document.createElement("canvas");
            //     let ctx = canvas.getContext("2d");
            //     canvas.height = 360;
            //     canvas.width = 360;
            //
            //     ctx.drawImage(img, 0, 0, 360, 360);
            //
            //     let uri = canvas.toDataURL();
            //     console.log("imgUri", uri)
            //     trackDispatch({type: "setAttrib", attrib: "image", value: uri})
            // }
            // img.src= "data:"+apic.format+";base256,"+apic.data;
            writer.addTag()
            console.log(writer.frames)
            setBuffer(writer.arrayBuffer);
        }
        // let blob = new Blob(apic.data)
        reader.readAsArrayBuffer(file)
        // (apic.data)

    }

    const writeMetaData= async ()=> {
        return new Promise((resolve)=>{
            // let writer = new ID3Writer(buffer)
            // let imgBuffer = Buffer.from(track.image)
            // console.log(imgBuffer)
            // writer.setFrame('APIC', {
            //     type: 0,
            //     data: imgBuffer,
            //     description: 'Super picture',
            // })
            // writer.addTag()


            // let imgBlob = new Blob([mp3Tag.tags.v2.APIC[0].data], { type: mp3Tag.tags.v2.APIC[0].format })
            //
            //
            // let reader = new FileReader()
            // reader.onloadend=()=>{
            //     trackDispatch({type:"change",tag:"image",value:reader.result})
            //     console.log(reader.result)
            // }
            // reader.readAsDataURL(imgBlob)
            let mp3Tag = new MP3Tag(buffer)
            mp3Tag.read()
            mp3Tag.tags.album = track.album
            mp3Tag.tags.artist = track.artist
            mp3Tag.tags.track = track.track
            mp3Tag.tags.title = track.title
            mp3Tag.tags.year = track.year
            mp3Tag.tags.comment = track.comment
            mp3Tag.tags.genre = track.genre
            trackDispatch({type: "setTags", tags: mp3Tag.tags})
            mp3Tag.save()
            if(mp3Tag.error!==""){
                console.log("Error: ",mp3Tag.error)
            }
            // let blob = new Blob([mp3Tag.buffer])
            // let a = document.createElement("a");
            // a.download=track.name
            // a.href= window.URL.createObjectURL(blob)
            // document.body.appendChild(a)
            // a.click()
            // a.remove()
            resolve(mp3Tag.buffer)
        });
    }
    const saveChanges= async ()=>{
        // console.log(track.audio)
        fetch('/api/saveTrack',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({data:track})
        }).then(res=>{
            if(res.ok){
                return res.json();
            }else{
                return res.status;
            }
        }).then(data=>{
            console.log("Data: ",data);
        }).catch(err=>{
            console.log(err)
        })
    }
    const [done, setDone] = useState(false)

    const getTrack= async()=>{
        if(audio !== undefined){
            fetch('/api/streamTrack?filename='+track.audioId,{
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
                    audioDispatch({type:"append",value: new TextDecoder().decode(value)});
                }

            }).catch(err=>{
                console.log(err)
            })
        }

        // writeMetaData().then(res=> {
        //     setBuffer(res)
        // })
    }
    const saveAudio=()=>{
        console.log(track)
        const formData = new FormData();
        // formData.append('blob', new Blob([track.audio]))
        fetch("/api/saveTrack",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(track)
        }).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }
    const changeTag=(e)=>{
        trackDispatch({type:"change",tag:e.target.id,value:e.target.value})
    }
    const [paused, setPaused] = useState(true)
    useEffect(()=>{
        if(paused){
            audioRef.current.pause()
        }else{
            audioRef.current.play()
        }
    },[paused])

    return(
        <>
            <Navigator/>
            <DisplayBody>
            <MusicBox url={track.image}  >
                <PlayButton onClick={()=>{setPaused(!paused)}} paused={paused}/>
                {/*{audio===""?<LoadButton onClick={getTrack}/>:<PlayButton onClick={()=>{setPaused(!paused)}} paused={paused}/>}*/}
            </MusicBox>
            {/*{track.audio !== undefined?*/}
            {/*    <audio id={"trackAudio"} src={track.audio} controls/>:*/}
            {/*    <audio id={"streamAudio"} src={done?audio:""} controls/>*/}
            {/*}*/}
                <HLSTrack trackId={track.audioId} ref={audioRef} />
            {/*<input type={"button"} onClick={()=>console.log(track)}/>*/}
            <MusicInfo>
                <InfoDisplay>{track.title}</InfoDisplay>
                <InfoDisplay>{track.artist}</InfoDisplay>
                <InfoDisplay>{track.album}</InfoDisplay>
            </MusicInfo>
        </DisplayBody>
        </>

    )
}export default MusicDisplay;

export const getServerSideProps=async(query)=>{
    console.log(query);

    // const res = await fetch("/api/getTrack?trackId="+params.trackId)
    // return{
    //     // props: { track: res.data}
    // }
}
