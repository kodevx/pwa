import React  from 'react';
import defaultClasses from './pincode.css';
import Button from '../Button';
import usePinCode from '../../talons/usePinCode';
import { mergeClasses } from '../../classify';

const Pincode = props =>{

    const classes = mergeClasses(props.classes,defaultClasses);
    const { id } = props;
    const talonProps = usePinCode({ id });
    const { buttonMode ,setPinCode, getPinCodeStatus, resetDefault, response :data } = talonProps;
    // console.log("talonProps",talonProps);
    const { status, message, info } = data ;

    // console.log("Data: ",data);
    const buttonName = buttonMode ? "Check":"Change";
    const infoText = info ? <h5 className={classes.infoText}>Please Enter PIN Code To Check Delivery Availabilty</h5>: null;
    const textStyle = status ? classes.statusSuccess: classes.statusFail;
    const deliveryStatus = data ? <h5 className={textStyle}>{message}</h5>: null;
    
    const buttonElement = buttonMode ? <Button type="reset" priority="high" className={classes.addButton} onClick={getPinCodeStatus} >{buttonName}</Button>: <Button priority="high" className={classes.addButton} onClick={resetDefault}>{buttonName}</Button>;

    return(
        <div className={classes.root}>
          <h5 className={classes.title}>When will I receive my order?</h5>
          <div className={classes.container}>
            <input type="text" className={classes.input} placeholder={"Enter Delivery Pin Code"} onChange={(e)=>{setPinCode(e)}}/>
            {buttonElement}
          </div>
          {infoText}
          {deliveryStatus}
        </div>
    )
}

export default Pincode;