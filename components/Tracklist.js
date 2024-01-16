'use client'
import styled from "styled-components";
import {useEffect, useReducer, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import Navigator from "./Navigator";

const ListBody = styled.div`
  display: grid;
  justify-content: center;
  //overflow-y: scroll;
  //
  //
  //// Get rid of scrollbar on most platforms
  //-ms-overflow-style: none;  /* IE and Edge */
  //scrollbar-width: none;  /* Firefox */
  //&::-webkit-scrollbar{
  //  display: none;
  //}
  
`
const ListItem = styled.label`
  z-index: 1;
  color: white;
  font-size: large;
  width: fit-content;
  text-decoration: none;
  border: 2px solid transparent;
  &:hover{
    border: 2px solid white;
  }
  box-sizing: border-box;
  height: 500px;
`
const TrackThumb = styled.img`
  height: 128px;
  width: 128px;
  background-color: white;
`
const Filler = styled.div`
  border: solid 2px green;
  height: 200px;
  width: 60px;
`
const trackReducer = (state,action)=>{

}
const trackInitializer = ()=>{
    // let val = await fetch()
}
// export default function Tracklist(props){
//     const tracks = props.tracks || [];
export default function Tracklist(){
    // const [track,trackDispatch] = useReducer(trackReducer,{},trackInitializer);
    const [tracks, setTracks] = useState([])
    useEffect(()=>{
      if(tracks.length === 0){
          fetch("/api/getTracks").then(res=>{
              if(res.ok){
                  return res.json()
              }else{
                  return(res.statusMessage)
              }
          }).then(data=>{
              console.log(data)
              setTracks(data||[])
          }).catch(err=>{
              console.log(err)
          })
      }
    },[])

    const router = useRouter()

    const openTrack=(e)=>{
        console.log(e.target.id)

    }
    // console.log(props)
    return(
        <>
            <Navigator/>
            <ListBody>
                <Filler/>
                <Filler/>
                <Filler/>
                <Filler/>
                <Filler/>
                <Filler/>
                <Filler/>

            {Object.values(tracks).map(track=>{
                return(
                    <ListItem id={track._id} key={track._id} onClick={()=>{router.push("listen/"+track._id)}} htmlFor={"navLink"+track._id}>
                        <TrackThumb alt={"Track Image"} src={track.data.image}/>
                        <p>{track.data.title?track.data.title:"Title"}</p>
                        <p>{track.data.artist?track.data.artist:"Artist"};{track.data.album ? track.data.album:"Album"}</p>
                        {/*<p>{track.data.title}</p>*/}
                    </ListItem>
                )
            })}
        </ListBody>
        </>

    )
}

