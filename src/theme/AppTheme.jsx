//este componente es un higher-order component, que va a envolver a todos los demás componentes (children),
//dándoles el mismo aspecto según el theme provisto

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { purpleTheme } from './purpleTheme'

export const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme={purpleTheme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
  )
}
