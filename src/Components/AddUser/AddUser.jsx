import * as React from 'react';
import './AddUser.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

function AddUser() {
  const [name, setName] = React.useState('');
  const [showAlert, setShowAlert] = React.useState(false);

  const addUser = (e) => {
    if (e.key == 'Enter' || e.type == 'click') {
      axios
        .post('http://localhost:7000/users', {
          name,
        })
        .then((response) => {
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
              addUser(e);
            }}
          />
        </Box>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4 mr-10 ml-2"
          onClick={(e) => {
            e.preventDefault();
            addUser(e);
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
    </div>
  );
}

export default AddUser;
