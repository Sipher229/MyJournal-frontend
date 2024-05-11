import axios from "axios"


const APIURL = "http://localhost:5000/"

function RequestParser(requestObj) {
    this.reqBody = requestObj
    this.response = null


    this.getcontent = async () => {
        try{
            this.response = await axios.get(`${APIURL}getcontent`, {withCredentials: true})
            return this.response.data
        }catch (err) {
            console.log(err.message)
            return this.response
        }
    }

    this.login = async () => {

        try {
            this.response = await fetch( `${APIURL}login`, {
                method: 'post',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:5173/'
                },
                body: JSON.stringify(this.reqBody)
            })
            return this.response.json()
        } catch (error) {
            console.log(error.message)
            console.log(this.response)
            return this.response
        }
    }
    this.register = async () => {
        try {
            this.response = await axios.post(`${APIURL}register`, this.reqBody, {
                 withCredentials: true
            })
            return this.response.data
        } catch (error) {
            console.log(error.message)
            return this.response
        }
    }

    this.addContent = async () => {
        try {
            this.response = await axios.post(`${APIURL}add`, this.reqBody, {withCredentials:true})
            return this.response.data
        } catch (error) {
            console.log(error.message)
            return this.response
        }
    }

    this.editContent = async () => {
        try {
            this.response = await axios.patch(`${APIURL}edit`, this.reqBody, {withCredentials: true})
            console.log(this.response.data)
            return this.response.data
        } catch (error) {
            console.log(error.message)
            return this.response
        }
    }
    this.deleteContent = async () => {
        try {
            const id = this.reqBody.id
            this.response = await axios.delete(`${APIURL}delete/${id}`, {withCredentials: true})
            
            return this.response.data
        } catch (error) {
            console.log(error.message)
            return this.response
        }
    }
    this.logout = async () => {
        try {
            this.response = await axios.delete(`${APIURL}logout`, {withCredentials: true})
            return this.response.data
            
        }catch(error){
            console.log(error.message)
            return this.response
        }
    }
    
    
}

async function fetchData(reqType="", reqObj){
    const reqParser = new RequestParser(reqObj)
    let outPut = null
    switch (reqType) {
        case "GET":
            outPut = await reqParser.getcontent()
            break;

        case "login":
            outPut = await reqParser.login()
            break;
        case "add":
            outPut = await reqParser.addContent()
            break;
        case "register":
            outPut = await reqParser.register()
            break;
        case "edit":
            outPut = await reqParser.editContent()
            break;
        case "delete":
            outPut = await reqParser.deleteContent()
            break;
        case "logout":
            outPut = await reqParser.logout()
            break;
        default:
            outPut = await reqParser.getcontent()
            break;
    }
    return outPut
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