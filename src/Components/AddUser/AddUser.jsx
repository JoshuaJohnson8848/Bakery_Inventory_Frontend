import * as React from 'react';
import './AddUser.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function AddUser() {
  const [name, setName] = React.useState('');
  const [showAlert, setShowAlert] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [disable, setDisable] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addUser = (e) => {
    if (e.key == 'Enter' || e.type == 'click') {
      axios
        .post('http://localhost:7000/users', {
          name,
        })
        .then((response) => {
          setDisable(false);
          handleClose();
          setName('');
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 5000);
        })
        .catch((err) => {
          console.log('Network Error');
        });
    }
  };

  React.useEffect(() => {
    const handleClickOutside = () => {
      setShowAlert(false);
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-row justify-center my-52 ml-16">
      <div className="flex flex-col justify-center">
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '60ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="font-bold font-sans">Add New User</div>
          <TextField
            id="outlined-basic"
            label="User Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              // addUser(e);
              if (e.key == 'Enter') {
                handleClickOpen();
              }
            }}
          />
        </Box>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4 mr-10 ml-2"
          onClick={(e) => {
            e.preventDefault();
            // addUser(e);
            handleClickOpen();
          }}
        >
          Add User
        </button>
      </div>
      {showAlert && (
        <div
          className="fixed inset-0 flex flex-row justify-center z-50 w-80 my-20 mx-6"
          onClick={() => setShowAlert(false)}
        >
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert
              variant="filled"
              severity="success"
              sx={{
                transition: 'opacity 0.5s ease-in-out',
                opacity: showAlert ? 1 : 0,
              }}
            >
              <AlertTitle>Success</AlertTitle>
              New User Added Successfully
            </Alert>
          </Stack>
        </div>
      )}
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {'Add New User ?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure to add new user ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                addUser(e);
                setDisable(true);
              }}
              disabled={disable}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default AddUser;
