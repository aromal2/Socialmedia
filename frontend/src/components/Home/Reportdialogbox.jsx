import React, { useState } from 'react';
import {
  Button,
  Dialog,
  Radio,
  Typography
} from '@material-tailwind/react';

import { postReport } from '../../api/apiConnections/postConnection';
import { useSelector } from 'react-redux';

const Reportdialogbox = ({ open, handleOpen,postId, postedUsername}) => {

  const  {userId}=useSelector((state)=>state.user)
    const [selectedOption,setSelectedOption] = useState("")

    const handleOption =(event)=>{
        setSelectedOption(event.target.value)
    }
console.log(userId,"llllll");

  const postReports=async (e)=>{
    e.preventDefault()
    const postreportResponse= await  postReport(postId, postedUsername,userId,selectedOption);
  }

return (
    <>
     
      <Dialog open={open} handler={handleOpen}>
        <form onSubmit={postReports}>
          <div className="flex flex-col gap-2">
            <div>What's the Reason to report?</div>
            <Radio
              name="terms"
              value="spam"
               onChange={handleOption}
              label={
                <Typography color="blue-gray" className="flex font-medium">
                  It's{' '}
                  <Typography
                    as="a"
                    href="#"
                    color="blue"
                    className="font-medium transition-colors hover:text-blue-700"
                    name="submit"
                  >
                    &nbsp;spam
                  </Typography>
                </Typography>
              }
            />
            <Radio
        name="terms"
        value=" Nudity or sexual activity"
        onChange={handleOption}
        label={
          <Typography color="blue-gray" className="flex font-medium">
            Nudity or sexual activity
            <Typography
              as="a"
              href="#"
              color="blue"
              className="font-medium transition-colors hover:text-blue-700"
              name = "submit"
              >
              
            </Typography>
            
          </Typography>
        }
      />
       <Radio
        name="terms"
        value=" Hate Speech or symbols"
        onChange={handleOption}
        label={
          <Typography color="blue-gray" className="flex font-medium">
            Hate Speech or symbols
            <Typography
              as="a"
              href="#"
              color="blue"
              className="font-medium transition-colors hover:text-blue-700"
              name="submit"
            >
              
            </Typography>
            
          </Typography>
        }
      />
      <Radio
        name="terms"
        value="  Eating Disorders"
        onChange={handleOption}
        label={
          <Typography color="blue-gray" className="flex font-medium">
            Eating Disorders
            <Typography
              as="a"
              href="#"
              color="blue"
              className="font-medium transition-colors hover:text-blue-700"
              name="submit"
            >
              
            </Typography>
            
          </Typography>
        }
      />
       <Radio
        name="terms"
        value="  Scam or fraud"
        onChange={handleOption}
        label={
          <Typography color="blue-gray" className="flex font-medium">
            Scam or fraud
            <Typography
              as="a"
              href="#"
              color="blue"
              className="font-medium transition-colors hover:text-blue-700"
              name="submit"
            >
              
            </Typography>
            
          </Typography>
        }
      />
  <Radio
        name="terms"
        value=" False information"
        onChange={handleOption}
        label={
          <Typography color="blue-gray" className="flex font-medium">
            False information
            <Typography
              as="a"
              href="#"
              color="blue"
              className="font-medium transition-colors hover:text-blue-700"
              name="submit"
            >
              
            </Typography>
            
          </Typography>
        }
      />
      <Radio
        name="terms"
        value=" False information"
        onChange={handleOption}
        label={
          <Typography color="blue-gray" className="flex font-medium">
            i don't like it
            <Typography
              as="a"
              href="#"
              color="blue"
              className="font-medium transition-colors hover:text-blue-700"
              name="submit"
            >
              
            </Typography>
            
          </Typography>
        }
      />
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium"
              onClick={handleOpen}
              >
              Submit
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default Reportdialogbox;
