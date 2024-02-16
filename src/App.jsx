import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import { Cart } from "./pages/Cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
		<Route path="product/:id" element={<Product />} />
		<Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
