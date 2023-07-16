import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Banner from './Components/Banner/Banner';
import TopBar from './Components/TopBar/TopBar';
import UsersTable from './Components/UsersTable/UsersTable';
import ProductsTable from './Components/ProductsTable/ProductsTable';
import AddUser from './Components/AddUser/AddUser';
import AddProduct from './Components/AddProduct/AddProduct';
import AdminsTable from './Components/AdminsTable/AdminsTable';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopBar />
        {/* <Banner /> */}
        <Routes>
          <Route path="/users" element={<UsersTable />} />
          <Route path="/products" element={<ProductsTable />} />
          {/* <Route path="/admins" element={<AdminsTable />} /> */}
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
