import { Note } from "./fetchData";
class DataSorter {
   data: Note[];
    constructor(params: Note[]) {
        this.data = params   
    }


    sortByIdIncreasing = (id: number) => {
        
        return this.data.filter((elem: Note)=> {
            return elem.id as number > id 
        })
    }

    sortByIdDecreasing= (id: number) => {
        
        return this.data.filter((elem: Note)=> {
            return elem.id as number < id
        })
    }

    sortFromNewest = () => {  
        let out = this.data
        for (let i = 0; i < out.length; i++) {
            let current = i
            for (let j = 0; j < out.length; j++) {
                if (out[j].id as number > current){
                    current = j
                }    
            }
            let currentFirst = out[i]
            out[i] = out[current]
            out[current] = currentFirst
            
        }
        return out
    }
    findId = (id: string | number) => {
        return this.data.filter((note) => note.id == id)
    }

}

export default DataSorter
