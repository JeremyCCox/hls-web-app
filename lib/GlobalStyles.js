'use client'

import {createGlobalStyle} from "styled-components";

// const theme = {
//     colors: {
//         primary: "rgb(0,0,51)",
//     },
// };

const GlobalStyle = createGlobalStyle`
  html{
    scroll-snap-type: y mandatory;
    
  }
  body{
    background-color: rgb(0,0,51);

    overflow-y:hidden;
  }
`
export default GlobalStyle;