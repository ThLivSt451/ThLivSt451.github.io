import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Layout components
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';

// Page components
import HomePage from './components/pages/HomePage';
import ProductPage from './components/pages/ProductPage';
import CartPage from './components/pages/CartPage';
import ProfilePage from './components/pages/ProfilePage';
import AboutPage from './components/pages/AboutPage';
import SalesPage from './components/pages/SalesPage';

// Main styles
import './styles/styles.css';

function App() {
  return (
      <CartProvider>
        <Router>
          <div className="app">
            <Header />
            <Navigation />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/sales" element={<SalesPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
  );
}

export default App;