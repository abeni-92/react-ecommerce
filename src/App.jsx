import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";
import Shop from "./Shop";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
}

export default App;
