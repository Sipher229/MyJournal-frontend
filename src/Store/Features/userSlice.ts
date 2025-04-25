import { createSlice } from "@reduxjs/toolkit";
import { Note } from "components/utils/fetchData";

const time = new Date()
const date = `${time.getMonth()+1}/${time.getDate()}/${time.getFullYear()}`

type UserState = {
    userId: number,
    username: string,
    password?: string,
    notes: Note[],

}
type InitialState = {
    isLoggedIn: boolean,
    user: UserState
}

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
        deleteNote: (state: InitialState, action) => {
            const id = action.payload
            state.user.notes = state.user.notes.filter((note)=> note.id !== id)
        },
        addNote: (state: InitialState, action) => {
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
        setState: (state: InitialState, action) => {
            if(action.payload === null) return
            const {notes, isLoggedIn, username, userId} = action.payload
            state.isLoggedIn =isLoggedIn
            state.user = {notes: notes, username: username, userId: userId}
        }
    }
})
export const {deleteNote, addNote, editNote, setState} = userSlice.actions;
export default userSlice.reducer;