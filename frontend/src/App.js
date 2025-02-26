import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Edit from "./pages/Edit";
import Create from "./pages/Create";

function App() {
  const location = useLocation();
  const isPhoneRoute = location.pathname === "/Phone";
  return (
    <div>
      {!isPhoneRoute && (
        <div>
          <Navbar />
        </div>
      )}

      <div>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
