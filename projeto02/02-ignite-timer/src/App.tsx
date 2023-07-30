import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { Router } from './Router'

import { GlobalStyle } from './global'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <Router />

        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
