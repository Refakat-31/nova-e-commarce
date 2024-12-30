const hamburger = document.querySelector('.hamburger');
hamburger.onclick = () => {
    console.log('click')
    navBar = document.querySelector('.navitems');
    
    navBar.classList.toggle('active');
    
}
const api = "https://fakestoreapi.com/products";
const display = document.querySelector(".card-container");
const searchInput = document.querySelector("#input");

// Fetch Data from API
const getData = async () => {
    try {
        const res = await fetch(api);
        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        display.innerHTML = `<p class="error">Failed to load data. Please try again later.</p>`;
        return [];
    }
};

// Display Products
const displayProducts = async () => {
    const search = searchInput.value.trim().toLowerCase();
    const products = JSON.parse(localStorage.getItem("products")) || await getData();
    const filteredProducts = products.filter(product =>
        search === "" || product.title.toLowerCase().includes(search)
    );

    const productDisplay = filteredProducts
        .map(({ id, image, title, price, description }) => `
            <div class="card">
                <img class="productImg" src="${image}" alt="">
                <p class="productName">${title.slice(0, 20)}</p>
                <p class="productDescription">${description.slice(0, 36)}...</p>
                <p class="productPrice">$${price}</p>
                <button type="submit" class="addToCart" onclick="addToCart(${id})">Add To Cart</button>
            </div>`)
        .join("");

        display.innerHTML = productDisplay || `<p>No products found.</p>`;
};

// Cart Management
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const addToCart = (id) => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find(p => p.id === id);

    if (product) {
        const cartItem = cart.find(item => item.id === id);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        saveCart();
        alert("Product added to cart!");
    }
};

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

console.log(JSON.parse(localStorage.getItem("products")));

// Initialize
const init = async () => {
    const products = await getData();
    if (products.length) {
        localStorage.setItem("products", JSON.stringify(products));
        displayProducts();
    } else {
        console.error("No products found!");
        document.querySelector('.card-container').innerHTML = `<p>No products available.</p>`;
    }
};

searchInput.addEventListener("input", displayProducts);
init();
