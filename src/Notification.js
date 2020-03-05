import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const Notification = () => {


    
    
    const [isOpen,setOpen]  = useState(false)
    const handleClose= ()=>setOpen(false)

    const Alert=(props)=> {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
            This is a success message!
        </Alert>
    </Snackbar>
}


export default Notification