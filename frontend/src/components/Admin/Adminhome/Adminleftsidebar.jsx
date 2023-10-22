// Leftsidebar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  HomeIcon,
  PlusSmallIcon,
  InboxIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  MagnifyingGlassIcon,
  UsersIcon
} from "@heroicons/react/24/solid";
import { setLogout } from  "../../../redux/adminslice.js"
export function Adminleftsidebar({setAllpost}) {
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOpens = () => {
    setOpens(!opens);
  };



  return (
    <Card className="h-[calc(106vh-2rem)] w-[16rem] max-w-[16rem] p-3 shadow-sm shadow-blue-gray-700 fixed border-black hidden sm:block top-0 left-0">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="black">
          moments
        </Typography>
      </div>
      <List>
        <ListItem className="hover:bg-custom-500 text-black bg-white text-base">
          <ListItemPrefix>
            <HomeIcon className="h-5 w-5 text-base font-serif" />
          </ListItemPrefix>
          <Link to="/admindashboard" className="text-sm">Dashboard</Link>
        
        </ListItem>
        
        <ListItem className="hover:bg-custom-500 text-black bg-white text-base">
          <ListItemPrefix>
            <UsersIcon className="h-5 w-5 text-base font-serif" />
          </ListItemPrefix>

          <Link to="/adminuserlist" className="text-sm">Userlist</Link>
        </ListItem>

        
        
        {/* <ListItem className="hover:bg-custom-500  text-black text-base">
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          a
        </ListItem>
        <ListItem className="hover:bg-custom-500  text-black font-extralight text-base">
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5 " />
          </ListItemPrefix>
          b
        </ListItem> */}
        <ListItem className="hover:bg-custom-500" onClick={()=>dispatch(setLogout())} >
          <ListItemPrefix className="text-sm">
            <PowerIcon className="h-5 w-5 text-black text-base" />
          </ListItemPrefix>
           <Link to='/adminlogin' className="text-sm">Log Out</Link>
        </ListItem>
      </List>
    </Card>
  );
}
