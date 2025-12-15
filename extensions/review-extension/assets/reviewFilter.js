const shopDomain = window.location.origin;

async function getSettingData() {
  try {
    const res = await fetch(
      `${shopDomain}/apps/review/api/routes/extensions/setting/getByTitle`,
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
}

document.addEventListener("DOMContentLoaded", async () => {
  let loding = true; // loding
  let limit = 10; // limit of api response
  let filterType = "mostRecent";

  const domain = window.location.origin.split("//")[1];

  const settingResponse = await getSettingData();
  const colorArray = settingResponse?.data?.sectionSettings?.color;
  const starColorSetting = colorArray?.map((v) => v.isvalue);
  generateStarHTML(starColorSetting);

  const productIdliquid = ShopifyAnalytics.meta.page.resourceId || domain;
  console.log("shop domain", domain);

  const reviewsList = document.getElementById("reviewsList");
  const filterSelect = document.getElementsByClassName("jm-sort-select")[0];
  const writeButtons = document.querySelectorAll(".buttonText"); // get variable for liquid
  const ui = window.reviewSettings;

  // check type of page for type of review store of product
  let type =
    ShopifyAnalytics.meta.page.pageType == "home" ? "store" : "product";
  console.log(ShopifyAnalytics.meta.page.resourceId, " type of review");

  let realdata = [];

  // open for and check the type of more
  function handleClick(mode) {
    console.log("Entered handleClick with mode:", mode);
    const form = document.getElementById("reviewForm");
    console.log(form, "review form");

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

    if (!editBtn) return;

    const reviews = editBtn.dataset.id;

    console.log(reviews, "review");

    handleClick("edit");
    openForm(reviews);
  });

  // function to get data
  async function apidata(limit, filterType) {
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
        `${baseUrl}/apps/review/api/routes/extensions/reviewproduct/reviews?idType=${type}&limit=${limit}&targetId=${productIdliquid}&filterType=${filterType}`,
      );

      const data = await response.json();
      console.log("--------------------------- res my filters data", data.data);

      return data?.data?.items;
    } catch (error) {
      console.error("API went off the rails:", error);
      return [];
    } finally {
      loding = false;
    }
  }
  realdata = await apidata(limit, filterType);

  function addSettings(className, value, styleName) {
    const ele = document.querySelectorAll(`.${className}`);
    if (className == "progressbar") {
      console.log("ele", ele);
    }
    ele.forEach((v) => {
      v.style[styleName] = value;
    });
  }

  function generateStarHTML(settings) {
    const starColor = settings[0];
    const textColor = settings[1];
    const buttonColor = settings[2];
    const buttonTextColor = settings[3];

    console.log(starColor, "star color ");

    addSettings("star", starColor, "color");

    addSettings("jm-write", buttonColor, "background");
    addSettings("jm-write", buttonTextColor, "color");
    addSettings("tagName", textColor, "color");
    addSettings("progressbar", starColor, "background");
    addSettings("loader", starColor, "background");
  }

  generateStarHTML(starColorSetting);

  // highlite stars in form
  function getStarArray(rating) {
    const totalStars = 5;
    const stars = [];
    const defaultFilled = `
    <span>
      <svg class="star" width="18" height="18" viewBox="0 0 24 24">
        <path class ="star" d="M12 2L15 9H22L17 14L19 22L12 18L5 22L7 14L2 9H9L12 2Z" fill="currentColor"></path>
      </svg>
    </span>
  `;
    const defaultEmpty = `
 <span>
      <svg class="star" width="18" height="18" viewBox="0 0 24 24" ">
        <path d="M12 2L15 9H22L17 14L19 22L12 18L5 22L7 14L2 9H9L12 2Z" fill="none" stroke="currentColor" stroke-width="1.5"></path>
      </svg>
    </span>
  `;
    for (let i = 1; i <= totalStars; i++) {
      stars.push(i <= rating ? defaultFilled : defaultEmpty);
    }

    const str = stars.join("");

    return str;
  }

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

  //call renderReview Function to render all reviews
  const filterdReviews = filterresponsedata(realdata);

  //call renderReview Function to render all reviews
  renderReviews(filterdReviews);

  async function openForm(id = "button") {
    const review = filterdReviews.find((r) => r._id == id);
    if (!review) {
      console.warn("Review not found:", id);
      return;
    }
    console.log(review);
    window.__editingReviewId = id;

    // const ReviewFormRating = document.getElementById("selectedRating");
    document.getElementById("formName").value = review.name;
    document.getElementById("formEmail").value = review.email;
    document.getElementById("formDesc").value = review.description;
    document.getElementById("selectedRating").value = review.rating;
    const ReviewFormRating = document.getElementById("selectedRating");
    ReviewFormRating.value = review.rating;

    // Select stars from their container
    const stars = document.querySelectorAll("#ratingStars .form-star");
    console.log(stars, "stars");
    const ratingValue = review.rating;
    console.log(ratingValue, "ratingValue");

    stars.forEach((star, index) => {
      if (index < ratingValue) {
        star.classList.add("star"); // active star
      } else {
        star.classList.remove("star"); // inactive star
      }
    });
    generateStarHTML(starColorSetting);
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
        const finalName = userName[0].toUpperCase() + userName.slice(1);
        // const data =review.
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
                <div style="font-size:16px;     ;" class="star">
                  <span class="mainFontSize" style="justify-content: start">${getStarArray(review.rating)}</span>
                </div>
                <p  class="tagName" style="margin:0px">
                  ${finalName}
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
    if (list.length > 5) {
      const button = document.createElement("button");
      button.innerText = "Load More Reviews";

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
    generateStarHTML(starColorSetting);
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

    let sortedList = [...filterdReviews];

    if (selectedFilter === "most_recent") {
      // sortedList.sort((a, b) => new Date(b.date) - new Date(a.date));
      filterType = "mostRecent";
      realdata = await apidata(limit, filterType);
      const limitreview = filterresponsedata(realdata);

      console.log("realdata with limit", limitreview);
      renderReviews(limitreview);
    }

    if (selectedFilter === "lowest") {
      // sortedList.sort((a, b) => a.rating - b.rating);/
      filterType = "lowestRating";
      realdata = await apidata(limit, filterType);
      const limitreview = filterresponsedata(realdata);

      console.log("realdata with limit", limitreview);
      renderReviews(limitreview);
    }

    if (selectedFilter === "highest") {
      // sortedList.sort((a, b) => b.rating - a.rating);
      filterType = "highestRating";
      realdata = await apidata(limit, filterType);
      const limitreview = filterresponsedata(realdata);

      renderReviews(limitreview);
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

      return resData.data || [];
    } catch (error) {
      console.error("Fetch meltdown:", error);
      return [];
    }
  };

  const reviewSummary = await ratingSummary();
  console.log("--------------------------------------- summary", reviewSummary);
  const parent = document.querySelector(".costomeSummary");

  if (reviewSummary.totalReview === 0) {
    // Flip action bar layout
    document.querySelectorAll(".jm-actions").forEach((el) => {
      el.style.flexDirection = "row-reverse";
    });
    const writeReviewButtons = document.getElementsByClassName("disablebutton");

    Array.from(writeReviewButtons).forEach((button) => {
      console.log("button enabled now, let's gooo 🚀");
      button.removeAttribute("disabled"); // fully enables the button
    });

    // Patch the filter block with first-review CTA
    const htmlFilter = document.getElementsByClassName("jm-sort")[0];
    htmlFilter.innerHTML = `
    <div style="
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: 4px;
    ">
      <div>
      <span class="star" style="display: flex;">
${getStarArray(0)}
</span>
      </div>
      <span>Be the first to write a review</span>
    </div>
  `;

    // Clear parent widget
    parent.innerHTML = "";
    generateStarHTML(starColorSetting);

    return;
  }

  parent.innerHTML = `
    <div class="center">
    <span
    style="display: flex;
    justify-content: center;
    gap: 7px;">
    <span class="star mainFontSize">${getStarArray(reviewSummary.avgRating)}</span> ${reviewSummary.avgRating} out of 5
    </span>
    </div>
    <p class="center" style="font-weight: normal; margin:0px; font-size: 16px;"> Based on ${reviewSummary.totalReview} reviews</p>
    `;

  reviewSummary?.reviews?.forEach((item) => {
    console.log("my items --------------------- my items", item);
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
  generateStarHTML(starColorSetting);
});
