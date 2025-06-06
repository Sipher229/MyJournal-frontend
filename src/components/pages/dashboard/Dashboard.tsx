/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import ContentBox from "../../subcomponents/ContentBox"
import { useNavigate, useParams } from "react-router-dom"
import fetchData from "../../utils/fetchData"
import { useDispatch, useSelector } from "react-redux"
import { setState } from "../../../Store/Features/userSlice"
import DataSorter from "../../utils/DataSorter"


function Dashboard() {
  const [userNotes, setUserNotes] = useState([])
  const {user} = useSelector((state)=> state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {query} = useParams()
  useEffect(() => {

    fetchData("GET", null).then((resp) => {
      if (!resp.isLoggedIn ){
        navigate("/")
        navigate(0)
        return
      }
      const datasorter = new DataSorter(resp.notes)
      if(query){
        const date = new Date()
        if(query === "new" ){
          setUserNotes(datasorter.sortByYear(date.getFullYear()))
        } else if (query === "old"){
          setUserNotes(datasorter.sortByIdDecreasing(20))
        } else{
            setUserNotes(datasorter.findId(query))
        }
        if(resp.notes.length !== 0){
          dispatch(setState(resp))
        }
      }else{
        console.log(resp)
        dispatch(setState(resp))
      }
    }).catch(()=> alert('Something went wrong'))

  }, [])
 
  return (
    <>
      <div className="w-full h-full overflow-y-auto flex flex-col justify-start items-start py-8 px-28">
      
      {
        user.notes.length === 0 ?
        <div className="h-72 my-6">
          <ContentBox />
        </div>  
        :
        user.notes.map((note, index)=>{
          return (
            <div key={index} className="h-72 my-6">
              <ContentBox title={note.title} contetText={note.content} id={note.id} date={note.date} />
            </div>

          )
        })
      }
      </div>
    </>
  )
}

export default Dashboard