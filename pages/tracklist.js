'use client'
import styled from "styled-components";
import {useEffect} from "react";
import Link from "next/link";

const ListBody = styled.div`
  display: grid;
  //width: fit-content;
  //align-items: center;
  justify-content: center;
`
const ListItem = styled.label`
  background-color: white;
  width: fit-content;
  text-decoration: none;
 
`
const TrackThumb = styled.img`
  height: 128px;
  width: 128px;
  background-color: white;
`

export default function Tracklist(props){
    const tracks = props.tracks || [];

    const openTrack=(e)=>{
        console.log(e.target.id)

    }
    useEffect(()=>{
        console.log(tracks)
    })
    console.log(props)
    return(
        <ListBody>
            {Object.values(tracks).map(track=>{
                console.log(track)
                return(
                    <>
                        <Link href={"/listen/"+track._id}>
                            <ListItem id={track._id} onClick={openTrack} htmlFor={"navLink"+track._id}>
                                <TrackThumb alt={"Track Image"} src={track.data.image}/>
                                <p>{track.data.title?track.data.title:"Title"}</p>
                                <p>{track.data.album ? track.data.album:"Album"}; {track.data.artist?track.data.artist:"Artist"}</p>
                                {/*<p>{track.data.title}</p>*/}
                            </ListItem>
                        </Link>
                    </>
                )
            })}
        </ListBody>
    )
}

