import React from "react";
import { Dialogbox } from "./Dialogbox";
import { useState } from "react";
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
  Dialog,
} from "@material-tailwind/react";

import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  PlusSmallIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setLogout } from "../../redux/userRedux/slice";

export function Leftsidebar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Card className="h-[calc(106vh-2rem)] w-full max-w-[16rem] p-3 shadow-sm shadow-blue-gray-700 fixed border-black hidden sm:block top-0 left-0">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="black">
          moments
        </Typography>
      </div>
      <List>
        <ListItem className="hover:bg-custom-500 text-black bg-white text-base">
          <ListItemPrefix>
            <HomeIcon className="h-5 w-5 " />
          </ListItemPrefix>
          <Link to="/"> Home</Link>
         
        </ListItem>
        <ListItem
          className="hover:bg-custom-500 text-black"
          onClick={() => handleOpen(!open)}
        >
          <ListItemPrefix>
            <PlusSmallIcon className="h-5 w-5 text-base" />
          </ListItemPrefix>
          Create Post
        </ListItem>
        <Dialogbox open={open} handleOpen={handleOpen} />
        <hr className="my-2" />

        <ListItem className="hover:bg-custom-500  text-black text-base">
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5 text-base font-serif " />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem className="hover:bg-custom-500  text-black text-base">
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem className="hover:bg-custom-500  text-black font-extralight text-base">
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5 " />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem
          className="hover:bg-custom-500"
          onClick={() => dispatch(setLogout())}
        >
          <ListItemPrefix className="text-sm">
            <PowerIcon className="h-5 w-5 text-black text-base" />
          </ListItemPrefix>
          <Link to="/login" className="text-sm">Log Out</Link>
        </ListItem>
      </List>
    </Card>
  );
}
