import  { useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

import { useDispatch } from "react-redux";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { listUser,followPost, unfollowPost, singleUserdetails,verify } from "../../api/apiConnections/userConnections";
import { useSelector } from "react-redux";
import Sidebarfriends from "../Home/Sidebarfriends"
import { Link } from "react-router-dom";
import Verification from "../Home/Verificationdialog"

export function Rightsidebar() {
  const [open, setOpen] = useState(0);
  const [opens, setOpens] = useState(false);
  const [state,setState] = useState([])
  const [verifybutton,setVerifybutton]=useState([])
  // const userId=useSelector((state)=>state.user.userId)
  // const userName=useSelector((state)=>state.user.userName)
const email=useSelector((state)=>state.user.email)
  
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleOpens = () => {
    setOpens(!opens);
  };

  useEffect (()=>{
     listAlluser()
  },[])

  useEffect (()=>{
    verifyprofile()
 },[])



  const listAlluser = async ()=>{
    const listuserResponse= await listUser()
    setState(listuserResponse)
  }

  const verifyprofile=async()=>{
    const verifyresponse=await verify(email)
      setVerifybutton(verifyresponse.email)
    console.log(verifyresponse,"6666666666");
  }

  //  console.log(verifybutton,"66666666666666rrrtyu");


return (
    <Card className="absolute top-0 right-0 mt-3 mr-3 w-[12rem] p-3   custom-sidebar hidden lg:block h-[calc(104vh-2rem)]">
      <ListItem className="hover:bg-custom-500">
        <ListItemPrefix>
          <UserCircleIcon className="h-5 w-5 text-base" />
        </ListItemPrefix>
       <Link to="/profile" >Profile</Link>
      
      </ListItem>
      {verifybutton? (
        <>
  <ListItem
    className={`hover:bg-custom-500 ${verifybutton.length ? 'disabled' : ''}`}
    onClick={() => !verifybutton.length && handleOpens(!opens)}
    disabled={verifybutton.length ? true : false}
  >
    <ListItemPrefix>
      <UserCircleIcon className="h-5 w-5 text-base" />
    </ListItemPrefix>
    Profile Verification
  </ListItem>
  <Verification open={opens} handleOpen={handleOpens} disabled={verifybutton.length ? true : false} />
</>

) : (
  <>
    <ListItem className="hover:bg-custom-500" onClick={() => handleOpens(!opens)}>
      <ListItemPrefix>
        <UserCircleIcon className="h-5 w-5 text-base" />
      </ListItemPrefix>
      pay for verification
    </ListItem>
    <Verification open={opens} handleOpen={handleOpens} />
  </>
)}

      {/* <List> */}
        {/* <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }


        >
        <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>

              
              <Typography color="blue-gray" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Analytics
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Reporting
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Projects
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion> */}
        {/* <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}

              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
             
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                E-Commerce
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Orders
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Products
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion> */}
        {/* <hr className="my-2 hover:bg-custom-500" /> */}
        {/* <ListItem className="text-black text-base">
          <ListItemPrefix>
          Suggested for you
          </ListItemPrefix>
          <div>
          </div>
        </ListItem>
        
          <div>
           {state.map((alluser)=>(
         <Sidebarfriends key={alluser._id}  alluser={alluser}/>

          ))}
        </div>
        
        
        

        {/* <ListItem className="hover:bg-custom-500">
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5 hover:bg-custom-500" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem className="hover:bg-custom-500">
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5 hover:bg-custom-500" />
          </ListItemPrefix>
          Log Out
        </ListItem> */}
      {/* </List> */} 
    </Card>
  );
      }
