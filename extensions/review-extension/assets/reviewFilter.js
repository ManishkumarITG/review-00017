document.addEventListener("DOMContentLoaded", async () => {
  let dummydata = [
    "Rohan|0|Bro product legit fire|2025-01-05",
    "Aditi|4|Pretty solid ngl|2025-11-26",
    "Mark|3|Decent but packaging could’ve been better.|2024-12-22",
    "Sana|2|Not what I expected.|2024-11-15",
    "Vikram|1|Terrible quality, do not buy!|2024-10-30",
  ];

  const productIdliquid = window.__productId;
  // const stroeID = window.__shop.permanent_domain;

  async function apidata() {
    try {
      const type = productIdliquid ? "product" : "store";
      const baseUrl = window.location.origin;
      const response = await fetch(
        `${baseUrl}/apps/review/api/routes/extensions/reviewproduct/reviews?idTYpe=${type}&limit=28`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json(); // now this works
      // realdata = data.data.data
      console.log(data);

      console.log("data from api", data.data.items);

      return data.data.items;
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  }

  console.log(apidata());

  // apidata();

  let realdata = await apidata();

  // console.log(realdata);

  const ui = window.reviewSettings;
  if (ui.reviewSource == "dummy") {
    realdata = dummydata;
  } else if (ui.reviewSource == "real") {
    realdata = await apidata();
  } else {
    realdata = [];
  }
  const filterSelect = document.getElementsByClassName("jm-sort-select")[0];
  const parsedData = realdata.map((data) => {
    const { userName, rating, description, createdAt } = data;

    return {
      author: userName || "Anonymous",
      rating: Number(rating),
      description,
      date: createdAt ? createdAt.split("T")[0] : "",
    };
  });

  function renderReviews(list) {
    reviewsList.innerHTML = "";

    list.forEach((review) => {
      console.log(review);

      const avatar = review.author.trim().charAt(0).toUpperCase();

      const reviewItem = document.createElement("div");
      reviewItem.className = "review-item";

      reviewItem.innerHTML = `<div style="
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
                        ? `
                    <div>
                        <p style="margin:0; color:#888;">${review.date}</p>
                    </div>
                    `
                        : ""
                    }
                  </div>
                  <p style="margin-top:10px; color:${ui.textColor}">
                  ${review.description}

                  </p>
              </div>
            </div>`;

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
