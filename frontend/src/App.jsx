import Navbar from "./components/shared/Navbar"
import { Outlet } from "react-router-dom"

function App() {


  return (
    <>
      <Navbar/>
      <Outlet/>
      {/* <Footer/> */}
    </>
  )
}

export default App
