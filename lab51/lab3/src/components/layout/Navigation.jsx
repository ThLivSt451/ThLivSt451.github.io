import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

function Navigation() {
    const { getTotalItems } = useContext(CartContext);

    return (
        <nav>
            <Link to="/"><span>Products</span></Link>
            <Link to="/sales"><span>Discounts</span></Link>
            <Link to="/profile"><span>Profile</span></Link>
            <Link to="/about"><span>About us</span></Link>
            <Link to="/cart">🛒 Cart (<span id="cart-count">{getTotalItems()}</span>)</Link>
        </nav>
    );
}

export default Navigation;