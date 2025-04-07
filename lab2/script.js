// Отримуємо ID товару з URL
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"), 10);

// Масив товарів
const products = [
    { id: 1, name: "'Kinin' Backpack", price: "1279.00 UAH", image: "good1.jpg", available: true, rating: "★★★★☆", description: "Durable and spacious backpack for daily use." },
    { id: 2, name: "'Abibas' Sneakers", price: "2199.00 UAH", oldPrice: "2799.00 UAH", image: "good2.jpg", available: false, rating: "★★★★★", description: "Comfortable sneakers for sports and casual wear." },
    { id: 3, name: "'Mechanix' Gloves(Black)", price: "1219.00 UAH", image: "good3.jpg", available: true, rating: "★★★★☆", description: "High-quality gloves for extreme conditions." },
    // Додай інші товари
];

// Отримуємо товар за ID
const product = products.find(p => p.id === productId);

if (product) {
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").innerHTML = product.oldPrice ? 
        `<span class="old-price">${product.oldPrice}</span> <span class="new-price">${product.price}</span>` : 
        product.price;
    document.getElementById("product-status").textContent = product.available ? "✔ Available" : "❌ Out of stock";
    document.getElementById("product-rating").textContent = `Rating: ${product.rating}`;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-image").src = product.image;
} else {
    document.getElementById("product-container").innerHTML = "<h2>Product not found</h2>";
}

// Додавання в кошик
document.getElementById("add-to-cart").addEventListener("click", function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart!`);
});

// Оновлення кількості товарів у кошику
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
}

// Оновлення кошика при завантаженні сторінки
updateCartCount();
