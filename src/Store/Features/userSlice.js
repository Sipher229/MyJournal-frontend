import { createSlice } from "@reduxjs/toolkit";

const time = new Date()
const date = `${time.getMonth()+1}/${time.getDate()}/${time.getFullYear()}`

const  initialState = {
    isLoggedIn: false,
    user: {
        userId: -1,
        username: "email@gmail.com",
        password: "lorem ipsum",
        notes: [
            {
                title: "note title",
                content: "the content of the particular note",
                date: date,
                id: 1,
            },
        ]
    }

}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        deleteNote: (state, action) => {
            const id = action.payload
            state.user.notes = state.user.notes.filter((note)=> note.id !== id)
        },
        addNote: (state, action) => {
            const {title, content} = action.payload
            state.user.notes = [...state.user.notes, {title, content, id: Date.now()}]
        },
        editNote: (state, action) => {
            const {id, editedNote} = action.payload
            state.user.notes.forEach((note, index)=>{
                if (note.id == id){
                    state.user.notes[index] = editedNote
                }
            })
        },
        setState: (state, action) => {
            if(action.payload === null) return
            const {notes, isLoggedIn, username, password, userId} = action.payload
            state.isLoggedIn =isLoggedIn
            state.user = {notes: notes, username: username, password: password, userId: userId}
        }
    }
})
export const {deleteNote, addNote, editNote, setState} = userSlice.actions
export default userSlice.reducer