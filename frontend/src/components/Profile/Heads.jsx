import React from 'react';
import Tail from '../../components/Profile/Tail'
import { useEffect,useState } from 'react';
import { singleuserPost } from '../../api/apiConnections/postConnection';
import {singleUserdetails,verify} from '../../api/apiConnections/userConnections'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Followersdialogbox } from './Followersdialog'
import {Followingdialogbox} from './Followingdialog'
import { Button } from "@material-tailwind/react";
import Editprofile from '../Profile/Editprofile'
import { PROFILE_POST_URL} from '../../api/baseURL';
import { Icon } from '@iconify/react';

function Heads() {
  let userId = useSelector((state) => state.user.userId);
  let [postResponses, setPostresponse] = useState([]);
  let [following, setFollowing] = useState();
  let [followers,setFollowers]=useState()
  let [profile,setProfile]=useState([])
  const [verifybutton,setVerifybutton]=useState({})

  const [followerslength,setFollowerslength]=useState()
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [opened, setOpened] = useState(false);

   let {userName,profilePhoto,email} = useSelector((state) => state.user);
  //  let profilePic=useSelector((state)=>state.user.profilephoto)
  console.log(profilePhoto,"pppphoyoo");
   let post=useSelector((state)=>state.user.allpost)
console.log(post,"4postrrrr");

  useEffect(() => {
    postResponse();
    userResponse();
    verifyprofile()
  },[]);

  let handleOpen = () => {
    setOpen(!open);
  };

  let handleOpens = () => {
    setOpens(!opens);
  };

  let handleOpened = () => {
    setOpened(!opened);
  };



  const postResponse = async () => {
    const postResponse = await singleuserPost(userId);
    setPostresponse(postResponse);
  };

  const userResponse = async () => {
    const userResponse = await singleUserdetails(userId);;
    setProfile(userResponse[0]?.profilePic);
    
    setFollowing(userResponse[0]?.following.length);
    setFollowerslength(userResponse[0]?.followers.length)
  };

  const verifyprofile=async()=>{
    const verifyresponse=await verify(email)
       setVerifybutton(verifyresponse)
  }

 




  return (
    <div className='w-[calc(100vw-16rem)] fixed right-0 overflow-y-scroll '>
      <div className='h-screen'>
        <div className='border-b-2  flex justify-center items-center h-64'>
          <div className='flex flex-col items-center   w-60 rounded-none'>
          
            
            
            <img
               src={profilePhoto ? (PROFILE_POST_URL+profilePhoto) : "https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"}
              alt="profilepicture"
              className='h-36 w-36 ms-64 rounded-full mb-6'
            ></img>
            <p></p>
          </div>
          <div className='flex ms-32'>
            <div className=''>
              <p className='mb-8 text-blue-gray-700'>{postResponses.length} posts</p>
              {verifybutton ?
                (<div className="flex items-center">
  <p className="mb-2 text-black ms-2">
    {userName}
  </p>
  <p className="text-black ms-0 -mt-2">
    <Icon icon="fe:check-verified"color="#499de9" />
  </p>
</div>):( <p className="mb-2 text-black ms-2">
    {userName}
  </p>)}
   



            </div>
            <div className='ms-14'>
          
              <div className='mb-8 text-blue-gray-700 ms-4' onClick={()=>handleOpens(!opens)}> {followerslength} followers</div>
              <Followersdialogbox open={opens} handleOpen={handleOpens} />

              <Button onClick={() => handleOpen(open)} variant="gradient" className="rounded-full -mt-2 me-1 border-gray-800  text-xs" size='sm'>
                edit Profile
              </Button>
              {open && <Editprofile open={open} handleOpen={handleOpen} />}


            </div>

            <div className='ms-14 '>
              <p className='mb-8 text-blue-gray-700' onClick={()=>handleOpened(!opened)}>{following} following</p>
              <Followingdialogbox open={opened} handleOpen={handleOpened} />
              <Button variant="gradient" className="rounded-full -mt-2 me-1" size='sm'>
                archive
              </Button>

            </div>
          </div>
        </div>
        <Tail />

      </div>
    </div>
  );
}

export default Heads;
