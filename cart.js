const displayCart = document.querySelector(".carts");
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const renderCart = () => {
    if (cart.length === 0) {
        displayCart.innerHTML = `<p>Your cart is empty.</p>`;
        return;
    }

    displayCart.innerHTML = cart
        .map(({ id, image, title, price, quantity }) => `
            <div class="cart-item">
                <img src="${image}" alt="${title}" class="cart-img">
                <div class="cart-info">
                    <p class="cart-title">${title}</p>
                    <p class="cart-price">$${price}</p>
                    <div class="cart-quantity">
                        <button onclick="updateQuantity(${id}, -1)">-</button>
                        <span>${quantity}</span>
                        <button onclick="updateQuantity(${id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${id})">Remove</button>
            </div>`)
        .join("");
};

const updateQuantity = (id, change) => {
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
            renderCart();
        }
    }
};

const removeFromCart = (id) => {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
    }
};

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

renderCart();
