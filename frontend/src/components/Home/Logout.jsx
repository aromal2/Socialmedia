import React, { useState } from 'react'
// import {setLogout} from "../../redux/userRedux/slice"
// import { useDispatch } from 'react-redux'
// import { useNavigate} from 'react-router-dom'


const Logout = ({signout}) => {
    const [eve,setEve] = useState('')
    const passProps= ()=>{
        signout(eve)
    }

  return (
    <>
    <input onChange={(event)=>setEve(event.target.value)}></input>
    <button onClick={passProps}>Submit</button>
    </>
    
  )
}

export default Logout