document.addEventListener("DOMContentLoaded", () => {
  let dummydata = [
    "Rohan|0|Bro product legit fire|2025-01-05",
    "Aditi|4|Pretty solid ngl|2025-11-26",
    "Mark|3|Decent but packaging could’ve been better.|2024-12-22",
    "Sana|2|Not what I expected.|2024-11-15",
    "Vikram|1|Terrible quality, do not buy!|2024-10-30",
  ];

  let dbdata = [
    "balwan|0|Bro product legit fire|2025-01-05",
    "manish|4|Pretty solid ngl|2025-11-26",
    "Mark|3|Decent but packaging could’ve been better.|2024-12-22",
    "parth|2|Not what I expected.|2024-11-15",
    "Vikram|1|Terrible quality, do not buy!|2024-10-30",
  ];

  let realdata = [];

  const ui = window.reviewSettings;
  if (ui.reviewSource == "dummy") {
    realdata = dummydata;
  } else if (ui.reviewSource == "real") {
    realdata = dbdata;
  } else {
    realdata = [];
  }
  const filterSelect = document.getElementsByClassName("jm-sort-select")[0];
  const parsedData = realdata.map((data) => {
    const [author, rating, body, date] = data.split("|");

    return {
      author,
      rating: Number(rating),
      body,
      date: date.trim(),
    };
  });

  function renderReviews(list) {
    reviewsList.innerHTML = "";

    list.forEach((review) => {
      const avatar = review.author.trim().charAt(0).toUpperCase();

      const reviewItem = document.createElement("div");
      reviewItem.className = "review-item";

      reviewItem.innerHTML = `
<div style="
  display:flex; gap:14px; padding:16px;
  box-shadow:0 2px 8px rgba(0,0,0,0.04);
  border-radius:12px;
">
  <div class="jm-avatar" style="color:${ui.starColor}; font-size:18px;">
    ${avatar}
  </div>

  <div style="flex:1;">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <div>
<div style="color:${ui.starColor}; font-size:16px;">
          ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}
        </div>
        <p style="margin:0; font-weight:600; color:${ui.starColor}">
          ${review.author}
        </p>
        
        
      </div>

      ${
        ui.showDate
          ? `<div><p style="margin:0; color:#888;">${review.date}</p></div>`
          : ""
      }
    </div>

    <p style="margin-top:10px; color:${ui.textColor}">
      ${review.body}
    </p>
  </div>
</div>
`;

      reviewsList.appendChild(reviewItem);
    });
  }

  renderReviews(parsedData);

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
