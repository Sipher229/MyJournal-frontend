import { ChangeEvent, useState } from "react"
import SearchIcon from "./SearchIcon"
import SearchSuggestions from "./SearchSuggestions"
import { useSelector } from "react-redux"
import { RootState } from "Store/store"

function SearchBox() {
  const [query, setQuery] = useState("")
  const {user} = useSelector((store: RootState) => store.user)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setQuery(e.target.value)
  }


  return (
    <>  
      <div className="overflow-hidden bg-white rounded-md w-96 flex flex-col h-10">
        <form>
            <div className="flex bg-fadedWhite justify-center items-center gap-1 w-96 rounded-3xl px-4 outline-none has-[:focus]:shadow-md overflow-hidden">
                <input
                    type="text"
                    placeholder="Search your notes"
                    className=" h-9 w-11/12 bg-fadedWhite outline-none"
                    onChange={handleChange}
                    value={query}
                ></input>
                <SearchIcon />
            </div>
        </form>
        <div className="overflow-hidden w-full">
          <SearchSuggestions notes={user.notes} query={query} />
        </div>
      </div>
    </>
  )
}

export default SearchBox