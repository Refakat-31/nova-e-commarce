const hamburger = document.querySelector('.hamburger');
hamburger.onclick = () => {
    console.log('click')
    navBar = document.querySelector('.navitems');
    
    navBar.classList.toggle('active');
    
}
const api = "https://fakestoreapi.com/products";
const display = document.querySelector(".card-cointaner");
const searchInput = document.querySelector("#input");
const slides = document.querySelectorAll(".slide");
const displayCart = document.querySelector(".carts");

// Slideshow Functionality
let counter = 0;
slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
});

const goPrev = () => {
    counter = (counter === 0) ? slides.length - 1 : counter - 1;
    slideImage();
};

const goNext = () => {
    counter = (counter === slides.length - 1) ? 0 : counter + 1;
    slideImage();
};

const slideImage = () => {
    slides.forEach(slide => {
        slide.style.transform = `translateX(-${counter * 100}%)`;
    });
};

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
    const products = await getData();

    const productDisplay = products
        .filter(product => search === "" || product.title.toLowerCase().includes(search))
        .map(product => {
            const { id, image, title, price,  description} = product;
            return `
                <div class="card">
                    <img class="productImg" src="${image}" alt="">
                    <p class="productName">${title.slice(0, 20)}</p>
                    <p class="productDescription">${description.slice(0, 36)}...</p>
                    <p class="productPrice">$${price}</p>
                    <a href="products.html?id=${id}" class="viewDetails addToCart">Add to cart</a>
                </div>`;
        })
        .join("");

    display.innerHTML = productDisplay || `<p>No products found.</p>`;
};

// const displayProducts = async () => {
//     const search = searchInput.value.trim().toLowerCase();
//     const pageLoad = await getData();

//     const productDisplay = pageLoad
//         .filter(eventData => {
//             return search === "" || eventData.title.toLowerCase().includes(search);
//         })
//         .map(obj => {
//             const { id, image, title, price, description } = obj;
//             return `
//                 <div class="card">
//                     <img class="productImg" src="${image}" alt="">
//                     <p class="productName">${title.slice(0, 20)}</p>
//                     <p class="productDescription">${description.slice(0, 36)}...</p>
//                     <p class="productPrice">$${price}</p>
//                     <button type="submit" class="addToCart" onclick="addToCart(${id})">Add To Cart</button>
//                 </div>`;
//         })
//         .join("");

//     display.innerHTML = productDisplay || `<p>No products found.</p>`;
// };

// Cart Management
const cart = [];
const addToCart = (id) => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find(p => p.id === id);

    if (product) {
        const cartItem = cart.find(item => item.id === id);
        if (cartItem) {
            cartItem.quantity += 1; // Increment quantity
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        renderCart();
    }
};

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
            renderCart();
        }
    }
};

const removeFromCart = (id) => {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
        cart.splice(index, 1);
        renderCart();
    }
};

// Initialize
const init = async () => {
    localStorage.setItem("products", JSON.stringify(await getData()));
    displayProducts();
};

// Event Listeners
searchInput.addEventListener("input", displayProducts);
init();
