import React, { useState } from 'react';
import { getDiscountedProducts } from '../../data/products';
import ProductCard from '../common/ProductCard';
import '../../styles/sales.css';

function SalesPage() {
    const [showAvailableOnly, setShowAvailableOnly] = useState(false);
    const [sortBy, setSortBy] = useState('default');
    const discountedProducts = getDiscountedProducts();

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    // Filter products by availability
    let filteredProducts = showAvailableOnly
        ? discountedProducts.filter(product => product.available)
        : discountedProducts;

    // Sort products based on selection
    switch (sortBy) {
        case 'price-asc':
            filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
            break;
        case 'rating-asc':
            filteredProducts = [...filteredProducts].sort((a, b) => a.rating - b.rating);
            break;
        case 'rating-desc':
            filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Keep default order
            break;
    }

    return (
        <div>
            <div className="filter-controls">
                <div className="filter-container">
                    <input
                        type="checkbox"
                        id="show-available-only"
                        checked={showAvailableOnly}
                        onChange={(e) => setShowAvailableOnly(e.target.checked)}
                    />
                    <label htmlFor="show-available-only">Show Available Products Only</label>
                </div>

                <div className="sort-container">
                    <label htmlFor="sort-select">Sort by: </label>
                    <select
                        id="sort-select"
                        value={sortBy}
                        onChange={handleSortChange}
                    >
                        <option value="default">Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating-asc">Rating: Low to High</option>
                        <option value="rating-desc">Rating: High to Low</option>
                    </select>
                </div>
            </div>

            <section id="products" className="products">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </section>
        </div>
    );
}

export default SalesPage;