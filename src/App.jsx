import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Banner from './Components/Banner/Banner';
import TopBar from './Components/TopBar/TopBar';
import UsersTable from './Components/UsersTable/UsersTable';

function App() {
  return (
    <div className="App">
      <TopBar />
      <BrowserRouter>
        <UsersTable />
        <Banner />
      </BrowserRouter>
    </div>
  );
}

export default App;
