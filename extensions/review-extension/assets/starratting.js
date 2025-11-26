document.addEventListener("DOMContentLoaded", function () {
  const template = document.getElementById("star-rating-template");

  if (template) {
    const ratingHTML = template.innerHTML;

    const productCards = document.querySelectorAll(".product-card__content");

    productCards.forEach((cardContent) => {
      const targetElement = cardContent.querySelector(".card-gallery");

      if (targetElement) {
        const ratingContainer = document.createElement("div");
        ratingContainer.className = "extension-star-rating-wrapper";
        ratingContainer.innerHTML = ratingHTML;

        targetElement.after(ratingContainer);
      } else {
        console.warn(
          "Target element .card-gallery not found in this product card content.",
        );
      }
    });
  }
});
