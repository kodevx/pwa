import React,{ useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import GET_PINCODE_STATUS from '../queries/getPincodeStatus.graphql';

const usePinCode = props => {
  const [buttonMode,setButtonMode] = useState(true);
  const [pin,setPin] = useState('');
  const [getStatus,{ data, error }] = useLazyQuery(GET_PINCODE_STATUS);
  const response = data ? { ...data.checkPincode, info: false}: { info: true };

  if(error){
    console.log("Error: ",error);
  }

  const setPinCode = (e) => {
    setPin(e.target.value);
  }

  const resetDefault = () =>{
    setButtonMode(!buttonMode);
    getStatus({ 
      variables: {
      "product_id": null,
      "pincode": null
      }
    });
  }
      
  const getPinCodeStatus = () => {
      setButtonMode(!buttonMode);
      getStatus({ 
        variables: {
        "product_id": 1152, //get the prop from productFullDetail.js  ** important **
        "pincode": pin
        }
      });
  }
    
    return {
      response,
      buttonMode,
      setPinCode,
      getPinCodeStatus,
      resetDefault
   }
}

export default usePinCode;