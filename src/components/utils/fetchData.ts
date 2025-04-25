import axios from "axios";

export type Note = {
    id: number | string,
    title: string,
    content: string,
    date?: string,
    userId?: number | string
}

export type ReqType = "GET" | "login" | "logout" | "register" | "add" | "delete" | "edit";

export type User = {
    id: number,
    username: string,
    password?: string
}

export interface Resp {
    success: boolean | undefined,
    message: string,
    isLoggedIn: boolean,
    notes?: Note[],
    username?: string,
    userId?: number,
}





const APIURL = "http://localhost:5000/api/";

// function RequestParsers(reqBody: any) {
//     // this.reqBody = reqBody
//     // this.response = null


//     this.getcontent = async () => {
//         try{
//             this.response = await axios.get(`${APIURL}getcontent`, {withCredentials: true})
//             return this.response.data
//         }catch (err) {
//             console.log(err.message)
//             return this.response
//         }
//     }

//     this.login = async () => {

//         try {
//             this.response = await fetch( `${APIURL}login`, {
//                 method: 'post',
//                 credentials: "include",
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json',
//                     'Access-Control-Allow-Origin': 'http://localhost:5173/'
//                 },
//                 body: JSON.stringify(this.reqBody)
//             })
//             return this.response.json()
//         } catch (error) {
//             console.log(error.message)
//             console.log(this.response)
//             return this.response
//         }
//     }
//     this.register = async () => {
//         try {
//             this.response = await axios.post(`${APIURL}register`, this.reqBody, {
//                  withCredentials: true
//             })
//             return this.response.data
//         } catch (error) {
//             console.log(error.message)
//             return this.response
//         }
//     }

//     this.addContent = async () => {
//         try {
//             this.response = await axios.post(`${APIURL}add`, this.reqBody, {withCredentials:true})
//             return this.response.data
//         } catch (error) {
//             console.log(error.message)
//             return this.response
//         }
//     }

//     this.editContent = async () => {
//         try {
//             this.response = await axios.patch(`${APIURL}edit`, this.reqBody, {withCredentials: true})
//             console.log(this.response.data)
//             return this.response.data
//         } catch (error) {
//             console.log(error.message)
//             return this.response
//         }
//     }
//     this.deleteContent = async () => {
//         try {
//             const id = this.reqBody.id
//             this.response = await axios.delete(`${APIURL}delete/${id}`, {withCredentials: true})
            
//             return this.response.data
//         } catch (error) {
//             console.log(error.message)
//             return this.response
//         }
//     }
//     this.logout = async () => {
//         try {
//             this.response = await axios.delete(`${APIURL}logout`, {withCredentials: true})
//             return this.response.data
            
//         }catch(error){
//             console.log(error.message)
//             return this.response
//         }
//     }
    
    
//

class RequestParser<T>{
    reqBody: T;
    response: Resp;
    constructor(reqBody: T) {
        this.reqBody = reqBody;
        this.response = {message: "", isLoggedIn: false, success: undefined};
    }

    getcontent = async () => {
        try{
            const response = await axios.get(`${APIURL}getcontent`, {withCredentials: true});
            this.response = response.data as Resp;
            return this.response;
        }catch (err: any) {
            console.log(err.message);
            return this.response;
        }
    }

    login = async () => {

        try {
            let response = await axios.post( `${APIURL}login`, this.reqBody, {withCredentials: true});
            this.response = response.data as Resp;
            return this.response;
        } catch (error : any) {
            console.log(error.message)
            console.log(this.response)
            return this.response;
        }
    }
    register = async () => {
        try {
            const response = await axios.post(`${APIURL}register`, this.reqBody, {
                 withCredentials: true
            })
            this.response = response.data as Resp;
            return this.response;
        } catch (error: any) {
            console.log(error.message)
            return this.response;
        }
    }

    addContent = async () => {
        try {
            const response = await axios.post(`${APIURL}add`, this.reqBody, {withCredentials:true});
            this.response = response.data as Resp;
            return this.response;
        } catch (error: any) {
            console.log(error.message)
            return this.response
        }
    }

    editContent = async () => {
        try {
            const response = await axios.patch(`${APIURL}edit`, this.reqBody, {withCredentials: true});
            this.response = response.data;
            return this.response;
        } catch (error:any) {
            console.log(error.message)
            return this.response;
        }
    }
    deleteContent = async (id: number | undefined) => {
        if(!id) {
            console.log("missing params. Please provide a valid id");
        }
        try {
            const response = await axios.delete(`${APIURL}delete/${id}`, {withCredentials: true})
            this.response = response.data as Resp
            return this.response;
        } catch (error:any) {
            console.log(error.message)
            return this.response;
        }
    }
    logout = async () => {
        try {
            const response = await axios.delete(`${APIURL}logout`, {withCredentials: true})
            this.response = response.data as Resp
            return this.response;
            
        }catch(error: any){
            console.log(error.message)
            return this.response
        }
    }


}

async function fetchData<T>(reqType: ReqType, reqObj: T, id: number | undefined = undefined): Promise<Resp>{
    const reqParser = new RequestParser<T>(reqObj);
    let outPut: Resp;
    switch (reqType) {
        case "GET":
            outPut = await reqParser.getcontent();
            return outPut;

        case "login":
            outPut = await reqParser.login();
            return outPut;
        case "add":
            outPut = await reqParser.addContent();
            return outPut;
        case "register":
            outPut = await reqParser.register();
            return outPut;
        case "edit":
            outPut = await reqParser.editContent();
            return outPut;
        case "delete":
            outPut = await reqParser.deleteContent(id);
            return outPut;
        case "logout":
            outPut = await reqParser.logout();
            return outPut;

        default:
            outPut = await reqParser.getcontent();
            return outPut;
    }

}

export default fetchData


// let config = {
//     method: 'POST',
//     maxBodyLength: 'Infinity',
//     url: `${APIURL}login`,
//     headers: {
//         'Content-Type': 'application/json',
//         'Cookie': 'connect.sid=s%3AlMXumJWAQi0NI9b1AnzMYN_K5nbgsTJB.FgUtodRttfoq2vFZLeXAPtGIpghhUitYC01n0RvDN18',
//     },
//     data: JSON.stringify(this.reqBody)
// }