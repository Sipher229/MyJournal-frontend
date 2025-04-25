import TopNav from "./components/subcomponents/TopNav/TopNav"
import SideNav from "./components/subcomponents/SideNav/SideNav"
import {Outlet} from "react-router-dom"


function App() {

  return (
    <>
      <div className="h-full w-full">
        <div className="h-full w-full bg-fadedWhite">
              <TopNav />
              <div className="flex w-full h-full">
                  <SideNav />
                  <div className="w-4/5 h-full flex flex-col">
                      <Outlet />
                  </div>
              </div>
              <div>

              </div>
          </div>
      </div>
    </>
  )
}

export default App
