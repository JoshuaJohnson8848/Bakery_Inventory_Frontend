import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Banner from './Components/Banner/Banner';
import TopBar from './Components/TopBar/TopBar';
import UsersTable from './Components/UsersTable/UsersTable';
import ProductsTable from './Components/ProductsTable/ProductsTable';
import AddUser from './Components/AddUser/AddUser';
import AddProduct from './Components/AddProduct/AddProduct';
import AdminsTable from './Components/AdminsTable/AdminsTable';
import EditUser from './Components/EditUser/EditUser';
import EditProduct from './Components/EditProduct/EditProduct';
import ViewHistory from './Components/ViewHistory/ViewHistory';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopBar />
        {/* <Banner /> */}
        <Routes>
          <Route path="/users" element={<UsersTable />} />
          <Route path="/products" element={<ProductsTable />} />
          <Route path="/history" element={<ViewHistory />} />
          {/* <Route path="/admins" element={<AdminsTable />} /> */}
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-user" element={<EditUser />} />
          <Route path="/edit-product" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
