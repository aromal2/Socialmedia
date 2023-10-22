import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
  Input,
  Card,
  List,
  ListItem,
  Avatar,
} from "@material-tailwind/react";
import { search } from "../../api/apiConnections/userConnections";
import { PROFILE_POST_URL } from "../../api/baseURL";
import Followersprofile from "./Followersprofile";
export function Search({ open, handleOpen }) {
  const [searchQuery, setSearchQuery] = useState(""); // Define the searchQuery state
  const [searched, setSearched] = useState([]);
  const [opens, setOpens] = useState(false);
  const onSearchChange = (e) => {
    setSearchQuery(e.target.value); // Handle search input field changes
  };

  const handleOpens = () => {
    setOpens(!opens)
  }

  const handleSearch = async () => {
    const searchResponse = await search(searchQuery);
    setSearched(searchResponse);
    console.log(searched, "111111111111111111--------------2");
  };



  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="relative -top-7"
    >
      <DialogHeader className="justify-between">
        <Typography variant="h5" color="blue-gray">
          Search
        </Typography>

        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={handleOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </DialogHeader>

      <DialogBody className="overflow-y-scroll pr-2">
        <div className="relative flex w-full max-w-[30rem]">
          <input
            type="search"
            label="Search"
            value={searchQuery}
            onChange={onSearchChange}
            className="pr-20 focus:outline-none border-b-blue-gray-300 p-1 rounded"
          />
          <Button
            size="sm"
            disabled={!searchQuery}
            onClick={handleSearch}
            className="!absolute right-1 top-1 rounded bg-custom-500  ms-2 "
          >
            Search
          </Button>
        </div>
      </DialogBody>
      <div className="  ms-16 h-52 overflow-y-scroll">
        {searched.map((searchdata) => {
          if(searchdata){
          console.log(searchdata, "searchdata");
          return (
            <div className="-ms-3">
              <Card className="w-full align-middle mt-2 ">
                <List className="">
                  <ListItem className=" gap-1" onClick={() => handleOpens(opens)}>
                   <Followersprofile  open={opens}  handleOpen={handleOpens} searchedData={searchdata}/> 
                    
              {searchdata.profilePic ===" "?(<Avatar
                      src="https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"
                      alt=""
                      size="md"
                    />):(<Avatar
                      src={PROFILE_POST_URL + searchdata.profilePic}
                      alt=""
                      size="md"
                    />)}      
                    
                    <div className="flex flex-col -mx-2">
                      <div className="mx-3">{searchdata.userName}</div>
                      <div className="text-sm text-blue-gray-400 mx-3">
                        {searchdata.firstName} {searchdata.lastName}{" "}
                      </div>
                    </div>
                  </ListItem>
                </List>
              </Card>
            </div>
          );}else{
            <div>ffffffffffff</div>
          }
        })}
      </div>
    </Dialog>
  );
}
