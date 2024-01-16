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
    // Get rid of scrollbar on most platforms
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    &::-webkit-scrollbar{
      display: none;
    }
  }
`
export default GlobalStyle;