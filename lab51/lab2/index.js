document.addEventListener("DOMContentLoaded", function() {
    // Products array (same as in product.js)
    const products = [
        { id: 1, name: "'Kinin' Backpack", price: 1279.00, image: "good1.jpg", available: true, rating: "★★★★☆", description: "Durable and spacious backpack for daily use." },
        { id: 2, name: "'Abibas' Sneakers", price: 2199.00, oldPrice: 2799.00, image: "good2.jpg", available: false, rating: "★★★★★", description: "Comfortable sneakers for sports and casual wear." },
        { id: 3, name: "'Mechanix' Gloves(Black)", price: 1219.00, image: "good3.jpg", available: true, rating: "★★★★☆", description: "High-quality gloves for extreme conditions." },
        { id: 4, name: "'Kinin' Thermal Underwear", price: 1659.00, image: "good4.jpg", available: true, rating: "★★★☆☆", description: "Warm thermal underwear for cold weather activities." },
        { id: 5, name: "OSPORT Fitness Carpet (Purple)", price: 1199.00, oldPrice: 1659.00, image: "good5.jpg", available: false, rating: "★★★★☆", description: "Comfortable fitness carpet for yoga and exercises." },
        { id: 6, name: "OSPORT Jump Ropes", price: 679.00, image: "good6.jpg", available: true, rating: "★★★★☆", description: "Professional jump ropes for cardio training." },
        { id: 7, name: "Berserk Sport Backpack", price: 1799.00, image: "good7.jpg", available: true, rating: "★★★★☆", description: "Spacious sport backpack for your gear." },
        { id: 8, name: "Scitec Basic Gloves", price: 459.00, image: "good8.jpg", available: true, rating: "★★★★★", description: "Comfortable gloves for weight training." },
        { id: 9, name: "Funky Grey Diawin Sneakers", price: 2799.00, image: "good9.jpg", available: false, rating: "★★★★☆", description: "Stylish sneakers for everyday wear." },
        { id: 10, name: "Neo-Sport Dumbbells (2 x 1kg)", price: 256.00, oldPrice: 459.00, image: "good11.jpg", available: true, rating: "★★★★☆", description: "Light dumbbells for fitness and rehabilitation." },
        { id: 11, name: "Viverra Soft ZIP Black Underwear", price: 1659.00, image: "good10.jpg", available: true, rating: "★★★★☆", description: "Comfortable underwear for sports activities." },
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
    
    function displayProducts(availableOnly = false) {
        let productIndex = 0;
        productsContainer.innerHTML = '';
        
        // Using while loop as requested
        while (productIndex < products.length) {
            const product = products[productIndex];
            
            if (!availableOnly || (availableOnly && product.available)) {
                const productCard = document.createElement("div");
                productCard.className = "product-card";
                
                // Create price HTML
                let priceHTML = "";
                if (product.oldPrice) {
                    priceHTML = `
                        <p><strong><span class="old-price">${product.oldPrice.toFixed(2)} UAH</span></strong></p>
                        <p><span class="new-price">${product.price.toFixed(2)} UAH</span></p>
                    `;
                } else {
                    priceHTML = `<p><strong>${product.price.toFixed(2)} UAH</strong></p>`;
                }
                
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
                        ${priceHTML}
                        <p>[${product.available ? 'Available' : 'Unavailable'}]</p>
                        <p>Rating: ${product.rating}</p>
                    </a>

                `;
                
                productsContainer.appendChild(productCard);
            }
            
            productIndex++;
        }
        
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
    displayProducts(false);
    
    // Update cart count on page load
    updateCartCount();
});