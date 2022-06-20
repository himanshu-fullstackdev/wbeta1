import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import Home2 from "./pages/home2";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home2" element={<Home2 />} />
    </Routes>
  );
};

export default App;
