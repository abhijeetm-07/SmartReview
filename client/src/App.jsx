import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landingPage.jsx";
import Login from "./pages/loginPage.jsx";
import Signup from "./pages/SignupPage.jsx";
import Dashboard from "./pages/DashboardPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
