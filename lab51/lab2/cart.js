document.addEventListener("DOMContentLoaded", function () {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTableBody = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTable = document.getElementById("cart-table");
    const cartCountElement = document.getElementById("cart-count");
    
    function updateCart() {
        cartTableBody.innerHTML = "";
        let total = 0;

        // Update total items count in header
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;

        if (cartItems.length === 0) {
            emptyCartMessage.style.display = "block";
            cartTable.style.display = "none";
            document.getElementById("cart-summary").style.display = "none";
        } else {
            emptyCartMessage.style.display = "none";
            cartTable.style.display = "table";
            document.getElementById("cart-summary").style.display = "block";
        }

        cartItems.forEach((item, index) => {
            const row = document.createElement("tr");
            const itemTotal = item.price * item.quantity;

            row.innerHTML = `
                <td class="product-info">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <span>${item.name}</span>
                </td>
                <td>${item.price.toFixed(2)} UAH</td>
                <td>
                    <div class="quantity-control">
                        <button class="quantity-btn decrease" data-index="${index}">-</button>
                        <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input">
                        <button class="quantity-btn increase" data-index="${index}">+</button>
                    </div>
                </td>
                <td class="item-total">${itemTotal.toFixed(2)} UAH</td>
                <td><button class="remove-item" data-index="${index}">❌</button></td>
            `;

            cartTableBody.appendChild(row);
            total += itemTotal;
        });

        totalPriceElement.textContent = `${total.toFixed(2)} UAH`;

        // Event listeners for quantity changes and item removal
        addEventListeners();
    }

    function addEventListeners() {
        // Remove item buttons
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = parseInt(this.getAttribute("data-index"));
                if (index >= 0 && index < cartItems.length) {  // Перевірка валідності індексу
                    cartItems.splice(index, 1);
                    localStorage.setItem("cart", JSON.stringify(cartItems));
                    updateCart();
                }
            });
        });

        // Quantity input fields
        document.querySelectorAll(".quantity-input").forEach(input => {
            input.addEventListener("change", function () {
                const index = parseInt(this.getAttribute("data-index"));
                if (index >= 0 && index < cartItems.length) {  // Перевірка валідності індексу
                    const newQuantity = parseInt(this.value);
                    
                    if (newQuantity > 0) {
                        cartItems[index].quantity = newQuantity;
                        localStorage.setItem("cart", JSON.stringify(cartItems));
                        updateCart();
                    } else {
                        this.value = 1; // Reset to 1 if invalid value
                    }
                }
            });
        });

        // Decrease quantity buttons
        document.querySelectorAll(".decrease").forEach(button => {
            button.addEventListener("click", function() {
                const index = parseInt(this.getAttribute("data-index"));
                if (index >= 0 && index < cartItems.length) {  // Перевірка валідності індексу
                    if (cartItems[index].quantity > 1) {
                        cartItems[index].quantity -= 1;
                        localStorage.setItem("cart", JSON.stringify(cartItems));
                        updateCart();
                    }
                }
            });
        });

        // Increase quantity buttons
        document.querySelectorAll(".increase").forEach(button => {
            button.addEventListener("click", function() {
                const index = parseInt(this.getAttribute("data-index"));
                if (index >= 0 && index < cartItems.length) {  // Перевірка валідності індексу
                    cartItems[index].quantity += 1;
                    localStorage.setItem("cart", JSON.stringify(cartItems));
                    updateCart();
                }
            });
        });
    }

    // Initialize the checkout button
    const checkoutButton = document.getElementById("checkout-button");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", function() {
            if (cartItems.length > 0) {
                alert("Thank you for your order! Your total is " + totalPriceElement.textContent);
                // Clear the cart after successful checkout
                localStorage.removeItem("cart");
                cartItems.length = 0;  // Очищаємо масив також в пам'яті
                updateCart();
            }
        });
    }

    // Initial cart update
    updateCart();
});