import * as React from 'react';
import './EditProduct.css';
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
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useLocation, useNavigate } from 'react-router-dom';

function EditProduct() {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [qty, setQty] = React.useState(0);
  const [showAlert, setShowAlert] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [disable, setDisable] = React.useState(false);
  const navigate = useNavigate();
  const [alertMsg, setAlertMsg] = React.useState('');
  const [alertSeverity, setAlertSeverity] = React.useState('');
  const [alertTitle, setAlertTitle] = React.useState('');
  const location = useLocation();
  const productId = location.state.row._id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateProduct = (e) => {
    if (e.key == 'Enter' || e.type == 'click') {
      axios
        .put(`http://localhost:7000/product/${productId}`, {
          name,
          price,
          qty,
        })
        .then((response) => {
          setDisable(false);
          handleClose();
          setAlertSeverity('success');
          setAlertTitle('Success');
          setAlertMsg('Successfully Updated Product');
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 5000);
        })
        .catch((err) => {
          console.log('Network Error');
          setDisable(false);
          setDisable(false);
          setAlertSeverity('error');
          setAlertTitle('Failed');
          setAlertMsg('Something Went Wrong');
          handleClose();
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 5000);
        });
    }
  };

  React.useEffect(() => {
    axios
      .get(`http://localhost:7000/product/${productId}`, {})
      .then((response) => {
        console.log(response.data.product);
        const name = response.data.product.name;
        const qty = response.data.product.qty;
        const price = response.data.product.price;
        setName(name);
        setQty(qty);
        setPrice(price);
      })
      .catch((err) => {
        console.log('Network Error');
      });
  }, []);

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
    <div>
      <div className="font-mono mt-8 ml-12 text-xl">
        <span
          className="mr-2"
          onClick={() => {
            navigate('/products');
          }}
        >
          <KeyboardBackspaceIcon color="primary" />
          Back
        </span>
      </div>
      <div className="flex flex-row justify-center my-20 ml-16">
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
              inputProps={{ min: '0' }}
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
              inputProps={{ min: '0' }}
              onKeyDown={(e) => {
                // addProduct(e);
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
              // addProduct(e);
              handleClickOpen();
            }}
          >
            Update Product
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
                severity={alertSeverity}
                sx={{
                  transition: 'opacity 0.5s ease-in-out',
                  opacity: showAlert ? 1 : 0,
                }}
              >
                <AlertTitle>{alertTitle}</AlertTitle>
                {alertMsg}
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
              {'Add New Product ?'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure to add new product ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={(e) => {
                  setDisable(true);
                  updateProduct(e);
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
    </div>
  );
}

export default EditProduct;
