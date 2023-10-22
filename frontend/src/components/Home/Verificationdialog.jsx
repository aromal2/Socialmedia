import React, { useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  IconButton,
} from '@material-tailwind/react';
import StripeCheckout from 'react-stripe-checkout';
import { useSelector } from 'react-redux';
import { handleverification } from '../../api/apiConnections/userConnections';

const Verification = ({ open, handleOpen }) => {
  const handleClose = () => {
    // Reset the input field and close the dialog
    setEditedCommentText('');
    setIsSubmitted(false);
    handleOpen();
  };

  const [product] = useState({
    name: 'Profile Verification',
    price: 699,
    description: 'Profile verification',
  });
  const[profileverified,setProfileverified]=useState("")
  const { token } = useSelector((state) => state.user);

  const onToken = async (token) => {
    // You can access the token object here, which contains payment details and user email
    console.log('Token:', token);

    // Pass user details and token to your API function
    const handletokenresponse = await handleverification(token,product);
    setProfileverified(handletokenresponse)
  };

  return (
    <Dialog size="xs" open={open} handler={handleClose} className="overflow-y-scroll h-96">
      <DialogHeader className="justify-between">
        <Typography variant="h5" color="blue-gray">
          Pay for verification
        </Typography>

        <IconButton color="blue-gray" size="sm" variant="text" onClick={handleOpen}>
          Close
        </IconButton>
      </DialogHeader>

      <div>
        <DialogBody className="pr-2">
          <div className="w-96 form-group-container">
            {!profileverified?( <StripeCheckout
              className="center"
              stripeKey="pk_test_51O2AEnSEPzyvaD8mdtTE3Tjbil4tqjC8Giv5pSAbLadkkdcjorqsFoUaoBDwrBAWHRlHA6iWyh5nCzVDEQrbdmDm005Z07FZmS"
              token={onToken}
              currency='Inr'
              amount={product.price * 100} // Amount in cents
              name={product.name}
              description={product.description}
              email={token.email} // Pass the user's email to Stripe
            />):(<div>you are paid</div>)}
           
          </div>
        </DialogBody>
      </div>
    </Dialog>
  );
};

export default Verification;
