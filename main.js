// const api = "https://fakestoreapi.com/products";
// const display = document.querySelector('.card-cointaner')
// const SerchInput = document.querySelector('#input');
// const slides = document.querySelectorAll(".slide");
// const displayCart =document.querySelector('.carts');

// // slideshow
// var counter = 0;
// slides.forEach(
//     (slide,index) => {
//         slide.style.left = `${index * 100}%`
//     }
// )

// const goPrev = () => {
//  if(counter == 0){
//     counter = slides.length-1;
//  }else{
//     counter--;
//     slideImage();
//  }
// }
// const goNext = () => {
//     if(counter == slides.length-1){
//         counter =0;
//         slideImage();
//      }else{
//         counter++;
//         slideImage();
//      }
// }

// const slideImage = () =>{
//     slides.forEach(
//         (slide) => {
//             slide.style.transform = `translateX(-${counter * 100}%)`
//         }
//     )
// }
// // slideshow

// // let products = [];
// const getData = async () => {
//     const res = await fetch(api);
//     if (!res.ok) {
//         throw new Error(`Http error: ${res.status}`);
//     }
//     const data = await res.json();
//     return(data);
    
// }

// const displayProducts = async () => {
//     let search = SerchInput.value;
//     console.log(search);

//     const pageLoad = await getData();
//     console.log(pageLoad)
//     const productDisplay =pageLoad.filter((eventData) => {
//         if (search === ""){return eventData}
//         else if (eventData.title.toLowerCase().includes(search.toLowerCase())){
//             return eventData
//         }
//     }).map( (obj) => {
//        const { id, image, title, price, description} = obj;

//        return` <div class="card">
//             <img class="productImg" src="${image}" alt="">
//             <p class="productName">${title.slice(0,20)}</p>
//             <p class="productDescription">${description.slice(0,36)}..</p>
//             <p class="productPrice">$${price}</p>
//            <button type="submit" class="addToCart" onclick="addToCart(${id})">Add To Cart</button>
//         </div>`
//     }).join("")

//     display.innerHTML = productDisplay;

// }
// displayProducts();
// SerchInput.addEventListener("input", () => {
//     displayProducts();
// });
// // // const displayCartEle = async () => {
// // // const CartData = await getData();
// // //     const displayCartData =  CartData.map( (cart) => {
// // //         const {image, title, price} = cart;

// // //         return` <img id="cartImg" src="${image}" alt="">
// // //             <p class="cartTitle">${title}</p>
// // //             <p class="cartPrice">${price}</p>`
// // //     } ).join("")

// // //     displayCart.innerHTML = displayCartData;

// // // }
// // displayCartEle();