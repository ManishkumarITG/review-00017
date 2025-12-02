const settingData = async () => {
  try {
    const shopDomain = window.location.origin;
    console.log(shopDomain);
    const res = await fetch(
      `${shopDomain}/apps/review/api/routes/extensions/setting/getByTitle`,
      {
        method: "POST",
        body: JSON.stringify({
          title: "Review Widget Setting",
        }),
      },
    );

    const resData = await res.json();
    const data = resData;
    console.log(data);
    return data;
  } catch (error) {
    console.log("color setting fetch error", error);
  }
};

window.onload = async () => {
  const starSpan = document.querySelectorAll(".staraSpan");
  const isReview = document.querySelectorAll(".review-text-style");
  console.log("isReview", isReview);
  const data = await settingData();
  const colorArray = data?.data?.sectionSettings?.color;
  const textArray = data?.data?.sectionSettings?.text;

  colorArray?.forEach((v) => {
    if (v.settingName === "Star Color") {
      starSpan.forEach((span) => {
        span.style.color = v.isvalue;
      });
    }
  });

  textArray?.forEach((v) => {
    if (v.settingName === "Show text and stars") {
      isReview.forEach((span) => {
        console.log("checked", v.isChecked ? "block" : "none");
        span.style.display = v.isChecked ? "block" : "none";
      });
    }
  });
};

document.addEventListener("DOMContentLoaded", async function () {
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
