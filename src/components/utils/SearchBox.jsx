import SearchIcon from "./SearchIcon"

function SearchBox() {
  return (
    <>
        <form>
            <div className="flex bg-fadedWhite justify-center items-center gap-1 w-96 rounded-3xl pl-5 outline-none has-[:focus]:shadow-md overflow-hidden">
                <SearchIcon />
                <input
                    type="text"
                    placeholder="Search your notes"
                    className=" h-9 w-11/12 bg-fadedWhite outline-none focus:"
                ></input>
            </div>
        </form>
    </>
  )
}

export default SearchBox