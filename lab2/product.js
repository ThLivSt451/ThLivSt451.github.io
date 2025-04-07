// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"), 10);

// Products array
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

// Get product by ID
const product = products.find(p => p.id === productId);

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalItems;
}

function isProductInCart(productId) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.some(item => item.id === productId);
}

function updateAddToCartButton() {
    const addToCartBtn = document.getElementById("add-to-cart");
    
    if (product && product.available) {
        if (isProductInCart(product.id)) {
            addToCartBtn.textContent = "✓ Added to Cart";
            addToCartBtn.classList.add("in-cart");
        } else {
            addToCartBtn.textContent = "🛒 Add to Cart";
            addToCartBtn.classList.remove("in-cart");
        }
        addToCartBtn.disabled = false;
    } else {
        addToCartBtn.textContent = "❌ Out of Stock";
        addToCartBtn.disabled = true;
        addToCartBtn.classList.add("disabled");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if (product) {
        document.getElementById("product-name").textContent = product.name;
        
        // Format price display
        if (product.oldPrice) {
            document.getElementById("product-price").innerHTML = 
                `<span class="old-price">${product.oldPrice.toFixed(2)} UAH</span> <span class="new-price">${product.price.toFixed(2)} UAH</span>`;
        } else {
            document.getElementById("product-price").innerHTML = `<strong>${product.price.toFixed(2)} UAH</strong>`;
        }
        
        document.getElementById("product-status").textContent = product.available ? "✔ Available" : "❌ Out of stock";
        document.getElementById("product-rating").textContent = `Rating: ${product.rating}`;
        document.getElementById("product-description").textContent = product.description;
        document.getElementById("product-image").src = product.image;
        
        // Update button state
        updateAddToCartButton();
        
        // Add to cart functionality
        document.getElementById("add-to-cart").addEventListener("click", function() {
            if (!product.available) return;
            
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingItemIndex = cart.findIndex(item => item.id === product.id);
            
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
            updateAddToCartButton();
        });
    } else {
        document.querySelector(".product-page").innerHTML = "<h2>Product not found</h2>";
    }
    
    // Update cart count on page load
    updateCartCount();
});