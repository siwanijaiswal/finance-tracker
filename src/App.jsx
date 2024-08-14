import './App.css';
import Header from './components/Header/Header.jsx';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignIn from './components/SignIn/SignIn.jsx';
import SignUp from './components/SignUp/SignUp.jsx';

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='dashboard' element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
