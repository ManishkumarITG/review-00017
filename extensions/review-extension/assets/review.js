document.addEventListener("DOMContentLoaded", () => {
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

  // render all dummy reviews
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

  // star rating according to rating number
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

  // reset stars on clear form
  function resetStars() {
    ratingInput.value = ""; // remove selected rating

    stars.forEach((s) => {
      s.style.color = "#ccc"; // reset to default color
    });
  }

  // event listner for form submition
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let isValid = true;
    const formData = new FormData(form);
    const payload = {};

    form
      .querySelectorAll(".input-error")
      .forEach((el) => el.classList.remove("input-error"));
    // clear all errors
    form.querySelectorAll(".error-msg").forEach((el) => (el.textContent = ""));

    // get all input filds of form
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
    // check all filds is validate or not empty
    if (!isValid) {
      console.log("Form is not submitted, validation failed ");
      return;
    }

    form.querySelectorAll(".error-msg").forEach((el) => (el.textContent = ""));
    const shopDamian = window.location.host; // shopify Domain
    const id = productIdliquid || shopDamian;
    const idTYpe = productIdliquid ? "product" : "store";
    console.log("id , type", id, idTYpe);
    const customerId = ShopifyAnalytics.meta.page.customerId;
    try {
      // data to send to the server
      const datatoSend = {
        name: payload.Name,
        shop: shopDamian,
        targetId: id,
        idType: idTYpe,
        email: payload.Email,
        rating: payload.Rating,
        description: payload.Discription,
        images: "null",
        customerId: customerId,
      };
      console.log(datatoSend, "😳😳😳");

      const baseUrl = window.location.origin;
      // api calling
      const response = await fetch(
        `${baseUrl}/apps/review/api/routes/extensions/reviewproduct/createproduct`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datatoSend),
        },
      );

      const data = await response.json();
      submitButton.innerText = "Loading...";
      console.log(data);

      // check api return data or not and change button text
      if (data.status !== 201) {
        console.error("API threw hands:", response.status);
        submitButton.innerText = "Review Is Not Add Yet";
        submitButton.style.color = "red";

        return null;
      }
      submitButton.innerText = "review Add Success fully";
      console.log("API Success →", data);
      // window.location.reload(true);
      form.reset();
      resetStars();
      // close form after submit
      setTimeout(() => {
        closeReviewForm();
      }, 2000);
      return data;
    } catch (error) {
      submitButton.innerText = "Review Is Not Add Yet";
      submitButton.style.color = "red";
      console.error("Submit Error →", error);
      return null;
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
    form
      .querySelectorAll(".input-error")
      .forEach((el) => el.classList.remove("input-error"));
    form.querySelectorAll(".error-msg").forEach((el) => (el.textContent = ""));
    formDIV.style.display = "none";
  }

  closeForm.addEventListener("click", closeReviewForm);
});
