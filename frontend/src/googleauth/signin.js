import React from 'react'
import {auth,provider } from "./config"
import {signInWithPopup} from "firebase/auth"
import { useEffect,useState } from 'react'

const signin = () => {
const [value,setValue]= useState('')
    const handleClick=()=>{
        signInWithPopup(auth,provider).then((data)=>{
            setValue(data.user.email)
            localStorage.setItem("email",data.user.email)
    })

    }

    useEffect(()=>{
        setValue(localStorage.getItem('email'))
    })
  return (
    <div>
        {value?<Home/>:  
        <button onClick={handleClick}>sighin with google</button>
  }
    </div>
  )
}

export default signin