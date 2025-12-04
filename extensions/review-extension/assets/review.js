document.addEventListener("DOMContentLoaded", () => {
  const dbReviews = [
    { author: "Amit", rating: 5, body: "Nice!", date: "2025-01-01" },
    { author: "Simran", rating: 4, body: "Loved it.", date: "2025-01-02" },
  ];

  const lists = document.querySelectorAll(".jm-list");

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
                ${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}
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

  const stars = document.querySelectorAll("#formStars .form-star");
  const ratingInput = document.getElementById("selectedRating");
  // const noReviewRating = document.getElementById("NoReviewSelectedRating");

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const selectedValue = star.getAttribute("data-value");
      ratingInput.value = selectedValue;
      // noReviewRating.value = selectedValue;
      stars.forEach((s) => {
        s.style.color =
          s.getAttribute("data-value") <= selectedValue ? "#108474" : "#ccc";
      });
    });
  });

  function resetStars() {
    ratingInput.value = ""; // remove selected rating

    stars.forEach((s) => {
      s.style.color = "#ccc"; // reset to default color
    });
  }

  const productIdliquid = window.__productId;

  console.log("------------------------- productIdliquid", productIdliquid);

  const form = document.getElementById("reviewForm");
  const regexExpression = /^(?!\s*$).+/;
  const emailRegexExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let isValid = true;
    const formData = new FormData(form);
    const payload = {};

    form
      .querySelectorAll(".input-error")
      .forEach((el) => el.classList.remove("input-error"));
    form.querySelectorAll(".error-msg").forEach((el) => (el.textContent = ""));

    formData.forEach((value, key) => {
      let inputEl = form.querySelector(`[name="${key}"]`);

      // Empty Field Check
      if (!regexExpression.test(value)) {
        ShowError(inputEl, `${key} field is required`);
        isValid = false;
        return;
      }

      // Email Check
      if (key.toLowerCase() === "email" && !emailRegexExpression.test(value)) {
        ShowError(inputEl, `Email is not valid`);
        isValid = false;
        return;
      }

      // Rating check
      if (key.toLowerCase() === "rating" && (value === "0" || value === "")) {
        ShowError(inputEl, `${key} is required`);
        isValid = false;
        return;
      }

      // If all good, add to payload
      payload[key] = value;
    });

    console.log("isValid →", isValid);

    if (!isValid) {
      console.log("Form is not submitted, validation failed ");
      return;
    }
    console.log(ratingInput.value, "ratingInput");

    form.querySelectorAll(".error-msg").forEach((el) => (el.textContent = ""));
    const shopDamian = window.location.host;
    const id = productIdliquid || shopDamian;
    const idTYpe = productIdliquid ? "prodcut" : "store";
    console.log("id , type", id, idTYpe);

    try {
      const datatoSend = {
        author: payload.Name,
        shop: shopDamian,
        targetId: id,
        idType: idTYpe,
        email: payload.Email,
        rating: payload.Rating,
        description: payload.Discription,
        images: "null",
      };
      const baseUrl = window.location.origin;

      console.log("hello api", window.location);
      const response = await fetch(
        `${baseUrl}/apps/review/api/routes/extensions/reviewproduct/createproduct`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datatoSend),
        },
      );

      if (!response.ok) {
        console.error("API threw hands:", response.status);
        return null;
      }

      const data = await response.json();
      console.log("API Success →", data);
      form.reset();
      resetStars();
      return data; // return so parent can use it if needed
    } catch (error) {
      console.error("Submit Error →", error);
      return null;
    }
  });

  function ShowError(inputElement, message) {
    // form.querySelectorAll(".error-msg").forEach((el) => (el.textContent = ""));
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
});
