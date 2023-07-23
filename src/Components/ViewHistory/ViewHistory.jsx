import * as React from 'react';
import './ViewHistory.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import TablePagination from '@mui/material/TablePagination';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function ViewHistory() {
  const [products, setProducts] = React.useState([]);
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState('');
  const [alertSeverity, setAlertSeverity] = React.useState('');
  const [alertTitle, setAlertTitle] = React.useState('');
  const location = useLocation();
  const userId = location.state.row._id;
  const [history, setHistory] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //   const deleteUser = (id, name) => {
  //     axios
  //       .delete(`http://localhost:7000/product/${id}`)
  //       .then((response) => {
  //         console.log(response);
  //         if (
  //           response.data.message ==
  //           'Product is included in history and cannot be deleted'
  //         ) {
  //           setAlertSeverity('info');
  //           setAlertTitle('Info');
  //           setAlertMsg('Product is included in history and cannot be deleted');
  //           setShowAlert(true);
  //           return setTimeout(() => {
  //             setShowAlert(false);
  //           }, 5000);
  //         }
  //         const filteredProducts = products.filter((user) => user._id != id);
  //         setProducts(filteredProducts);
  //         setAlertSeverity('success');
  //         setAlertTitle('Success');
  //         setAlertMsg('Product Deleted Successfully');
  //         setShowAlert(true);
  //         return setTimeout(() => {
  //           setShowAlert(false);
  //         }, 5000);
  //       })
  //       .catch((err) => {
  //         console.log('Network Error');
  //       });
  //   };

  React.useEffect(() => {
    axios
      .get(`http://localhost:7000/history/${userId}`)
      .then((response) => {
        console.log(response.data.history);
        setHistory(response.data.history);
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

  // Apply pagination to the userNames array
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return (
    <div>
      <div className="flex flex-row justify-between">
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
        <h1 className="font-mono text-2xl mt-6 font-black ml-20">History</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4 mr-12"
          onClick={() => {
            navigate('/add-product');
          }}
        >
          Add Product
        </button>
      </div>
      <div className="mt-5 mx-10 my-10 shadow-2xl">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">
                  Product Name&nbsp;
                </StyledTableCell>
                <StyledTableCell align="center">
                  Price/Unit&nbsp;
                </StyledTableCell>
                <StyledTableCell align="center">Qty&nbsp;</StyledTableCell>
                <StyledTableCell align="center">Delete&nbsp;</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {paginatedProducts.map((row, index) => ( */}
              {history.map((row, index) => (
                <React.Fragment key={row._id}>
                  <StyledTableRow key={row.date}>
                    <StyledTableCell component="th" scope="row">
                      {startIndex + index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.date}</StyledTableCell>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.price}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.qty}</StyledTableCell>
                    <StyledTableCell align="center">
                      <DeleteOutlineOutlinedIcon
                        className="red-icon"
                        onClick={() => {
                          deleteUser(row._id, row.name);
                        }}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                  {row.name.map((name, subIndex) => (
                    <StyledTableRow key={name}>
                      <StyledTableCell component="th" scope="row" />
                      <StyledTableCell align="center" />
                      <StyledTableCell align="center">{name}</StyledTableCell>
                      <StyledTableCell align="center">
                        {row.price[subIndex]}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.qty[subIndex]}
                      </StyledTableCell>
                      <StyledTableCell align="center" />
                    </StyledTableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={products.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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
    </div>
  );
}

export default ViewHistory;
