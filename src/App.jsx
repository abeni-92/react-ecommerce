import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import { Cart } from "./pages/Cart";
import { useState } from "react";
import Toast, { notify } from "./components/Toast";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    const existingItem = cartItems.find((item) => item.id == product.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id == product.id
          ? { ...item, quantity: parseInt(item.quantity) + parseInt(quantity) }
          : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: parseInt(quantity)}]);
    }

    notify("Product added to the cart", "success");
  };

  const handleMinus = (product) => {
    const updatedCart = cartItems.map((item) =>
      item.id == product.id ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCart);
  };

  const handlePlus = (product) => {
    const updatedCart = cartItems.map((item) =>
      item.id == product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const handleRemove = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
  };
  return (
    <div>
      <Toast />
      <Routes>
        <Route path="/" element={<Layout cartItems={cartItems}/>}>
          <Route index element={<Home />} />
          <Route path="shop/" element={<Shop />} />
          <Route
            path="product/:id"
            element={<Product addToCart={addToCart} />}
          />
          <Route
            path="cart"
            element={
              <Cart
                cartItems={cartItems}
                handleMinus={handleMinus}
                handlePlus={handlePlus}
                handleRemove={handleRemove}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
