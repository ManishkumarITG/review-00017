document.addEventListener("DOMContentLoaded", async () => {
  let loding = true; // loding
  let limit = 10; // limit of api response
  // get importent Elements
  const domain = window.location.origin.split("//")[1];
  const productIdliquid = ShopifyAnalytics.meta.page.resourceId || domain;

  console.log("shop domain", domain);
  const reviewsList = document.getElementById("reviewsList");
  console.log(
    // "------------------------------------------- reviewsList",
    reviewsList,
  );
  const filterSelect = document.getElementsByClassName("jm-sort-select")[0];
  const writeButtons = document.querySelectorAll(".jm-write"); // get variable for liquid
  const ui = window.reviewSettings;

  // check type of page for type of review store of product
  let type =
    ShopifyAnalytics.meta.page.pageType == "home" ? "store" : "product";
  console.log(ShopifyAnalytics.meta.page.resourceId, " type of review");

  // dummy data for sample option
  const dummydata = [
    {
      _id: "1",
      author: "Arjun",
      rating: 5,
      description: "Bro product legit fire fr fr",
      date: "2025-01-05",
    },
    {
      _id: "2",
      author: "Meera",
      rating: 4,
      description: "Pretty solid ngl, value for money",
      date: "2025-11-26",
    },
    {
      _id: "3",
      author: "Jason",
      rating: 3,
      description: "Decent but packaging could’ve been better.",
      date: "2024-12-22",
    },
    {
      _id: "4",
      author: "Tanya",
      rating: 2,
      description: "Not what I expected tbh.",
      date: "2024-11-15",
    },
    {
      _id: "5",
      author: "Kabir",
      rating: 1,
      description: "Terrible quality, do not buy!",
      date: "2024-10-30",
    },
  ];

  let realdata = [];

  // open for and check the type of more
  function handleClick(mode = "add") {
    console.log("Entered handleClick with mode:", mode);
    const form = document.getElementById("reviewForm");

    const url = window.location.origin;
    console.log("url", url);

    const formDIV = document.getElementById("FormParentDiv");
    form.dataset.mode = "create";

    if (!formDIV) {
      console.warn("popupForm missing in DOM");
      return;
    }

    formDIV.style.display =
      formDIV.style.display === "block" ? "none" : "block";

    const emailInput = document.getElementById("formEmail");

    if (!emailInput) {
      console.warn("formEmail not found");
      return;
    }

    if (mode === "edit") {
      form.dataset.mode = "edit";
      console.log("Edit mode active → disabling email field");
      emailInput.disabled = true;
    } else {
      console.log("Add mode active → enabling email field");
      emailInput.disabled = false;
    }
  }

  // add Event listner ond write a review button
  writeButtons.forEach((btn) => {
    btn.addEventListener("click", () => handleClick("add"));
  });

  // add Event listner on edit  icon

  reviewsList.addEventListener("click", (e) => {
    const editBtn = e.target.closest(".edit-btn");
    console.log(editBtn);

    if (!editBtn) return;

    const reviews = editBtn.dataset.id;

    console.log(reviews, "review");

    handleClick("edit");
    openForm(reviews);
  });

  // function to get data
  async function apidata() {
    console.log("enter in apidata function");
    console.log(
      "---------------------------------------- my type is product ",
      productIdliquid,
    );

    try {
      loding = true;
      renderReviews([]);
      const baseUrl = window.location.origin;

      console.log("product id ", productIdliquid);
      const response = await fetch(
        `${baseUrl}/apps/review/api/routes/extensions/reviewproduct/reviews?idType=${type}&limit=${limit}&targetId=${productIdliquid}`,
        { method: "GET", headers: { "Content-Type": "application/json" } },
      );

      const data = await response.json();
      console.log("--------------------------- res data", data.data);

      return data?.data?.items;
    } catch (error) {
      console.error("API went off the rails:", error);
      return [];
    } finally {
      loding = false;
    }
  }

  // check option of data
  if (ui.reviewSource === "dummy") {
    realdata = dummydata;
  } else if (ui.reviewSource === "real") {
    realdata = await apidata();
  } else {
    realdata = [];
  }

  // highlite stars in form
  function highlightStars(rating) {
    console.log(rating);

    const stars = document.querySelectorAll(".form-star");

    stars.forEach((star) => {
      const value = Number(star.dataset.value);

      if (value <= rating) {
        star.style.color = "#108474"; // fill color
      } else {
        star.style.color = "#ccc"; // empty color
      }
    });
  }

  // pass filterd data
  const parsedData = realdata.map((data) => {
    const { name, rating, description, createdAt, _id, customerId, email } =
      data;

    const date = createdAt.split("T")[0];
    return {
      name: name,
      rating: Number(rating),
      description,
      date: date,
      _id,
      customerId,
      email,
    };
  });

  //call renderReview Function to render all reviews
  renderReviews(parsedData);

  async function openForm(id = "button") {
    const review = parsedData.find((r) => r._id == id);
    if (!review) {
      console.warn("Review not found:", id);
      return;
    }
    window.__editingReviewId = id;

    document.getElementById("formName").value = review.name;
    document.getElementById("formEmail").value = review.email;
    document.getElementById("formDesc").value = review.description;
    document.getElementById("selectedRating").value = review.rating;
    highlightStars(review.rating);
  }

  window.openForm = openForm;
  // function to render review list
  console.log(ui.showDate, " ui.showDate");

  function renderReviews(list) {
    console.log(list);

    if (loding) {
      reviewsList.innerHTML = `
      <div class="loader"></div>
    `;

      return;
    } else {
      reviewsList.innerHTML = "";

      list.forEach((review) => {
        const avatar = review.name.trim().charAt(0).toUpperCase();
        const userName = review.name.trim().split("@")[0];

        console.log(userName);

        const reviewItem = document.createElement("div");
        reviewItem.className = "review-item";

        reviewItem.innerHTML = `
        <div style="
          display:flex; gap:14px; padding:16px;
          box-shadow:0 2px 8px rgba(0,0,0,0.04);
          border-radius:12px;
        "
        >
          <div class="jm-avatar star" ; font-size:18px;">
            ${avatar}
          </div>

          <div style="flex:1; width:380px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">

              <div>
                <div style="font-size:16px;" class="star">
                  ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}
                </div>
                <p  class="star" style="margin:0px">
                  ${userName}
                </p>
              </div>

              <div style="display:flex; align-items:center; gap:10px;" class="text"     flex-direction: column;>
                ${
                  ui.showDate
                    ? `<p style="margin:0; data-setting="show date" color:#888;">${review.date}</p>`
                    : ""
                }

                <!-- Edit icon -->

                    ${
                      review.customerId == ShopifyAnalytics.meta.page.customerId
                        ? ` <span class="edit-btn" style="color:black;" data-id="${review._id}" data-mode="edit">
                                <svg class="edit-review-btn" data-id="${review._id}"
                                  style="width:18px; height:18px; cursor:pointer; opacity:0.7;"
                                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                    d="M15.232 5.232l3.536 3.536M4 20h4l10-10-4-4L4 16v4z" />
                                </svg>
                              </span>`
                        : ""
                    }
              </div>
            </div>
            <p style="margin:0px;">
              ${review.description}
            </p>
          </div>
        </div>
      `;
        reviewsList.appendChild(reviewItem);
      });
    }
  }

  window.renderReviews = renderReviews;
  // filter data according option
  filterSelect.addEventListener("change", (e) => {
    const selectedFilter = e.target.value.trim();

    let sortedList = [...parsedData];

    if (selectedFilter === "most_recent") {
      sortedList.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    if (selectedFilter === "lowest") {
      sortedList.sort((a, b) => a.rating - b.rating);
    }

    if (selectedFilter === "highest") {
      sortedList.sort((a, b) => b.rating - a.rating);
    }

    renderReviews(sortedList);
  });

  const getColorSetting = async () => {
    try {
      const baseUrl = window.location.origin;

      const res = await fetch(
        `${baseUrl}/apps/review/api/routes/app/setting/getByTitle`,
        {
          method: "POST",
          body: JSON.stringify({ title: "Review Widget Setting" }),
        },
      );

      const resData = await res.json();
      console.log(resData.data.sectionSettings, "setting data form api ");

      return resData.data.sectionSettings;
    } catch (error) {
      console.log("color setting fetch error", error);
      return { message: error.message, data: null };
    }
  };

  const reviewSetting = await getColorSetting();
  console.log(reviewSetting);
  // const elements = document.getElementsByClassName("text");

  reviewSetting.color.forEach((item) => {
    const els = document.querySelectorAll(`.${item.type}`);
    const progressbars = document.querySelectorAll(".progressbar");
    const formStars = document.querySelectorAll(".star");
    const button = document.querySelectorAll(".jm-write");

    // ELEMENT COLOR LOGIC
    console.log(item.type, "type of review");

    els.forEach((el) => {
      if (item.type === "button") {
        button.forEach((bar) => {
          bar.style.backgroundColor = item.isvalue;
        });
      } else {
        el.style.color = item.isvalue;
      }
    });

    // PROGRESSBAR: only star color should apply
    if (item.type === "star") {
      progressbars.forEach((bar) => {
        bar.style.backgroundColor = item.isvalue;
      });
      formStars.forEach((stars) => {
        stars.style.color = item.isvalue;
      });
    }
  });

  /** ------------------------------
   *  APPLY TEXT
   * ------------------------------ **/

  reviewSetting.text.forEach((item) => {
    document
      .querySelectorAll(`[data-setting="${item.settingName}"]`)
      .forEach((el) => (el.textContent = item.isvalue));
  });

  /** ------------------------------
   *  APPLY THEME VISIBILITY
   * ------------------------------ **/

  reviewSetting.theme.forEach((item) => {
    document
      .querySelectorAll(`[data-setting="${item.settingName}"]`)
      .forEach((el) => {
        el.style.display = item.isChecked ? "block" : "none";
      });
  });

  const ratingSummary = async () => {
    console.log("Initiating rating summary fetch…");
    try {
      const baseUrl = window.location.origin;

      const res = await fetch(
        `${baseUrl}/apps/review/extensions/api/routes/app/reviewproduct/ratingSummary`,
      );
      const resData = await res.json();

      console.log(resData.data, "response data");
      return resData.data.reviews || [];
    } catch (error) {
      console.error("Fetch meltdown:", error);
      return [];
    }
  };

  const reviewSummary = await ratingSummary();
  const parent = document.getElementById("reviewSummry");
  console.log(parent, "====================== parent of progress bar");

  reviewSummary.forEach((item) => {
    const row = document.createElement("div"); // create a fresh block per item

    parent.innerHTML = `
    <div class="jm-Stars-Progressbar">
      <span style="font-size: 19px; width: 40%; display: flex;">
        <span>
          ${highlightStars(item.rating)}
        </span>
      </span>

      <div style="background:#e5e7eb; height:14px; width:140px; border-radius:0px; overflow:hidden;">
        <div style="
          height:14px;
          width:${(item.rating / 5) * 100}%;
          border-radius:0px;
          background-color: rgb(91, 241, 12);
        " class="progressbar"></div>
      </div>

      <span style="color:#888888;">
        ${item.pepole}
      </span>
    </div>
  `;
  });
});
