import React, { useContext, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-v3'


import Axios from 'axios';
import AppContext from './appStore';
export default function SendMailDialog() {

    const { state, actions } = useContext(AppContext)
    const [email, setEmail] = useState("")
    const [captcha,setCaptcha] = useState("")
    const handleClose = () => {
        actions.closeSendmailModal()
    };


    useEffect(() => {

         loadReCaptcha(process.env.REACT_APP_RECAPTCHA_SITE);


    }, state.open)

    const verifyCallback = (value)=>{
        setCaptcha(value)
    }



    const handleSend = () => {
        let content = document.getElementById("json-pretty").innerHTML;
        Axios.post(process.env.NODE_ENV == "development" ? "http://localhost:9000/hello":"/.netlify/functions/hello", {
            content,
            to: email,
            captcha
        }).then(data => console.log(data))
            .catch(err => console.log(err))

        handleClose()
    }

    return (
        <Dialog open={state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Send Decoded Token</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To Send the decoed token to this website, please enter your email address here.
           </DialogContentText>
                <TextField
                    value={email}
                    onChange={e => { setEmail(e.target.value) }}
                    autoFocus
                    margin="dense"
                    id="Send Email to"
                    label="Email Address"
                    type="email"
                    fullWidth
                />

                <ReCaptcha 
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE}
                    action='sendmail'
                    verifyCallback={verifyCallback}
                />



            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button disabled={!/^[a-z][a-z0-9\.]+\@(gmail|yahoo|live|outlook)\.[a-z]{2,}$/.test(email)} onClick={handleSend} color="primary">
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
}