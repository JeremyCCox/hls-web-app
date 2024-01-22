'use client'

import styled from "styled-components";
import {useRouter} from "next/navigation";

const ListItem = styled.label`
  display: grid;
  justify-items: center;
  //background-color: rgb(33, 111, 255,40);
  z-index: 1;
  color: white;
  font-size: large;
  //width: fit-content;
  border: 2px solid rgb(0, 45, 124);
  text-decoration: none;
  margin: 5px;
  outline: 2px solid rgba(0, 45, 124,10%);
  &:hover {
    border: 2px solid white;
    outline:2px solid white;
    transition: border 1200ms, outline 1200ms;
  }
  transition: border 400ms, outline 400ms;
  box-sizing: border-box;
  flex-basis: 25%;
  //height: 500px;
`
const XScroll = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`
const TrackThumb = styled.img`
  max-width: 100%;
  background-color: white;
`
const TrackTitle = styled.span`
  text-align: center;
  padding-bottom: .5lh;
`
const TrackInfo = styled.span`
  text-align: center;
  padding: 0.25lh 0;
`
export default function ListScroll(props){
    const router = useRouter();
    const tracks = props.tracks
    return(
        <XScroll>
            {Object.values(tracks).map(track=>{
                return(
                    <ListItem id={track._id} key={track._id} onClick={()=>{router.push("listen/"+track._id)}} htmlFor={"navLink"+track._id}>
                        <TrackThumb alt={"Track Image"} src={track.data.image}/>
                        <TrackTitle>{track.data.title?track.data.title:"Title"}</TrackTitle>
                        <TrackInfo>{track.data.artist?track.data.artist:"Artist"}</TrackInfo>
                        <TrackInfo>{track.data.album ? track.data.album:"Album"}</TrackInfo>
                        {/*<p>{track.data.title}</p>*/}
                    </ListItem>
                )
            })}
        </XScroll>
    )
}