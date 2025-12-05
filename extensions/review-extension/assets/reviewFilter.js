document.addEventListener("DOMContentLoaded", async () => {
  let loding = true; // loding
  let limit = 10; // limit of api response
  // get importent Elements
  const productIdliquid = ShopifyAnalytics.meta.page.resourceId;
  const reviewsList = document.getElementById("reviewsList");
  console.log(
    // "------------------------------------------- reviewsList",
    reviewsList,
  );
  const filterSelect = document.getElementsByClassName("jm-sort-select")[0];
  const writeButtons = document.querySelectorAll(".jm-write"); // get variable for liquid
  const ui = window.reviewSettings;

  // initial stage of reviews array
  // console.log(ui, " ====== review");

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

  // fack reviews
  const fakeReviews = [
    {
      _id: "1",
      userName: "Rohan",
      rating: 5,
      description: "Bro this product is straight-up elite, zero cap.",
      createdAt: "2025-01-05T08:20:39.703+00:00",
      customerId: 7669279227940,
    },
    {
      _id: "2",
      userName: "Aditi",
      rating: 4,
      description: "Pretty solid tbh, packaging was aesthetic.",
      createdAt: "2025-02-11T08:20:39.703+00:00",
    },
    {
      _id: "3",
      userName: "Mark",
      rating: 3,
      description: "Good vibes overall, but could be more premium.",
      createdAt: "2024-12-22T08:20:39.703+00:00",
      customerId: 7669279227940,
    },
    {
      _id: "4",
      userName: "Sana",
      rating: 2,
      description: "Didn’t hit the expectations benchmark for me.",
      createdAt: "2024-12-01T08:20:39.703+00:00",
    },
    {
      _id: "5",
      userName: "Liam",
      rating: 5,
      description: "Absolute W, would recommend across the board.",
      createdAt: "2025-01-18T08:20:39.703+00:00",
    },
  ];

  let realdata = [];

  // open for and check the type of more
  function handleClick(mode = "add") {
    console.log("Entered handleClick with mode:", mode);
    const form = document.getElementById("reviewForm");

    const errorEl = document.querySelector(".NoReviewerror-msg");

    const url = window.location.origin;
    console.log("url", url);

    const formDIV = document.getElementById("FormParentDiv");
    form.dataset.mode = "create"; // 🔥 REQUIRED

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
      // emailInput.value =
      form.dataset.mode = "edit"; // 🔥 REQUIRED
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

      console.log("⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐", type);
      const response = await fetch(
        `${baseUrl}/apps/review/api/routes/extensions/reviewproduct/reviews?idType=${type}&limit=${limit}&targetId=${productIdliquid}`,
        // `${baseUrl}/apps/review/api/routes/extensions/reviewproduct/reviews`,
        { method: "GET", headers: { "Content-Type": "application/json" } },
      );

      // console.log(response, " response of api Data");
      const data = await response.json();
      console.log(data.data, " data fro api");

      return data?.data?.items || [];
    } catch (error) {
      console.error("API went off the rails:", error);
      return [];
    } finally {
      loding = false;
    }
  }

  // await apidata()

  // check option of data
  if (ui.reviewSource === "dummy") {
    console.log("--------------------------- my data is dummy  thanks");
    realdata = dummydata;
  } else if (ui.reviewSource === "real") {
    console.log("--------------------------- my data is real thanks");
    realdata = await apidata();
  } else {
    console.log("--------------------------- my data is emtey thanks");
    realdata = [];
  }
  console.log("realdata for render reviews : ", realdata);

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

  async function openForm(id, mode = "button") {
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
          <div class="jm-avatar" style="color: #388B7F; font-size:18px;">
            ${avatar}
          </div>

          <div style="flex:1; width:380px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">

              <div>
                <div style="color: #388B7F; font-size:16px;">
                  ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}
                </div>
                <p style="margin:0; font-weight:600; color: #388B7F">
                  ${userName}
                </p>
              </div>

              <div style="display:flex; align-items:center; gap:10px;">
                ${
                  ui.showDate
                    ? `<p style="margin:0; data-setting="show date" color:#888;">${review.date}</p>`
                    : ""
                }

                <!-- Edit icon -->

    ${
      review.customerId == ShopifyAnalytics.meta.page.customerId
        ? ` <span class="edit-btn" data-id="${review._id}" data-mode="edit">
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
            <p style="margin-top:10px; color: #388B7F">
              ${review.description}
            </p>
          </div>
        </div>
      `;
        reviewsList.appendChild(reviewItem);
      });

      // const MoreReviews = document.createElement("sapn");
      // MoreReviews.innerText = "See More";
      // MoreReviews.addEventListener("click", () => {
      //   limit = limit + limit;
      //   console.log(limit);
      // });
      // reviewsList.appendChild(MoreReviews);
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
});
