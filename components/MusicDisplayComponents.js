import styled from "styled-components";

export const DisplayBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  height: 100vh;
  //align-items: center;
  scroll-snap-align:start;
  justify-content: space-evenly;
  align-items: center;
`
export const MusicBox = styled.div`
  margin-top: 5%;
  width: 360px;
  height: 360px;
  border:solid 2px white;
  border-radius: 5px;
  background-image: url(${(props) => props.url});
`
export const MusicInfo = styled.div`
  //background-color: rgb(0, 0, 77);
  //background-image: linear-gradient(45deg, white , transparent, transparent, transparent, white );
  width: 500px;
  height: 200px;
  display: flex;
  flex-flow: row wrap;
`
export const InfoInput = styled.input`
  padding: 5px;
  margin: 5px;
  border-image: linear-gradient(10deg, white 1%, transparent 25%, transparent 75%,white 99%) 10%10%;
  border-width: 2px;
  background-color: transparent;
  //background-image:radial-gradient(circle,rgba(0,0,81,20),rgba(0,0,81,0)) ;
  color:white;
  font-size: large;
  height: 1lh;
  text-align: center;
  &:hover{
    border-image: linear-gradient(10deg, white 1%, transparent 35%, transparent 65%,white 99%) 10% 10%;
  }
  &:focus{
    border-image: linear-gradient(10deg, white 5%, transparent 45%, transparent 55%,white 95%) 10% 10%;
    outline: none;
  }
  &:first-child{
    flex-basis: 100%;
  }
  transition: border-image 1s;
  &::placeholder{
    color:rgba(255,255,255,25%);
    //text-align: center;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }
  &[data-autocompleted] {
    background-color: transparent !important;
  }
`
export const InfoDisplay = styled.label`
  padding: 5px;
  margin: 5px;
  display: grid;
  align-content: center;
  //border:solid 2px white;
  //border-image: linear-gradient(10deg, white 1%, transparent 25%, transparent 75%,white 99%);
  //border: 2px linear-gradient(10deg, white 1%, transparent 25%, transparent 75%,white 99%);
  //border-width: 2px;
  background-image: linear-gradient(10deg, white 1%, transparent 25%, transparent 75%,white 99%);
  //background-image:radial-gradient(circle,rgba(0,0,81,20),rgba(0,0,81,0)) ;
  border-radius: 20px;
  color:white;
  font-size: large;
  //height: 1lh;
  flex-basis: 48%;
  box-sizing: border-box;
  text-align: center;
  &:hover{
    border-image: linear-gradient(10deg, white 1%, transparent 35%, transparent 65%,white 99%) 10% 10%;
  }
  &:focus{
    border-image: linear-gradient(10deg, white 5%, transparent 45%, transparent 55%,white 95%) 10% 10%;
    outline: none;
  }
  &:first-child{
    flex-basis: 100%;
  }
  transition: border-image 1s;
  &::placeholder{
    color:rgba(255,255,255,25%);
    //text-align: center;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }
  &[data-autocompleted] {
    background-color: transparent !important;
  }
`
export const InfoInputGradient = styled.input`
  border-image: linear-gradient(45deg, white , transparent, white );
  background-image: linear-gradient(45deg, white , transparent, white );
`
export const InfoDivGradient = styled.div`
  border-image: radial-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0) 34.48%, rgba(0,0,0,0) 100%);
  background-image: linear-gradient(top to bottom,red , transparent, red);
`
export const LoadButton=styled.button`
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,50%);
  background-image: url("/assets/play.png");
  outline: none;
  border: none;
`
export const PlayButton=styled.button`
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,15%);
  background-image: ${props=> props.paused?'url("/assets/play.png")':''};
  outline: none;
  border: none;
  &:hover{
    background-color: rgba(0,0,0,25%);
    background-image: ${props=> props.paused?'url("/assets/play.png")':'url("/assets/pause.png")'};
  }
`
export const MusicUpload = styled.div`
  width: 80%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`
export const BackButton = styled.button`
  border: solid 1px white;
  border-radius: 30px;
  font-size: x-large;
  background-color: rgba(0,0,0,0);
  color:white;
  //height: 60px;
  padding:20px 30px;
`
export const UploadButton = styled.button`
  border: solid 1px ${props=> props.ready?"white":"gray"};
  border-radius: 30px;
  font-size: x-large;
  background-color: rgba(0,0,0,0);
  color: ${props=> props.$uploadable?"white":"gray"};
  padding:20px 30px;
`