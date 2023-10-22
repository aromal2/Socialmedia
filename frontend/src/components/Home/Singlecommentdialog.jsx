import React from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Avatar,
    IconButton,
    Typography,
    Card,
    Input,
    
  } from "@material-tailwind/react";

  import {EllipsisHorizontalIcon,TrashIcon,PencilIcon} from "@heroicons/react/24/outline"
  import { useEffect,useState } from "react";


import Singlereply from './Singlereply';
import { PROFILE_POST_URL } from '../../api/baseURL';
import { singleUserdetails, } from '../../api/apiConnections/userConnections';
import {deleteComments,editComments} from'../../api/apiConnections/postConnection';
import { useSelector } from 'react-redux';
import Editcommentdialog from '../Home/Editcommentdialog'


const Singlecommentdialog = ({comm,focusTextAreaReply,setGetcomment,getafterdelete}) => {
const {profilePhoto}=useSelector((state)=>state.user)
const userId=useSelector((state)=>state.user.userId)
    // const {commentId,setCommentid}=useContext(MyContext)

    console.log(comm,"777777777777777755555");
    const [userdetails,setUserdetails]=useState("")
    const [open, setOpen] = useState(false);
  

console.log(comm,"2222single");

    useEffect(() => {
      userDetails();
      deleteComment();
    
    }, [userId]);
  

    const handleOpen = () => {
      setOpen(!open)
    }

const replyHandler = () => {
    console.log(comm.comment, comm._id, comm.userName, "555555555555555")
     focusTextAreaReply(comm._id, comm.userName, comm.comment);
    };


    const userDetails=async()=>{
      const userResponse=await singleUserdetails(userId)

      setUserdetails(userResponse[0].profilePic)
    }


    const deleteComment=async(commentId)=>{
      
       const deleteResponse=await deleteComments(commentId)
      if(deleteResponse)
      {
        console.log(commentId,"lioooooo");
         getafterdelete(commentId)
      }
    
    }

    const getEdited=async(commentresponse,commentId,editedCommentText)=>{
      console.log(commentresponse,commentId,editedCommentText,"777777gt");
      if(commentresponse)
      {
        comm.comment=editedCommentText
      }

    }


    
     
return (

    <div>
           
            <div  className="flex  me-20 ">
          
                  {comm.profilepic?( <div>
                  <Avatar  src={PROFILE_POST_URL+comm.profilepic} size="md" /> 
                  </div>):( <div>
                  <Avatar  src="https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg" size="md" /> 
                  </div>)}
                 
                  <div className="flex flex-col ms-6 mt-2  bg-blue-gray-100 w-64">
                    <div className='flex'>
                       <p className="font-sans text-sm">{comm.userName}</p>
                       <TrashIcon class="h-3 w-3 text-black ms-40 mt-1"  onClick={()=>deleteComment(comm._id)}/>
                       <button onClick={()=>handleOpen(open)}> <PencilIcon class="h-3 w-3 text-gray-500"  /> </button>
                        <Editcommentdialog open={open} handleOpen={handleOpen} commentId={comm._id} getEdited={getEdited}/>
                         
                     </div>
                   
                    <p className="text-sm text-blue-gray-700 font-sans">
                    {comm.comment}
                    </p>
                    <button><p className="text-xs text-blue-gray-300" onClick={replyHandler}>reply</p></button>

                  </div>
               
          </div>
          <div>
            {comm?.reply?.map((replies)=>{
            
              return (
                <Singlereply key={replies._id} reply={replies}  profilepic={comm.profilepic} focusTextAreaReply={focusTextAreaReply} />
                
          
              )
            })}
          </div>

  </div>
  
          
)
          
          }

export default Singlecommentdialog