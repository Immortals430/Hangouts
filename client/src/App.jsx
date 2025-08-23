import { useState } from "react"
import { Outlet } from "react-router-dom"
import FullPageLoader from "./FullPageLoader"
import useAuthCheck from "./hooks/useAuthCheck"

function App() {

  const  { loading } = useAuthCheck()


  if(loading) return <FullPageLoader />
  
  return (
    <>
    <Outlet />
    </>
  )
}

export default App
