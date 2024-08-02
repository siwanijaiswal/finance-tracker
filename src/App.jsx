import "./App.css";
import Header from "./components/Header/Header.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
