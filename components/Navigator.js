'use client'
import styled from "styled-components";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";

const NavZone = styled.div`
  position: fixed;
  z-index: 1;
  height: 5%;
  //bottom: 90%;
  //border: white solid 1px;
  //box-sizing: border-box;
  width: 100%;
  padding-bottom: 10%;
  //&:hover{
  //  bottom: 68%;
  //}
  transition: bottom 2s;
  display: flex;
  justify-content: space-evenly;
`
const NavButton = styled.label`
  font-size: xxx-large;
  display: grid;
  color: white;
  border: solid white 1px;
  border-radius: 30px;
  text-align: center;
  flex-basis: 20%;
  align-content: end;
  //align-items: baseline;
`

export default function Navigator(){
    const router = useRouter();
    const handleClick = (e)=>{
        console.log(e)

    }
    return(
        <NavZone>
            <NavButton onClick={()=>{router.replace("/listen/")}}>Listen</NavButton>
            <NavButton onClick={()=>{router.replace("/upload/")}}>Upload Music</NavButton>
        </NavZone>
    )
}