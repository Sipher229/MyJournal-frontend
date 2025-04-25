/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useState, MouseEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {setState } from "../../../Store/Features/userSlice"
import fetchData, { Note } from "../../utils/fetchData"
import { RootState } from "Store/store"


function AddContent() {
  const navigate = useNavigate()
  const {user} = useSelector((state: RootState)=> state.user)
  const dispatch = useDispatch()
  const [note, setNote] = useState({
    title: "",
    content: ""
  })
  const {id} = useParams()

  const [editMode, setEditMode] = useState(false)

  // const [submitted, setSubmitted] = useState(false)

  const getNote = (id: number | string) => {
    const note = user.notes.find((note)=> note.id == id)
    return note
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.currentTarget

    if (name == "title") {
      setNote((prev)=>{
        return {...prev, title: value}
      })
    } else if ( name == "content"){

      setNote((prev)=>{
        return {...prev, content: value}
      })
    }
  }

  const handleAdd = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const data = {title: note.title, content: note.content , userId: user.userId}

    fetchData("add", data).then((resp)=> {
      if(resp?.success){
        dispatch(setState(resp))
        console.log(resp)
        navigate("/app/dashboard")
      }else{
        alert("something went wrong while adding content. Try again")
        console.log(resp)
        console.log(user.userId)
      }
    })
    
  }

  const handleEdit = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const data = {...note, id: id}

    fetchData("edit", data).then((resp) => {
      if(resp?.success){
        // dispatch(setState(resp))
        navigate("/app/dashboard")
      }else{
        alert("Something went wrong. Try again")
        console.log(resp)
      }
    })
  }

  useEffect(()=> {
    if(id){
      try{

        const editableNote = getNote(id) as Note
        setNote(editableNote)
        setEditMode(true)
      }
      catch (error: any){
        console.log(error.message);
      }
    }
  }, [])

  // useEffect(() => {


  // }, [submitted])

  return (
    <>
       <form className="flex flex-col gap-5 p-7 w-[30rem] h-[35rem] bg-white  rounded-lg shadow-md ml-36 mt-10">
          <label htmlFor="title" className="text-gray-500 font-semibold ">Title</label>
          <input className="w-full h-9 outline outline-1 outline-gray-400 focus:shadow focus:shadow-myIndigo border border-gray-100 rounded-md px-2"
            id="title"
            name="title"
            value={note.title}
            onChange={handleChange}

          />
          <label htmlFor="content" className="text-gray-500 font-semibold ">Notes:</label>
          <textarea className="outline outline-1 outline-gray-400 focus:shadow focus:shadow-myIndigo rounded-md p-2" rows={14}
            id="content"
            name="content"
            value={note.content}
            onChange={handleChange}
           />
          {
            editMode?
          <button className="w-28 h-8 bg-myIndigo rounded-md outline-white self-center text-white font-semibold"
           onClick={handleEdit}>
            Save
           </button>
           :
           <button className="w-28 h-8 bg-myIndigo rounded-md outline-white self-center text-white font-semibold"
           onClick={handleAdd}>
            Add
           </button>
          }
       </form> 
    </>
  )
}

export default AddContent