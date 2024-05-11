class DataSorter {
   
    constructor(params) {
        this.data = params   
    }

    sortByYear = (year = 0) => {

        return this.data.filter((elem) => {
            return elem.date.includes(year.toString())
        })
    }

    sortByIdIncreasing = (id) => {
        
        return this.data.filter((elem)=> {
            return elem.id > id
        })
    }

    sortByIdDecreasing= (id) => {
        
        return this.data.filter((elem)=> {
            return elem.id < id
        })
    }

    sortFromNewest = () => {  
        let out = this.data
        for (let i = 0; i < out.length; i++) {
            let current = i
            for (let j = 0; j < out.length; j++) {
                if (out[j].id > current.id){
                    current = j
                }    
            }
            let currentFirst = out[i]
            out[i] = out[current]
            out[current] = currentFirst
            
        }
        return out
    }

}

export default DataSorter
