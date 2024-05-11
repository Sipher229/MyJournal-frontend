import {useNavigate } from "react-router-dom"


function SideNav() {
  const navigate = useNavigate()

  return (
    <>
        <nav className="w-80 h-full flex flex-col items-center bg-white pt-12">
            <button className="text-white bg-myIndigo active:scale-95 w-48 my-5 h-11 rounded-md shadow-md font-semibold text-lg"
              onClick={() => {navigate("/app/dashboard"); navigate(0)}}
            >
             Dashboard 
            </button>

            <button className=" w-full h-11 border border-x-0 border-gray-200 hover:bg-slate-100" onClick={() => {navigate("/app/dashboard.search_results/new"); navigate(0)}}>Newest</button>
            <button className=" w-full h-11 border border-x-0 border-gray-200 hover:bg-slate-100" onClick={() => {navigate("/app/dashboard.search_results/old"); navigate(0)}}> Oldest</button>
        </nav>
    </>
  )
}

export default SideNav