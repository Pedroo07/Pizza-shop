import "./global.css"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { HelmetProvider, Helmet } from "react-helmet-async"


export const App = () => {
  
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Pizza.shop" />
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}
