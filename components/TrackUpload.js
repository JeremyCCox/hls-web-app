'use client'
import {
    BackButton,
    DisplayBody,
    InfoInput,
    MusicBox,
    MusicInfo,
    MusicUpload,
    UploadButton
} from "./MusicDisplayComponents";
import {useReducer, useState} from "react";
import MP3Tag from "mp3tag.js";
import {useRouter} from "next/navigation";

const trackReducer = (state,action)=>{
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
const trackInitializer=()=>{
    return{
        image:"assets/upload.png"
    }
}
export default function TrackUpload(props){
    const router = useRouter()
    const audioContext = new AudioContext();

    const [track, trackDispatch] = useReducer(trackReducer,{},trackInitializer)

    const [buffer,setBuffer]=useState()

    const handleDrop=async (e)=>{
        e.preventDefault()
        e.stopPropagation()
        let files = e.dataTransfer.files;
        if(files && files[0]){
            for(const file of files){
                console.log(file)
                switch (true){
                    case(file.type.includes("image")):
                        readImage(file)
                        break
                    case(file.type.includes("audio")):
                        readAudio(file)
                        getMetaData(file)
                        // getImage(file)
                        trackDispatch({type:"change",tag:"name",value:file.name})
                        break
                    default:
                        console.log(file)
                }
            }
        }
    }

    const readImage=(file)=>{
        const reader = new FileReader();
        reader.onloadend=()=>{
            let img = document.createElement("img");
            img.onload = function () {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                canvas.height=360;
                canvas.width=360;

                ctx.drawImage(this, 0, 0, 360, 360);


                let uri = canvas.toDataURL();
                trackDispatch({type:"setAttrib",attrib:"image",value:uri})
            }
            img.onerror=(error)=>{
                console.error(error)
            }
            img.src = reader.result;

        }
        reader.readAsDataURL(file);
    }
    const readAudio=(file)=>{
        const reader = new FileReader();
        reader.onloadend=()=>{
            trackDispatch({type:"setAttrib",attrib:"audio",value:reader.result})
        }
        reader.readAsDataURL(file);

    }
    const getMetaData=(file)=>{
        var reader = new FileReader();
        reader.onloadend = async function () {
            let buff = reader.result;
            let mp3Tag = new MP3Tag(buff)
            mp3Tag.read();
            console.log(mp3Tag.tags)
            trackDispatch({type: "setTags", tags: mp3Tag.tags})
            trackDispatch({type: "change", tag:"extension",value:"lll"})
            if (mp3Tag.error !== '') throw new Error(mp3Tag.error)
            setBuffer(mp3Tag.buffer)
            audioContext.decodeAudioData(buff).then(res=>{
                console.log(res)
                trackDispatch({type:"setAttrib",attrib:"trackdata",value:{
                        duration:res.duration,
                        length:res.length,
                        numberOfChannels:res.numberOfChannels,
                        sampleRate:res.sampleRate
                    }})
            })

        }
        reader.readAsArrayBuffer(file)
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
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }
    const changeTag=(e)=>{
        trackDispatch({type:"change",tag:e.target.id,value:e.target.value})
    }
    const hoverDrop =()=>{
        e.preventDefault()
        trackDispatch({type:"change",tag:"image",value:"assets/drop.png"})
    }
    const hoverOut =()=>{
        e.preventDefault()
        trackDispatch({type:"change",tag:"image",value:"assets/upload.png"})
    }
    return(
        <DisplayBody>
            <MusicUpload>
                <BackButton onClick={()=>{router.push("listen/")}}> Go Back</BackButton>
                <UploadButton $uploadable={track.audio !== undefined && track.image !== undefined} onClick={saveAudio}>Upload Music</UploadButton>
            </MusicUpload>
            <MusicBox url={track.image} onDrop={handleDrop} onDragOver={e=>e.preventDefault()}>

            </MusicBox>
            <input type={"button"} onClick={()=>{console.log(track)}}/>
            <audio src={track.audio} controls></audio>
            <MusicInfo>
                <InfoInput id={"title"} placeholder={"Track Title"} value={track.title||""} onChange={changeTag}/>
                <InfoInput id={"artist"} placeholder={"Artist"} value={track.artist||""} onChange={changeTag}/>
                <InfoInput id={"album"} placeholder={"Album"} value={track.album||""} onChange={changeTag}/>
            </MusicInfo>
        </DisplayBody>
    )
}