const shopDomainstar = window.location.origin;

// console.log("shopDomainstar" , shopDomainstar)

const products = document.querySelectorAll(".product-card");

const addSettings = (className, value, styleName) => {
  const ele = document.querySelectorAll(`.${className}`);
  if (className == "progressbar") {
    console.log("ele", ele);
  }
  ele.forEach((v) => {
    v.style[styleName] = value;
  });
};

const addtext = (className, value) => {
  const ele = document.querySelectorAll(`.${className}`);
  ele;
  if (className == "progressbar") {
  }
  ele.forEach((v) => {
    v.innerText = value;
  });
};

const generateStarHTML = (rating, settings) => {
  const starColor = settings[0];
  const textColor = settings[1];
  const buttonColor = settings[2];
  const buttonTextColor = settings[3];
  const roundedRating = Math.round(rating);
  let stars = "";
  const fullStar = `<span style="color:${starColor};">★</span>`;
  const emptyStar = '<span style="color:#ccc;">★</span>';

  addSettings("star", starColor, "color");
  addSettings("jm-write", buttonColor, "background");
  addSettings("jm-write", buttonTextColor, "color");
  addSettings("tagName", textColor, "color");
  addSettings("progressbar", starColor, "background");
  addSettings("loader", starColor, "background");

  for (let i = 1; i <= 5; i++) {
    stars += i <= roundedRating ? fullStar : emptyStar;
  }
  return stars;
};

const settingData = async () => {
  try {
    const res = await fetch(
      `${shopDomainstar}/apps/review/api/routes/extensions/setting/getByTitle`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Review Widget Setting",
        }),
      },
    );

    const resData = await res.json();
    return resData;
  } catch (error) {
    console.error("Color setting fetch error:", error);
    return null;
  }
};

const getProductReviews = async () => {
  try {
    const res = await fetch(
      `${shopDomainstar}/apps/review/api/routes/extensions/reviewproduct/reviews?idType=product&limit=0`,
    );
    const resData = await res.json();
    console.log("-------------------------------------- resData", resData);
    return resData.data.items || [];
  } catch (error) {
    console.error("Product reviews fetch error:", error);
    return [];
  }
};

document.addEventListener("DOMContentLoaded", async function () {
  const template = document.getElementById("star-rating-template");
  if (template) {
    const ratingHTML = template.innerHTML;

    products.forEach((product) => {
      const id = product.getAttribute("data-product-id");

      const targetElement = product.querySelector(".card-gallery");

      if (targetElement) {
        const ratingContainer = document.createElement("div");
        ratingContainer.className = "extension-star-rating-wrapper";
        ratingContainer.innerHTML = ratingHTML;

        targetElement.after(ratingContainer);
      } else {
        console.warn(
          `Target element .card-gallery not found in product card (ID: ${id}).`,
        );
      }
    });
  }
});

window.onload = async () => {
  const settingResponse = await settingData();
  const reviews = await getProductReviews();

  console.log(reviews, "reviews for the rating to all product");

  const colorArray = settingResponse?.data?.sectionSettings?.color;
  const textArray = settingResponse?.data?.sectionSettings?.text;
  // console.log(textArray, "000000000000000000000 text setting");

  const heading = textArray[0].isvalue || "Costomer review";
  console.log(heading, "heading  0000000011111111111");
  const buttonText = textArray[2].isvalue || "Write a review";

  addtext("jm-heading", heading);
  addtext("buttonText", buttonText);

  const starColorSetting = colorArray?.map((v) => v.isvalue);

  console.log("------------------------- colors23", starColorSetting);

  const colors = starColorSetting?.isvalue || "#01f0d0ff";
  // const text =

  const showTextSetting = textArray?.find(
    (v) => v.settingName === "Show text and stars",
  );

  const showReviewText = showTextSetting?.isChecked;

  products.forEach((productCard) => {
    const productId = productCard.getAttribute("data-product-id");
    console.log(productId, "vvvvvvvvvvvvvvvvvvvvvvv");
    const productReviews = reviews.filter(
      (r) => r.targetId && r.targetId.toString() === productId,
    );

    console.log("my reviews", productReviews);

    const ratingContainer = productCard.querySelector(
      ".extension-star-rating-wrapper",
    );

    if (ratingContainer) {
      const starSpan = ratingContainer.querySelector(
        ".staraSpan[data-star-rating]",
      );
      const reviewCountSpan = ratingContainer.querySelector(
        ".review-text-style[data-review-count]",
      );

      const totalReviews = productReviews.length;
      let averageRating = 0;

      if (totalReviews > 0) {
        const totalRatingSum = productReviews.reduce(
          (sum, r) => sum + (r.rating || 0),
          0,
        );
        averageRating = totalRatingSum / totalReviews;
      }

      if (starSpan) {
        starSpan.innerHTML = generateStarHTML(averageRating, starColorSetting);
      }

      if (reviewCountSpan) {
        reviewCountSpan.textContent = `${totalReviews} review${totalReviews !== 1 ? "s" : ""}`;
        reviewCountSpan.style.display = showReviewText ? "inline" : "none";
      }
    }
  });
// render stars on Diffrent themes 
  const productCards = document.querySelectorAll(".card-wrapper");

  if (!productCards.length) {
    console.log("Zero product cards in the DOM, fam");
  }

  productCards.forEach(async (card) => {
    const productLink = card.querySelector("a[href*='/products/']");
    const CardInformation = card.querySelector(".card-information");
    console.log(CardInformation, "CardInformation Information ");
    if (!productLink) {
      console.log("No product link found in this card 🚫");
      return;
    }
    const url = new URL(productLink.href, window.location.origin);
    const handle = url.pathname.split("/products/")[1]?.replace("/", "");

    if (!handle) {
      console.log("Could not extract handle, low-key tragic 😭");
      return;
    }

    try {
      const response = await fetch(`/products/${handle}.js`);
      const product = await response.json();
      console.log("Product fetched:", product.id);
      const getProductReviewFromServer = reviews.find(
        (v) => v.targetId == product.id,
      );

      if (CardInformation) {
        CardInformation.innerHTML += generateStarHTML(
          getProductReviewFromServer.rating,
          starColorSetting,
        );
        const productTitle = card.querySelector(".product__title");

        productTitle.innerHTML += generateStarHTML(
          getProductReviewFromServer,
          starColorSetting,
        );
      }
    } catch (error) {
      console.error("API threw a tantrum:", error);
    }
  });
};
