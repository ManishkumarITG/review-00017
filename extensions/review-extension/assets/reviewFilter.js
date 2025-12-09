document.addEventListener("DOMContentLoaded", async () => {
  let loding = true; // loding
  let limit = 2; // limit of api response
  let filterType = "mostRecent";

  // get importent Elements
  const domain = window.location.origin.split("//")[1];
  const productIdliquid = ShopifyAnalytics.meta.page.resourceId || domain;

  console.log("shop domain", domain);

  const reviewsList = document.getElementById("reviewsList");

  const filterSelect = document.getElementsByClassName("jm-sort-select")[0];
  const writeButtons = document.querySelectorAll(".jm-write"); // get variable for liquid
  const ui = window.reviewSettings;

  console.log(ui, "ui from the liquid");
  // console.log(
  //   "------------------------------------------- reviewsList",
  //   reviewsList,
  // );
  // check type of page for type of review store of product
  let type =
    ShopifyAnalytics.meta.page.pageType == "home" ? "store" : "product";
  console.log(ShopifyAnalytics.meta, " type of review");

  // dummy data for sample option
  const dummydata = [
    {
      _id: "1",
      name: "Arjun",
      rating: 5,
      description: "Bro product legit fire fr fr",
      createdAt: "2025-01-05",
      email: "arjun@gmail.com",
      customerId: "123456789",
    },

    {
      _id: "2",

      name: "Meera",

      rating: 4,

      description: "Pretty solid ngl, value for money",

      createdAt: "2025-11-26",

      email: "meera@gmail.com",

      customerId: "987654321",
    },

    {
      _id: "3",

      name: "Jason",

      rating: 3,

      description: "Decent but packaging could’ve been better.",

      createdAt: "2024-12-22",

      email: "jason@gmail.com",

      customerId: "555666777",
    },

    {
      _id: "4",

      name: "Tanya",

      rating: 2,

      description: "Not what I expected tbh.",

      createdAt: "2024-11-15",

      email: "tanya@gmail.com",

      customerId: "444555666",
    },

    {
      _id: "5",

      name: "Kabir",

      rating: 1,

      description: "Terrible quality, do not buy!",

      createdAt: "2024-10-30",

      email: "kabir@gmail.com",

      customerId: "333444555",
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

  // reviewsList.addEventListener("click", (e) => {
  //   const editBtn = e.target.closest(".edit-btn");
  //   console.log(editBtn);

  //   if (!editBtn) return;

  //   const reviews = editBtn.dataset.id;

  //   console.log(reviews, "review");

  //   handleClick("edit");
  //   openForm(reviews);
  // });

  // function to get data
  async function apidata(limit, filterType) {
    console.log("limit", limit);
    console.log("product type", productIdliquid);
    console.log("filterType", filterType);
    console.log("type", type);

    try {
      loding = true;
      renderReviews([]);
      const baseUrl = window.location.origin;

      console.log("product id ", productIdliquid);
      const response = await fetch(
        `${baseUrl}/apps/review/api/routes/extensions/reviewproduct/reviews?idType=${type}&limit=${limit}&targetId=${productIdliquid}&filterType=${filterType}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
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
    // realdata = await apidata(limit, filterType);
   
    realdata = dummydata;
    console.log(ui.reviewSource, "in dummy ", realdata);
  } else if (ui.reviewSource === "real") {
    realdata = await apidata(limit, filterType);
    console.log(ui.reviewSource, " asdasds in real ", realdata);

    // realdata = [];
  } else {
    realdata = [];
  }

  console.log(realdata, "realdata 00000000000000");

  // highlite stars in form
  function getStarArray(rating) {
    const totalStars = 5;
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      stars.push(i <= rating ? "★" : "☆");
    }

    const str = stars.join("");

    return str;
  }

  // pass filterd data
  function filterresponsedata(realdata) {
    const parsedData = realdata.map((data) => {
      const {
        name,
        rating,
        description,
        createdAt,
        _id,
        customerId,
        email,
        targetId,
      } = data;

      if (targetId == productIdliquid) {
        console.log("button is disabled");

        const writeReviewButtons =
          document.getElementsByClassName("disablebutton");
        Array.from(writeReviewButtons).forEach((button) => {
          console.log("button is disabled");
          button.setAttribute("disabled", true);
        });
      }

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
    return parsedData;
  }

  const filterdReviews = filterresponsedata(realdata);

  //call renderReview Function to render all reviews
  renderReviews(filterdReviews);

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
    //   reviewsList.innerHTML = `
    //   <div class="loader"></div>
    // `;

      return;
    } else {
      // reviewsList.innerHTML = "";

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
                <p  class="tagName" style="margin:0px">
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

      if (list.length > 5) {
        const button = document.createElement("button");
        button.innerText = "Load More";

        button.style.cssText = `
              padding: 10px 18px;
              margin-top: 20px;
              border-radius: 8px;
              border: 1px solid #d1d5db;
              background: #f9fafb;
              font-size: 15px;
              font-weight: 500;
              cursor: pointer;
              transition: all 0.2s ease;
              width: 150px;
              align-self: center;
              display: block;
            `;

        button.onmouseover = () => {
          button.style.background = "#e5e7eb";
        };

        button.onmouseout = () => {
          button.style.background = "#f9fafb";
        };

        button.addEventListener("click", () => pagination(limit));
        reviewsList.appendChild(button);
      }
    }
  }

  async function pagination(limit) {
    console.log(limit, "befor");

    limit = limit * 2;
    console.log(limit, "afrer");

    realdata = await apidata(limit, filterType);
    const limitreview = filterresponsedata(realdata);

    console.log("realdata with limit", limitreview);
    renderReviews(limitreview);
  }

  window.renderReviews = renderReviews;
  // filter data according option
  filterSelect.addEventListener("change", async (e) => {
    const selectedFilter = e.target.value.trim();
    if (ui.reviewSource === "real") {
      if (selectedFilter === "most_recent") {
        filterType = "mostRecent";

        realdata = await apidata(limit, filterType);
        const limitreview = filterresponsedata(realdata);
        console.log(type);

        console.log("realdata with type", limitreview);
        renderReviews(limitreview);
      }

      if (selectedFilter === "lowest") {
        filterType = "lowestRating";

        realdata = await apidata(limit, filterType);
        const limitreview = filterresponsedata(realdata);
        console.log(type);

        console.log("realdata with type", limitreview);
        renderReviews(limitreview);
      }

      if (selectedFilter === "highest") {
        filterType = "highestRating";

        realdata = await apidata(limit, filterType);
        const limitreview = filterresponsedata(realdata);
        console.log(type);

        console.log("realdata with type", limitreview);
        renderReviews(limitreview);
      }
    }

    // renderReviews(sortedList);
  });

  const ratingSummary = async () => {
    console.log("Initiating rating summary fetch…");
    try {
      const baseUrl = window.location.origin;
      const targetId = productIdliquid;

      const res = await fetch(
        `${baseUrl}/apps/review/api/routes/extensions/reviewproduct/ratingSummary?targetId=${targetId}`,
      );
      const resData = await res.json();

      // console.log("------------------------------- rating summary", resData);
      return resData.data || [];
    } catch (error) {
      console.error("Fetch meltdown:", error);
      return [];
    }
  };

  const reviewSummary = await ratingSummary();
  // console.log("--------------------------------------- summary", reviewSummary);
  const parent = document.querySelector(".costomeSummary");
  console.log("parent ------0", parent);
  if (reviewSummary.totalReview <= 0) {
    const htmlFilter = document.getElementsByClassName("jm-sort-select ")[0];
    htmlFilter.innerHTML = "";
    parent.innerHTML = "";
    return;
  }
  parent.innerHTML = `
    <div class="center">
      <span class="star mainFontSize">${getStarArray(reviewSummary.avgRating)}</span> ${reviewSummary.avgRating} out of 5
    </div>
    <p class="center" style="font-weight: normal; font-size: 16px;"> Based on ${reviewSummary.totalReview} reviews</p>
    `;

  reviewSummary?.reviews?.forEach((item) => {
    // console.log("my items --------------------- my items", item);
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="jm-Stars-Progressbar">
      <span class="star mainFontSize">
          ${getStarArray(item.rating)}
      </span>

      <div style="background:#e5e7eb; height:14px; width:140px; border-radius:0px; overflow:hidden;">
        <div class="progressbar" style="
          height:14px;
          width:${(item.pepole / 5) * 100}%;
          border-radius:0px;
        "></div>
      </div>

      <span style="color:#888888;">
        ${item.pepole}
      </span>
    </div>
  `;

    parent.appendChild(div);
  });
});
