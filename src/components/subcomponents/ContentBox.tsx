/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import DeleteIcon from "../utils/DeleteIcon"
import PencilIcon from "../utils/PencilIcon"
// import { useEffect, useState } from "react"
import fetchData from "../utils/fetchData"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deleteNote } from "../../Store/Features/userSlice"

type Proptypes = {
  title?: string,
  contetText?: string,
  id?: number | string,
  date?: string
}

function ContentBox({title="note title", contetText="Your notes or thoughts.", id="", date = "MM/DD/YYYY"}: Proptypes) {
  // const [delRequest, setDelRequest] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = () => {
    if(!id){
      return
    }
    fetchData<null>("delete", null, id as number).then((resp) => {
      if (resp.success){
        navigate("/app/dashboard")
        navigate(0)
      }
      else{
        alert("Something went wrong while deleting. Try again")
        console.log(resp)
      }
    })
  }


  return (
    <>
        <div className="w-[35rem] rounded-lg h-80 bg-white flex flex-col p-5 shadow-md my-5 overflow-y-auto box-border">
            <div className="w-full h-4 flex justify-end">
              <div className="h-full flex justify-center items-center">
                <Link to={`/app/addcontent/${id}`}>
                  <button className="h-full cursor-pointer flex justify-center items-center">

                    <PencilIcon /> 
                  </button>
                </Link>
                <button className="cursor-pointer flex justify-center items-center" onClick={handleDelete}>
                  <DeleteIcon /> 
                </button>
              </div>
            </div>
            <div className="w-full flex flex-col justify-center">
            <h2 className="text-xl font-sans font-semibold my-3">{title}</h2>
            <small className="text-xs text-gray-400 font-sans">Entry made on: {date}</small>
            </div>
            <p className="pt-3">{contetText}</p>
        </div>
    </>
  )
}

export default ContentBox


{
  /*  useEffect(() => {
    if(delRequest){
      fetchData("delete", {id: id}).then((resp) => {
        if (resp?.success){
          navigate("/app/dashboard")
        }else{
          alert("something went wrong while deleting. try again")
        }
      })
    }
  }, [delRequest]) */
}