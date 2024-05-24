import "./global.css"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { HelmetProvider, Helmet } from "react-helmet-async"
import { Toaster } from 'sonner'
import { ThemeProvider } from "./components/theme/theme-provider"


export const App = () => {

  return (
    <HelmetProvider>
      <ThemeProvider>
        <Helmet titleTemplate="%s | Pizza.shop" />
        <Toaster richColors />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}
