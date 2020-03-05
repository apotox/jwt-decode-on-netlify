import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { TextField, Button } from '@material-ui/core';
import 'react-json-pretty/themes/monikai.css';
import './App.css'
import AppContext from './appStore';
import SendMailDialog from './SendMailDialog';
const JSONPretty = require('react-json-pretty');





var jwtDecode = require('jwt-decode');



/**
 * checking the
 *  <a href="/.netlify/functions/hello">test lambda</a>
 */
export default function App() {


  const [state, setState] = useState({
    open: false
  })
  const [jwt, setJwt] = useState("")
  const [open, setOpen] = useState(false)
  const [decoded, setDecoded] = useState(null)
  const [errMsg, setErrMsg] = useState(null)









  const actions = {
    closeSendmailModal: () => {
      setState(s => ({
        ...s,
        open: false
      }))
    },
    openSendmailModal: () => {
      setState(s => ({
        ...s,
        open: true,
      }))
    }

  }




  const decodeJwt = () => {
    try {
      setDecoded(jwtDecode(jwt))
      setErrMsg(null)
    } catch (err) {
      setErrMsg(err.message)
      setDecoded(null)
    }
  }


  return (
    <React.Fragment>
      <AppContext.Provider value={{ state, actions }}>
        <CssBaseline />
        <Container maxWidth="md" style={{ padding: 20 }}  >

          <h3>Decode JWT tokens</h3>
          <p>This library doesn't validate the token, any well formed JWT can be decoded</p>

          <TextField
            onChange={(e) => {
              setJwt(e.target.value)
            }}
            error={errMsg != null}
            fullWidth
            id="outlined-basic"
            helperText={errMsg}
            label="JWT"
            value={jwt}
            variant="outlined" />


          <JSONPretty id="json-pretty" data={JSON.stringify(decoded)}></JSONPretty>
{/* */}
          <p><Button color="primary" onClick={decodeJwt}>Decode</Button> <Button disabled={decoded == null} onClick={actions.openSendmailModal}>Send AS Email</Button></p>


        </Container>
        <SendMailDialog />
      </AppContext.Provider>



    </React.Fragment>
  );
}