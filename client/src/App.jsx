import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landingPage.jsx";
import Login from "./pages/LoginPage.jsx";
import Signup from "./pages/SignupPage.jsx";
import Dashboard from "./pages/DashboardPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // 1. Added this import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Route Group */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
