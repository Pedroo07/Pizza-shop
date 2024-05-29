import { Header } from "@/components/header"
import { api } from "@/lib/axios"
import { isAxiosError } from "axios"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export const AppLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const InterruptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          const code = error.response?.data.code

          if (status === 401 && code === 'UNAUTHORIZED') {
            navigate('/sign-in', {replace: true})
          }
        } 
      }
    )

    return () => {
      api.interceptors.response.eject(InterruptorId)
    }
  })

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header/>
      <div className="flex flex-col flex-1 gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  )
}
