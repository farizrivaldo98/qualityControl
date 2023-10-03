import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Edit from "./pages/Edit";
import Create from "./pages/Create";
import Report from "./pages/Report";
function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/create" element={<Create />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
