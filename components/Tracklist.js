'use client'
import styled from "styled-components";
import {useEffect, useReducer, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import Navigator from "./Navigator";
import ListScroll from "./ListScroll";

const ListBody = styled.div`
  display: grid;
  justify-content: center;
  padding-top: 10%;
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
              setTracks(splitItems(data||[]))
          }).catch(err=>{
              console.log(err)
          })
      }
    },[])
    const scrollSize = 3;
    const splitItems = (items)=>{

        if( items.length===0){
            console.log("zero")
            return [];
        }
        if( items.length < scrollSize){
            console.log("less")
            return [items]
        }
        let splitArrays = []
        let loopSize = (items.length / scrollSize).toFixed(0)
        console.log("Loopsize Coming", loopSize)
        for(let i = 0; i < loopSize; i++){
            // console.log(i)
            if(i === loopSize-1){
                splitArrays.push(items.slice(i*scrollSize,items.length))
            }else{
                splitArrays.push(items.slice(i*scrollSize,(i*scrollSize)+scrollSize))
            }
        }
        return splitArrays
    }

    const router = useRouter()

    const openTrack=(e)=>{
        console.log(e.target.id)

    }
    // console.log(props)
    return(
        <>
            <ListBody>
                {Object.values(tracks).map(trackList=>{
                    return <ListScroll tracks={trackList}/>
                })}
            </ListBody>
        </>

    )
}

