

import StyledComponentsRegistry from "../lib/registry";
import GlobalStyles from "../lib/GlobalStyles";
import HomePage from "./home-page";
import Navigator from "../components/Navigator";

export default function RootLayout({children}){

    return(
        <html>
            <body>
                <StyledComponentsRegistry>
                    {/*<HomePage/>*/}
                    {/*<Navigator/>*/}
                    <GlobalStyles/>
                    {children}
                </StyledComponentsRegistry>
            </body>
        </html>
    )
}