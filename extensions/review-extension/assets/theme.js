// // document.querySelectorAll('.card__content').forEach((scriptTag) => {
// //   const product = JSON.parse(scriptTag.textContent);

// //   console.log("CARD PRODUCT:", product);

// //   // Example: Add rating or any custom data
// //   const card = scriptTag.closest('.card-wrapper');

// //   if (card) {
// //     // Example: title
// //     const titleEl = card.querySelector('.card-information__text');
// //     if (titleEl) {
// //       titleEl.insertAdjacentHTML(
// //         "beforeend",
// //         `<div style="color: red; font-size: 14px;">${product.vendor}</div>`
// //       );
// //     }

// //     // Example: show first variant price
// //     if (product?.variants?.length > 0) {
// //       const priceEl = card.querySelector('.price');
// //       if (priceEl) {
// //         priceEl.insertAdjacentHTML(
// //           "beforeend",
// //           `<div>${product.variants[0].price / 100} ₹</div>`
// //         );
// //       }
// //     }
// //   }
// // });


// window.onload = () => {
//     const productData = document.querySelectorAll(".card__information");

//     console.log(productData);
//     console.log("the dawn theme");
//     Array.from(productData).forEach((cards) => {
//         console.log("product data in my collection")
//          const info = cards.querySelector(".card__heading");;
//          const id = info.getAttribute("id")
//          console.log("product ids " ,id)
//         //  const productId = id.split("-").pop();
//         // console.log("my a tag" ,  productId)
//         const span = document.createElement("span");
//         span.setAttribute("class" , "my-span-class");
//         span.innerHTML = "⭐⭐⭐⭐⭐"
//         console.log("cards", cards)
//         cards.appendChild(span)
//     })
// }