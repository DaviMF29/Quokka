import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./Context/AuthProvider";
import { Router } from "./Router";
import { GlobalStyle } from "./styles/global";
import {BrowserRouter} from "react-router-dom"
import { defaultTheme } from "./styles/themes/default";

export function App() {

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle/>
        <AuthProvider>
          <BrowserRouter>
            <Router/>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}


