import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../data/products';
import { CartContext } from '../../context/CartContext';
import '../../styles/product.css';

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart, isInCart } = useContext(CartContext);

    useEffect(() => {
        const fetchedProduct = getProductById(id);
        if (fetchedProduct) {
            setProduct(fetchedProduct);
        }
    }, [id]);

    if (!product) {
        return <div className="product-page"><h2>Product not found</h2></div>;
    }

    const handleAddToCart = () => {
        if (product.available) {
            addToCart(product);
        }
    };

    const renderPrice = () => {
        if (product.oldPrice) {
            return (
                <p id="product-price">
                    <span className="old-price">{product.oldPrice.toFixed(2)} UAH</span>
                    <span className="new-price">{product.price.toFixed(2)} UAH</span>
                </p>
            );
        }
        return <p id="product-price"><strong>{product.price.toFixed(2)} UAH</strong></p>;
    };

    const renderButton = () => {
        if (!product.available) {
            return <button id="add-to-cart" disabled className="disabled">❌ Out of Stock</button>;
        }

        if (isInCart(product.id)) {
            return <button id="add-to-cart" className="in-cart" onClick={handleAddToCart}>✓ Added to Cart</button>;
        }

        return <button id="add-to-cart" onClick={handleAddToCart}>🛒 Add to Cart</button>;
    };

    return (
        <main>
            <div className="product-page">
                <div className="image-container">
                    <img id="product-image" src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                    <h2 id="product-name">{product.name}</h2>
                    {renderPrice()}
                    <p id="product-status">
                        {product.available ? "✔ Available" : "❌ Out of stock"}
                    </p>
                    <p id="product-rating">Rating: {product.rating}</p>
                    <p id="product-description">{product.description}</p>
                    {renderButton()}
                </div>
            </div>
        </main>
    );
}

export default ProductPage;