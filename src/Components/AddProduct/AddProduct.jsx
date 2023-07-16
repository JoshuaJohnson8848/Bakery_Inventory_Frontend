import * as React from 'react';
import './AddProduct.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

function AddProduct() {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [qty, setQty] = React.useState(0);
  const [showAlert, setShowAlert] = React.useState(false);

  const addProduct = (e) => {
    if (e.key == 'Enter' || e.type == 'click') {
      axios
        .post('http://localhost:7000/product', {
          name,
          price,
          qty,
        })
        .then((response) => {
          setName('');
          setPrice(0);
          setQty(0);
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
    <div className="flex flex-row justify-center my-24 ml-16">
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
          <div className="font-bold font-sans">Add New Product</div>
          <TextField
            required
            id="outlined-basic"
            label="Product Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '60ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="font-bold font-sans">Add Price</div>
          <TextField
            required
            id="outlined-basic"
            label="Price"
            variant="outlined"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Box>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '60ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="font-bold font-sans">Add Qty</div>
          <TextField
            required
            id="outlined-basic"
            type="number"
            label="Qty"
            variant="outlined"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            onKeyDown={(e) => {
              addProduct(e);
            }}
          />
        </Box>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4 mr-10 ml-2"
          onClick={(e) => {
            e.preventDefault();
            addProduct(e);
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
              New Product Added Successfully
            </Alert>
          </Stack>
        </div>
      )}
    </div>
  );
}

export default AddProduct;
