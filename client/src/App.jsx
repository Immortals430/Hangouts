import { useState } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import FullPageLoader from "./FullPageLoader"
import useAuthCheck from "./hooks/useAuthCheck"

function App() {
  const [ mobileAside, setMobileAside ] = useState(false)
  const  { loading } = useAuthCheck()


  if(loading) return <FullPageLoader />
  
  return (
    <>
    <Navbar mobileAside={mobileAside} setMobileAside={setMobileAside}/>
    <Outlet />
    </>
  )
}

export default App
