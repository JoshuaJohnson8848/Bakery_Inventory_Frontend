import * as React from 'react';
import './ProductsTable.css';
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
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

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

function UsersTable() {
  const [products, setProducts] = React.useState([]);
  const navigate = useNavigate();

  const deleteUser = (id, name) => {
    axios
      .delete(`http://localhost:7000/product/${id}`)
      .then((response) => {
        console.log(response);
        const filteredProducts = products.filter((user) => user._id != id);
        setProducts(filteredProducts);
      })
      .catch((err) => {
        console.log('Network Error');
      });
  };

  React.useEffect(() => {
    axios
      .get('http://localhost:7000/product')
      .then((response) => {
        setProducts(response.data.products);
        console.log(response.data.products);
      })
      .catch((err) => {
        console.log('Network Error');
      });
  }, []);

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
        <h1 className="font-mono text-2xl mt-6 font-black ml-20">
          Products Details
        </h1>
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
                <StyledTableCell align="center">Product Name</StyledTableCell>
                <StyledTableCell align="center">Price&nbsp;</StyledTableCell>
                <StyledTableCell align="center">Qty&nbsp;</StyledTableCell>
                <StyledTableCell align="center">Edit&nbsp;</StyledTableCell>
                <StyledTableCell align="center">Delete&nbsp;</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((row, index) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.price}</StyledTableCell>
                  <StyledTableCell align="center">{row.qty}</StyledTableCell>
                  <StyledTableCell align="center">
                    <EditOutlinedIcon color="primary" />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <DeleteOutlineOutlinedIcon
                      className="red-icon"
                      onClick={() => {
                        deleteUser(row._id, row.name);
                      }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default UsersTable;
