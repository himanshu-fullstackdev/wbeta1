import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import Home2 from "./pages/home2";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home2 />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
