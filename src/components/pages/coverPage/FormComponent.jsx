/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import fetchData from "../../utils/fetchData"
import {useDispatch} from "react-redux"
import { setState } from "../../../Store/Features/userSlice"


function FormComponent() {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    })

    const [needToRegister, setNeedToRegister] = useState(false)

    const [submitted, setSubmitted] = useState(false)

    const navigate = useNavigate()
    
    const dispatch = useDispatch()
    
    const handleNeedToRegister = (e)=>{
        e.preventDefault()
        setNeedToRegister((prev)=> !prev)
    }
    const handleChange = (e) =>{
        const {name, value} = e.target
        switch (name) {
            case "username":
                setCredentials((prev) => {
                    return {...prev, username: value}
                })
                break;
            case "password":
                setCredentials((prev) =>{
                    return {...prev, password: value}
                })
                break;
            case "confirmPassword":
                setCredentials((prev) =>{
                    return {...prev, confirmPassword: value}
                })
                break;
            default:
                break;
        }
    }
    // const handleNavigation = (e)=>{
    //     e.preventDefault()
    
    // }
    const handleSubmit = (e) => {
        setSubmitted((prev) => !prev )
        e.preventDefault()
        if(!needToRegister){
            fetchData("login", credentials).then((resp)=> {
                if(resp?.success){
                    dispatch(setState(resp))
                    navigate("/app/dashboard")
                }else{
                    alert("Wrong password or email")
                    setCredentials({
                        username: "",
                        password: "",
                        confirmPassword: ""
                    })
                    setSubmitted(false)
                }

            })
        }else{
            if(credentials.password !== credentials.confirmPassword){
                alert("passwords should be the same")
                return
            }
            fetchData("register", credentials).then((resp) => {
                if(resp?.success){
                    dispatch(setState(resp))
                    navigate("/app/dashboard")
                }else{
                    alert("something wrong with our server")
                    setSubmitted(false)
                }
            })
        }
        return
    }

    // useEffect(() => { 

    // }, [submitted])
    
    useEffect(() => {
        fetchData("logout", null).then((response) => console.log(response))
    }, []) 

  return (
    <>
        <form className="w-96 min-h-[28rem] rounded-lg bg-white bg-opacity-35 flex flex-col pt-7 gap-5 shadow-md p-6">
            <h1 className="self-center font-black font-sans text-2xl w-64 text-center">{needToRegister? "Welcome to MyJournal !": "Welcome back !"}</h1>
            <div className="flex flex-col gap-1 w-full">       
                <label htmlFor="email" className="font-semibold"> Email:</label>
                <input type="email"
                name="username" 
                id="username" 
                value={credentials.username}
                onChange={handleChange}
                className="rounded-xl h-10 pl-4 outline-none focus:shadow focus:shadow-pink-400" 
                placeholder="Type your email...." 
                required/>
            </div>
            <div className="flex flex-col gap-1 w-full">
                <label htmlFor="password" className="font-semibold">Password:</label>
                <input type="password" 
                name="password" 
                id="password"
                value={credentials.password}
                onChange={handleChange}
                className="rounded-xl h-10 pl-4 outline-none focus:shadow focus:shadow-pink-400" 
                placeholder="Enter your password" 
                required/>
            </div>
            
            {   
                needToRegister?
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="confirmpassword" className="font-semibold">Confirm Password:</label>
                    <input type="password"  
                    name="confirmPassword" 
                    id="confirmPassword"
                    value={credentials.confirmPassword}
                    onChange={handleChange}
                    className="rounded-xl h-10 pl-4 outline-none focus:shadow focus:shadow-pink-400"  
                    placeholder="Confirm your password" 
                    required/>
                </div>
                :
                ""
            }
            <button 
            className={`bg-myIndigo w-[20.7rem] h-8 rounded-xl my-2 text-white font-semibold outline-white active:scale-90 hover:opacity-80 ${submitted? "opacity-35" : ""}` }
            onClick={handleSubmit}
            >
                {needToRegister?"Register": "Login"}
            </button> 
            <div className="w-auto flex items-center gap-2"><p className="text-sm font-sans">{needToRegister? "Already a user?" :"Not yet registered?"}</p> <button className="underline font-bold text-black" onClick={handleNeedToRegister}>{needToRegister? "Login":"Register"}</button></div>
        </form>
    </>
  )
}


export default FormComponent