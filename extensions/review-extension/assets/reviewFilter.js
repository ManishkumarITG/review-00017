const shopDomain = window.location.origin;

// Mirrors app/routes/data/widgetDefaults.js — keep the two in sync.
const WIDGET_DEFAULTS = {
  colors: {
    star: "#108474",
    text: "#000000",
    button: "#108474",
    buttonTextColor: "#ffffff",
    emptyStar: "#D6D6D6",
    heading: "#202223",
    secondaryText: "#888888",
    widgetBg: "#ffffff",
    cardBg: "#ffffff",
    progressTrack: "#e5e7eb",
    avatarBg: "#cccccc",
  },
  toggles: {
    "show date": true,
    "show widget title": true,
    "show average rating": true,
    "show review count": true,
    "show rating breakdown": true,
    "show write review button": true,
    "show sort options": true,
    "show reviewer avatar": true,
    "show reviewer name": true,
    "show card shadow": true,
  },
  texts: {
    "Widget title": "Customer Reviews",
    "Button Text": "Write a review",
    "Rating suffix text": "out of 5",
    "Review count text": "Based on {count} reviews",
    "Empty state text": "Be the first to write a review",
    "Load more text": "Load More Reviews",
    "Screen title": "How would you rate this product?",
    Introduction: "We would love it if you would share a bit about your experience.",
  },
  layout: {
    widgetWidth: "600",
    alignment: "center",
    starSize: "18",
    titleSize: "22",
    textSize: "15",
    buttonRadius: "0",
    buttonWidth: "60",
    cardRadius: "12",
    cardGap: "18",
    progressHeight: "14",
    progressRadius: "0",
    reviewsPerPage: "10",
  },
};

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
    console.error("Widget setting fetch error:", error);
    return null;
  }
}

// Flatten the stored sectionSettings into lookup maps, falling back to
// defaults for anything missing (older shops, failed fetches).
function buildSettingsMap(sectionSettings) {
  const map = {
    colors: { ...WIDGET_DEFAULTS.colors },
    toggles: { ...WIDGET_DEFAULTS.toggles },
    texts: { ...WIDGET_DEFAULTS.texts },
    layout: { ...WIDGET_DEFAULTS.layout },
  };
  if (!sectionSettings) return map;

  (sectionSettings.color || []).forEach((c) => {
    if (c.isvalue) map.colors[c.type] = c.isvalue;
  });
  (sectionSettings.theme || []).forEach((t) => {
    if (typeof t.isChecked === "boolean") map.toggles[t.settingName] = t.isChecked;
  });
  (sectionSettings.text || []).forEach((t) => {
    if (t.isvalue !== undefined && t.isvalue !== null && t.isvalue !== "")
      map.texts[t.settingName] = t.isvalue;
  });
  (sectionSettings.layout || []).forEach((l) => {
    if (l.isvalue) map.layout[l.type] = l.isvalue;
  });
  return map;
}

// Push every customizable value into the widget as CSS variables + DOM text.
function applyWidgetSettings(map) {
  const flexAlign = { left: "flex-start", center: "center", right: "flex-end" };

  document.querySelectorAll(".jm-review-widget").forEach((root) => {
    const s = root.style;
    s.setProperty("--jm-star", map.colors.star);
    s.setProperty("--jm-empty-star", map.colors.emptyStar);
    s.setProperty("--jm-heading", map.colors.heading);
    s.setProperty("--jm-text", map.colors.text);
    s.setProperty("--jm-secondary", map.colors.secondaryText);
    s.setProperty("--jm-btn-bg", map.colors.button);
    s.setProperty("--jm-btn-text", map.colors.buttonTextColor);
    s.setProperty("--jm-widget-bg", map.colors.widgetBg);
    s.setProperty("--jm-card-bg", map.colors.cardBg);
    s.setProperty("--jm-track", map.colors.progressTrack);
    s.setProperty("--jm-avatar-bg", map.colors.avatarBg);

    s.setProperty("--jm-widget-width", `${map.layout.widgetWidth}px`);
    s.setProperty("--jm-align", map.layout.alignment);
    s.setProperty(
      "--jm-flex-align",
      flexAlign[map.layout.alignment] || "center",
    );
    s.setProperty("--jm-star-size", `${map.layout.starSize}px`);
    s.setProperty("--jm-title-size", `${map.layout.titleSize}px`);
    s.setProperty("--jm-text-size", `${map.layout.textSize}px`);
    s.setProperty("--jm-btn-radius", `${map.layout.buttonRadius}px`);
    s.setProperty("--jm-btn-width", `${map.layout.buttonWidth}%`);
    s.setProperty("--jm-card-radius", `${map.layout.cardRadius}px`);
    s.setProperty("--jm-card-gap", `${map.layout.cardGap}px`);
    s.setProperty("--jm-progress-h", `${map.layout.progressHeight}px`);
    s.setProperty("--jm-progress-r", `${map.layout.progressRadius}px`);
    s.setProperty(
      "--jm-card-shadow",
      map.toggles["show card shadow"]
        ? "0 2px 8px rgba(0,0,0,0.08)"
        : "none",
    );

    // texts
    root.querySelectorAll(".jm-heading").forEach((el) => {
      el.textContent = map.texts["Widget title"];
    });
    root.querySelectorAll(".jm-actions .buttonText").forEach((el) => {
      el.textContent = map.texts["Button Text"];
    });
    root.querySelectorAll(".jm-form-title").forEach((el) => {
      el.textContent = map.texts["Screen title"];
    });
    root.querySelectorAll(".jm-form-intro").forEach((el) => {
      el.textContent = map.texts["Introduction"];
    });

    // visibility
    const setHidden = (selector, show) => {
      root.querySelectorAll(selector).forEach((el) => {
        el.classList.toggle("jm-hidden", !show);
      });
    };
    setHidden(".jm-heading", map.toggles["show widget title"]);
    setHidden(
      ".jm-actions .buttonText",
      map.toggles["show write review button"],
    );
    setHidden(".jm-sort-select", map.toggles["show sort options"]);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  let loding = true;
  let filterType = "mostRecent";

  const domain = window.location.origin.split("//")[1];
  const analyticsPage =
    (window.ShopifyAnalytics &&
      window.ShopifyAnalytics.meta &&
      window.ShopifyAnalytics.meta.page) ||
    {};

  const settingResponse = await getSettingData();
  const settings = buildSettingsMap(settingResponse?.data?.sectionSettings);
  applyWidgetSettings(settings);

  let limit = Number(settings.layout.reviewsPerPage) || 10;
  const starSize = Number(settings.layout.starSize) || 18;

  const reviewsList = document.getElementById("reviewsList");

  // Theme editor preview renders static markup — settings are applied above,
  // but there is nothing dynamic to load.
  if (!reviewsList) return;

  const productIdliquid = analyticsPage.resourceId || domain;

  const filterSelect = document.getElementsByClassName("jm-sort-select")[0];
  const writeButtons = document.querySelectorAll(".buttonText");

  // date visibility: app settings win, falls back to the theme block setting
  const showDate =
    typeof settings.toggles["show date"] === "boolean"
      ? settings.toggles["show date"]
      : !!(window.reviewSettings && window.reviewSettings.showDate);

  let type = analyticsPage.pageType == "home" ? "store" : "product";

  let realdata = [];

  function handleClick(mode) {
    const form = document.getElementById("reviewForm");
    const formDIV = document.getElementById("FormParentDiv");
    if (!form || !formDIV) return;

    form.dataset.mode = "create";
    formDIV.style.display =
      formDIV.style.display === "block" ? "none" : "block";

    const emailInput = document.getElementById("formEmail");
    if (!emailInput) return;

    if (mode === "edit") {
      form.dataset.mode = "edit";
      emailInput.disabled = true;
    } else {
      emailInput.disabled = false;
    }
  }

  writeButtons.forEach((btn) => {
    btn.addEventListener("click", () => handleClick("add"));
  });

  reviewsList.addEventListener("click", (e) => {
    const editBtn = e.target.closest(".edit-btn");
    if (!editBtn) return;
    handleClick("edit");
    openForm(editBtn.dataset.id);
  });

  async function apidata(limit, filterType) {
    try {
      loding = true;
      renderReviews([]);
      const baseUrl = window.location.origin;

      const response = await fetch(
        `${baseUrl}/apps/review/api/routes/extensions/reviewproduct/reviews?idType=${type}&limit=${limit}&targetId=${productIdliquid}&filterType=${filterType}`,
      );

      const data = await response.json();
      return data?.data?.items;
    } catch (error) {
      console.error("Reviews fetch error:", error);
      return [];
    } finally {
      loding = false;
    }
  }
  realdata = await apidata(limit, filterType);

  function getStarArray(rating) {
    const totalStars = 5;
    const stars = [];
    const filled = `
    <span class="star">
      <svg width="${starSize}" height="${starSize}" viewBox="0 0 24 24">
        <path d="M12 2L15 9H22L17 14L19 22L12 18L5 22L7 14L2 9H9L12 2Z" fill="currentColor"></path>
      </svg>
    </span>
  `;
    const empty = `
    <span class="jm-star-empty">
      <svg width="${starSize}" height="${starSize}" viewBox="0 0 24 24">
        <path d="M12 2L15 9H22L17 14L19 22L12 18L5 22L7 14L2 9H9L12 2Z" fill="none" stroke="currentColor" stroke-width="1.5"></path>
      </svg>
    </span>
  `;
    for (let i = 1; i <= totalStars; i++) {
      stars.push(i <= rating ? filled : empty);
    }

    return stars.join("");
  }

  function filterresponsedata(realdata) {
    const parsedData = (realdata || []).map((data) => {
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
        const writeReviewButtons =
          document.getElementsByClassName("disablebutton");
        Array.from(writeReviewButtons).forEach((button) => {
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

  renderReviews(filterdReviews);

  async function openForm(id = "button") {
    const review = filterdReviews.find((r) => r._id == id);
    if (!review) {
      console.warn("Review not found:", id);
      return;
    }
    window.__editingReviewId = id;

    document.getElementById("formName").value = review.name;
    document.getElementById("formEmail").value = review.email;
    document.getElementById("formDesc").value = review.description;
    document.getElementById("selectedRating").value = review.rating;

    const stars = document.querySelectorAll("#ratingStars .form-star");
    const ratingValue = review.rating;

    stars.forEach((star, index) => {
      star.style.color =
        index < ratingValue ? settings.colors.star : settings.colors.emptyStar;
    });
  }

  window.openForm = openForm;

  function renderReviews(list) {
    if (loding) {
      reviewsList.innerHTML = `
      <div class="loader"></div>
    `;
      return;
    }

    reviewsList.innerHTML = "";

    list.forEach((review) => {
      const avatar = review.name.trim().charAt(0).toUpperCase();
      const userName = review.name.trim().split("@")[0];
      const finalName = userName[0].toUpperCase() + userName.slice(1);

      const reviewItem = document.createElement("div");
      reviewItem.className = "review-item";

      const canEdit = review.customerId == analyticsPage.customerId;

      reviewItem.innerHTML = `
        <div class="jm-review-card">
          ${
            settings.toggles["show reviewer avatar"]
              ? `<div class="jm-avatar">${avatar}</div>`
              : ""
          }

          <div class="jm-card-body">
            <div class="jm-card-topline">
              <div>
                <div class="star">
                  <span class="mainFontSize" style="justify-content: start">${getStarArray(review.rating)}</span>
                </div>
                ${
                  settings.toggles["show reviewer name"]
                    ? `<p class="tagName">${finalName}</p>`
                    : ""
                }
              </div>

              <div style="display:flex; align-items:center; gap:10px;">
                ${
                  showDate
                    ? `<p class="jm-secondary-text">${review.date}</p>`
                    : ""
                }
                ${
                  canEdit
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
            <p class="jm-review-body">${review.description}</p>
          </div>
        </div>
      `;
      reviewsList.appendChild(reviewItem);
    });

    if (list.length >= limit) {
      const button = document.createElement("button");
      button.innerText = settings.texts["Load more text"];
      button.className = "jm-load-more";
      button.addEventListener("click", () => pagination(limit));
      reviewsList.appendChild(button);
    }
  }

  async function pagination(currentLimit) {
    limit = currentLimit * 2;
    realdata = await apidata(limit, filterType);
    const limitreview = filterresponsedata(realdata);
    renderReviews(limitreview);
  }

  window.renderReviews = renderReviews;

  if (filterSelect) {
    filterSelect.addEventListener("change", async (e) => {
      const selectedFilter = e.target.value.trim();

      const filterMap = {
        most_recent: "mostRecent",
        lowest: "lowestRating",
        highest: "highestRating",
      };

      if (!filterMap[selectedFilter]) return;

      filterType = filterMap[selectedFilter];
      realdata = await apidata(limit, filterType);
      renderReviews(filterresponsedata(realdata));
    });
  }

  const ratingSummary = async () => {
    try {
      const baseUrl = window.location.origin;
      const targetId = productIdliquid;

      const res = await fetch(
        `${baseUrl}/apps/review/api/routes/extensions/reviewproduct/ratingSummary?targetId=${targetId}`,
      );
      const resData = await res.json();

      return resData.data || [];
    } catch (error) {
      console.error("Rating summary fetch error:", error);
      return [];
    }
  };

  const reviewSummary = await ratingSummary();
  const parent = document.querySelector(".costomeSummary");

  if (!parent) return;

  if (reviewSummary.totalReview === 0) {
    document.querySelectorAll(".jm-actions").forEach((el) => {
      el.style.flexDirection = "row-reverse";
    });
    const writeReviewButtons = document.getElementsByClassName("disablebutton");

    Array.from(writeReviewButtons).forEach((button) => {
      button.removeAttribute("disabled");
    });

    const htmlFilter = document.getElementsByClassName("jm-sort")[0];
    if (htmlFilter) {
      htmlFilter.innerHTML = `
      <div style="
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        gap: 4px;
      ">
        <div>
          <span style="display: flex;">${getStarArray(0)}</span>
        </div>
        <span class="jm-empty-state">${settings.texts["Empty state text"]}</span>
      </div>
    `;
    }

    parent.innerHTML = "";
    return;
  }

  const summaryParts = [];

  if (settings.toggles["show average rating"]) {
    summaryParts.push(`
      <div class="center">
        <span style="display: flex; justify-content: var(--jm-flex-align); gap: 7px;">
          <span class="mainFontSize">${getStarArray(reviewSummary.avgRating)}</span>
          ${reviewSummary.avgRating} ${settings.texts["Rating suffix text"]}
        </span>
      </div>
    `);
  }

  if (settings.toggles["show review count"]) {
    const countText = String(settings.texts["Review count text"])
      .split("{count}")
      .join(String(reviewSummary.totalReview));
    summaryParts.push(`<p class="jm-based center">${countText}</p>`);
  }

  parent.innerHTML = summaryParts.join("");

  if (settings.toggles["show rating breakdown"]) {
    reviewSummary?.reviews?.forEach((item) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="jm-Stars-Progressbar">
        <span class="mainFontSize">
            ${getStarArray(item.rating)}
        </span>

        <div class="jm-progress-track">
          <div class="progressbar" style="width:${(item.pepole / 5) * 100}%;"></div>
        </div>

        <span class="jm-progress-count">
          ${item.pepole}
        </span>
      </div>
    `;

      parent.appendChild(div);
    });
  }
});
