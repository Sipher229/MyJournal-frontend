import SearchBox from "../../utils/SearchBox"
import PlusIcon from "../../utils/PlusIcon"
import { useState } from "react"
import { Link } from "react-router-dom"

function TopNav() {
  const [logOutHidn, setLogOutHidn] = useState(true)

  const handleClickLgOUt = () => {
    setLogOutHidn((prev)=>!prev)
  }

  return (
    <>
        <header className=" w-full h-20 border border-x-0 border-b border-b-gray-3  00">
            <nav className=" w-full h-full bg-white flex justify-between items-center px-10">
                <h1 className="text-myIndigo text-3xl font-extrabold font-serif ">MyJournal</h1>
                <SearchBox />
                <div className="w-40 h-full  flex justify-center gap-4 items-center">
                    <Link to={"/app/addcontent"}>
                      <button 
                        className="w-14 h-2/5 rounded-md bg-myIndigo text-2xl shadow-md text-white text-center active:scale-90 flex justify-center items-center font-bold"
                        id="addbtn">
                          <PlusIcon /> 
                      </button>
                    </Link>
                    <div className="w-20 flex flex-col relative gap-1">

                      <button
                       className="bg-black w-12 h-12 rounded-full text-white text-2xl "
                       onClick={handleClickLgOUt}
                       >J</button>
                      <div className={`w-full min-h-7 absolute translate-y-14 bg-white rounded-md shadow-md ${logOutHidn? "hidden" : ""}`}>
                        <ul className=" w-full">
                          <Link to={"/"}><li className="hover:bg-fadedWhite hover:cursor-pointer bg-white font-semibold pl-1">Log out</li></Link>
                        </ul>
                      </div>
                    </div>
                </div>
            </nav>
        </header>
    </>
  )
}

export default TopNav