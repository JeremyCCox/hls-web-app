'use client'
import styled from "styled-components";
import {useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import Navigator from "./Navigator";

const ListBody = styled.div`
  display: grid;
  justify-content: center;
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
`
const TrackThumb = styled.img`
  height: 128px;
  width: 128px;
  background-color: white;
`

export default function Tracklist(props){
    const tracks = props.tracks || [];
    const router = useRouter()

    const openTrack=(e)=>{
        console.log(e.target.id)

    }
    useEffect(()=>{
        console.log(tracks)
    })
    console.log(props)
    return(
        <>
            <Navigator/>
            <ListBody>
            {Object.values(tracks).map(track=>{
                console.log(track)
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

