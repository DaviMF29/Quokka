import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./Context/AuthProvider";
import { Router } from "./Router";
import { GlobalStyle } from "./styles/global";
import {BrowserRouter} from "react-router-dom"
import { defaultTheme } from "./styles/themes/default";
import {Theme} from '@radix-ui/themes'

export function App() {

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Theme >
        <GlobalStyle/>
        <AuthProvider>
          <BrowserRouter>
              <Router/>
          </BrowserRouter>
        </AuthProvider>
        </Theme>
      </ThemeProvider>
    </>
  )
}


