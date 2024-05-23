import "./global.css"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { HelmetProvider, Helmet } from "react-helmet-async"
import { Toaster } from 'sonner'


export const App = () => {
  
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Pizza.shop" />
      <Toaster richColors />
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}
