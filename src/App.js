import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import OrderProcessPage from './pages/OrderProcessPage';
import Cart from './pages/Cart';
import Loader from './components/Loader';

export const LoadingContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <Router>
        <Navbar />
        {loading && (
          <div
            style={{
              position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
              background: "rgba(255,255,255,0.82)", zIndex: 9999,
              display: "flex", alignItems: "center", justifyContent: "center"
            }}
          >
            <Loader text="טוען..." />
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order/:orderId" element={<OrderProcessPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </LoadingContext.Provider>
  );
}

export default App;
