/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"


function SearchSuggestions({notes = [], query = ""}) {
    const navigate = useNavigate()
    const handleClick = (e) => {
        navigate(`/app/dashboard.search_results/${e.target.id}`)
        navigate(0)
    }
  return (
    <>
        
        <ul className={`bg-white w-96 min-h-0 max-h-40 overflow-y-scroll fixed rounded-md list-none ${query == "" ? 'hidden' : ''}`}>
            {
                notes?.filter((note) => {
                    return note.title?.toLowerCase().includes(query.toLowerCase()) || note.content?.toLowerCase().includes(query.toLowerCase()) 
                }).map((note, index) => {
                    return <li key={index} className={`m-0 border border-x-0 w-full border-y-gray-100 hover:bg-fadedWhite hover:ease-in-out h-8 px-1`} onClick={handleClick} id={note.id}>{note.title} </li>
                })
            }
            
        </ul>
    </>
  )
}

export default SearchSuggestions