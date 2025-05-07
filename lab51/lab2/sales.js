document.addEventListener("DOMContentLoaded", function() {
    // Отримуємо товари зі знижкою з масиву продуктів
    const products = [
        { id: 2, name: "'Abibas' Sneakers", price: 2199.00, oldPrice: 2799.00, image: "good2.jpg", available: false, rating: "★★★★★", description: "Comfortable sneakers for sports and casual wear." },
        { id: 5, name: "OSPORT Fitness Carpet (Purple)", price: 1199.00, oldPrice: 1659.00, image: "good5.jpg", available: false, rating: "★★★★☆", description: "Comfortable fitness carpet for yoga and exercises." },
        { id: 10, name: "Neo-Sport Dumbbells (2 x 1kg)", price: 256.00, oldPrice: 459.00, image: "good11.jpg", available: true, rating: "★★★★☆", description: "Light dumbbells for fitness and rehabilitation." },
        { id: 12, name: "Sp-Sport Jump Ropes (Green)", price: 239.00, oldPrice: 338.00, image: "good12.jpg", available: false, rating: "★★☆☆☆", description: "Budget jump ropes for beginners." }
    ];
    
    const productsContainer = document.getElementById("products");
    const showAvailableOnlyCheckbox = document.getElementById("show-available-only");
    
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById("cart-count").textContent = totalItems;
    }
    
    function isProductInCart(productId) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        return cart.some(item => item.id === productId);
    }
    
    function displayProducts() {
        productsContainer.innerHTML = '';
        
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.className = "product-card";
            
            // Create button based on availability and cart status
            let buttonHTML = "";
            if (product.available) {
                if (isProductInCart(product.id)) {
                    buttonHTML = `<button class="add-to-cart in-cart" data-id="${product.id}">✓ Added to Cart</button>`;
                } else {
                    buttonHTML = `<button class="add-to-cart" data-id="${product.id}">🛒 Add to Cart</button>`;
                }
            } else {
                buttonHTML = `<button class="add-to-cart disabled" disabled>❌ Out of Stock</button>`;
            }
            
            productCard.innerHTML = `
                <a href="product.html?id=${product.id}" class="product-link">
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p><strong><span class="old-price">${product.oldPrice.toFixed(2)} UAH</span></strong></p>
                    <p><span class="new-price">${product.price.toFixed(2)} UAH</span></p>
                    <p>[${product.available ? 'Available' : 'Unavailable'}]</p>
                    <p>Rating: ${product.rating}</p>
                </a>
            `;
            
            productsContainer.appendChild(productCard);
        });
        
        // Add event listeners to the newly created buttons
        document.querySelectorAll(".add-to-cart").forEach(button => {
            if (!button.disabled) {
                button.addEventListener("click", function(e) {
                    e.preventDefault(); // Prevent navigation to product page
                    
                    const productId = parseInt(this.getAttribute("data-id"));
                    const product = products.find(p => p.id === productId);
                    
                    if (product && product.available) {
                        let cart = JSON.parse(localStorage.getItem("cart")) || [];
                        const existingItemIndex = cart.findIndex(item => item.id === productId);
                        
                        if (existingItemIndex !== -1) {
                            cart[existingItemIndex].quantity += 1;
                        } else {
                            cart.push({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.image,
                                quantity: 1
                            });
                        }
                        
                        localStorage.setItem("cart", JSON.stringify(cart));
                        updateCartCount();
                        
                        // Update button to show added status
                        this.textContent = "✓ Added to Cart";
                        this.classList.add("in-cart");
                    }
                });
            }
        });
    }
    
    // Filter checkbox functionality
    if (showAvailableOnlyCheckbox) {
        showAvailableOnlyCheckbox.addEventListener("change", function() {
            displayProducts(this.checked);
        });
    }

    // Initial display
    displayProducts();
    
    // Update cart count on page load
    updateCartCount();
});