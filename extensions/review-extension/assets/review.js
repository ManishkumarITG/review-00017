// import renderReviews from "./reviewFilter";
document.addEventListener("DOMContentLoaded", async () => {
  const dbReviews = [
    { author: "Amit", rating: 5, body: "Nice!", date: "2025-01-01" },
    { author: "Simran", rating: 4, body: "Loved it.", date: "2025-01-02" },
  ];

  // all importent variable is here
  const lists = document.querySelectorAll(".jm-list");
  const productIdliquid = window.__productId;
  const submitButton = document.getElementById("submitButton");
  const form = document.getElementById("reviewForm");
  const regexExpression = /^(?!\s*$).+/;
  const emailRegexExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const closeForm = document.getElementById("closeForm");
  const stars = document.querySelectorAll("#formStars .form-star");
  const ratingInput = document.getElementById("selectedRating");

  const getColorSetting = async () => {
    try {
      const baseUrl = window.location.origin;

      const res = await fetch(
        `${baseUrl}/apps/review/api/routes/extensions/setting/getByTitle`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "Review Widget Setting" }),
        },
      );

      const resData = await res.json();
      return resData?.data?.sectionSettings || null;
    } catch (error) {
      console.log("color setting fetch error", error);
      return null;
    }
  };


  const reviewSetting = await getColorSetting();

  const findColor = (type, fallback) =>
    reviewSetting?.color?.find((c) => c.type === type)?.isvalue || fallback;
  const findText = (name, fallback) =>
    reviewSetting?.text?.find((t) => t.settingName === name)?.isvalue ||
    fallback;

  const starActiveColor = findColor("star", "#108474");
  const starEmptyColor = findColor("emptyStar", "#ccc");

  const findLayout = (type, fallback) =>
    reviewSetting?.layout?.find((l) => l.type === type)?.isvalue || fallback;
  const starStyleKey = findLayout("starStyle", "rounded");

  // Same star design as the app/preview (see starDesigns.js).
  const starsInline = (rating) => {
    if (!window.jmStarSVG) {
      return "★".repeat(rating) + "☆".repeat(5 - rating);
    }
    let out = "";
    for (let i = 1; i <= 5; i++) {
      out += window.jmStarSVG(starStyleKey, {
        filled: i <= rating,
        size: "1em",
        color: i <= rating ? starActiveColor : starEmptyColor,
      });
    }
    return out;
  };

  // Form texts come from the app settings (Screen title / Introduction).
  document.querySelectorAll(".jm-form-title").forEach((el) => {
    el.textContent = findText(
      "Screen title",
      "How would you rate this product?",
    );
  });
  document.querySelectorAll(".jm-form-intro").forEach((el) => {
    el.textContent = findText(
      "Introduction",
      "We would love it if you would share a bit about your experience.",
    );
  });
  lists.forEach((list) => {
    const source = list.dataset.source;

    if (source !== "db") return;

    // Clear placeholder
    list.innerHTML = "";

    dbReviews.forEach((r) => {
      list.innerHTML += `
        <article class="jm-item">
          <div class="jm-item-left">
            <div class="jm-avatar">${r.author.slice(0, 1)}</div>
          </div>

          <div class="jm-item-right">
            <div class="jm-topline">
              <div class="jm-stars-inline">
                ${starsInline(r.rating)}
                <p>${r.author}</p>
              </div>
              <div class="jm-date">${r.date}</div>
            </div>

            <div class="jm-body">
              <p>${r.body}</p>
            </div>
          </div>
        </article>
      `;
    });
  });

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const selectedValue = star.getAttribute("data-value");
      ratingInput.value = selectedValue;

      stars.forEach((s) => {
        s.style.color =
          s.getAttribute("data-value") <= selectedValue
            ? starActiveColor
            : starEmptyColor;
      });
    });
  });

  // reset stars on clear form
  function resetStars() {
    ratingInput.value = ""; // remove selected rating
    stars.forEach((s) => {
      s.style.color = starEmptyColor;
    });
  }

  // event listner for form submition
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validation block same as before ---------------------
    let isValid = true;
    const formData = new FormData(form);
    const payload = {};

    form
      .querySelectorAll(".input-error")
      .forEach((el) => el.classList.remove("input-error"));
    form.querySelectorAll(".error-msg").forEach((el) => (el.textContent = ""));

    formData.forEach((value, key) => {
      let inputEl = form.querySelector(`[name="${key}"]`);

      if (!regexExpression.test(value)) {
        ShowError(inputEl, `${key} field is required`);
        isValid = false;
        return;
      }

      if (key.toLowerCase() === "email" && !emailRegexExpression.test(value)) {
        ShowError(inputEl, `Email is not valid`);
        isValid = false;
        return;
      }

      if (key.toLowerCase() === "rating" && (value === "0" || value === "")) {
        ShowError(inputEl, `${key} is required`);
        isValid = false;
        return;
      }

      payload[key] = value;
    });

    if (!isValid) return;
    const baseUrl = window.location.origin;
    const shopDamian = window.location.host;
    const id = productIdliquid || shopDamian;
    const idType = productIdliquid ? "product" : "store";
    const customerId = ShopifyAnalytics.meta.page.customerId;
    // console.log(ShopifyAnalytics.meta.page, "????????????????????????????????");

    const mode = form.dataset.mode;
    const reviewId = form.dataset.reviewId;

    console.log(mode, "mode of form ");
    console.log(reviewId, "mode of reviewId ");

    const submitButton = document.getElementById("submitButton");
    submitButton.innerText = "Processing...";

    let apiUrl = "";
    let bodyData = {};

    if (mode === "create") {
      apiUrl = `${baseUrl}/apps/review/api/routes/extensions/reviewproduct/createproduct`;

      bodyData = {
        name: payload.Name,
        shop: shopDamian,
        targetId: id,
        idType: idType,
        email: payload.Email,
        rating: payload.Rating,
        description: payload.Discription,
        images: "null",
        customerId: customerId,
      };
      console.log(bodyData);
    }

    if (mode === "edit") {
      console.log(reviewId, "id=======");

      apiUrl = `${baseUrl}/apps/review/api/routes/extensions/reviewproduct/updatereview`;

      bodyData = {
        name: payload.Name,
        idType: idType,
        email: payload.Email,
        rating: payload.Rating,
        description: payload.Discription,
        id: window.__editingReviewId,
      };

      console.log(bodyData);
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok) {
        submitButton.innerText = "Operation failed";
        submitButton.style.color = "red";
        return;
      }

      submitButton.innerText =
        mode === "create" ? "Review Added 🎉" : "Review Updated 🎉";
      // window.location.reload();

      form.reset();
      resetStars();

      setTimeout(() => {
        closeReviewForm();
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.error("Form submit error:", err);
      submitButton.innerText = "Operation failed";
      submitButton.style.color = "red";
    } finally {
      // renderReviews([]);
    }
  });

  // show error in invalid fild
  function ShowError(inputElement, message) {
    const wrapper = inputElement.parentElement;

    let errorEl = wrapper.querySelector(".error-msg");
    if (errorEl) {
      errorEl.textContent = message;
      return;
    }

    inputElement.classList.add("input-error");
    const errorElement = document.createElement("span");
    errorElement.classList.add("error-msg");
    errorElement.textContent = message;
    inputElement.after(errorElement);
  }

  // function to close form
  function closeReviewForm() {
    const formDIV = document.getElementById("FormParentDiv");
    form.reset();
    resetStars();
    form
      .querySelectorAll(".input-error")
      .forEach((el) => el.classList.remove("input-error"));
    form.querySelectorAll(".error-msg").forEach((el) => (el.textContent = ""));
    formDIV.style.display = "none";
  }

  closeForm.addEventListener("click", closeReviewForm);
});
