// Leftsidebar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../redux/slice";
import { Dialogbox } from "./Dialogbox";
import { Search } from "./Search";
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
  EnvelopeIcon
} from "@heroicons/react/24/solid";

export function Leftsidebar({setAllpost}) {
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

  const  homenavigate=() =>{
    navigate("/")
  }

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

          <button onClick={homenavigate}> Home</button>
        </ListItem>
        <ListItem
          className="hover:bg-custom-500 text-black"
          onClick={() => handleOpen(!open)}
        >
          <ListItemPrefix>
            <PlusSmallIcon className="h-5 w-5 text-base font-serif" />
          </ListItemPrefix>
          Create Post
        </ListItem>
        <Dialogbox open={open} handleOpen={handleOpen} setAllpost={setAllpost} />
        <hr className="my-2" />

        <ListItem
          className="hover:bg-custom-500  text-black text-base"
          onClick={() => handleOpens(!opens)}
        >
          <ListItemPrefix>
            <MagnifyingGlassIcon  className="h-5 w-5 text-base font-serif " />
          </ListItemPrefix>
          Search
        </ListItem>
        <Search open={opens} handleOpen={handleOpens} />
         <ListItem className="hover:bg-custom-500  text-black text-base">
          <ListItemPrefix>
            <EnvelopeIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/message" className="text-sm">Messages</Link>
        </ListItem> 
        <ListItem className="hover:bg-custom-500  text-black font-extralight text-base">
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5 " />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem className="hover:bg-custom-500" onClick={() => dispatch(setLogout())}>
          <ListItemPrefix className="text-sm">
            <PowerIcon className="h-5 w-5 text-black text-base" />
          </ListItemPrefix>
          <Link to="/login" className="text-sm">Log Out</Link>
        </ListItem>
      </List>
    </Card>
  );
}
