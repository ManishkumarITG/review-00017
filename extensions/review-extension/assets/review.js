document.addEventListener("DOMContentLoaded", () => {

  const dbReviews = [
    { author: "Amit", rating: 5, body: "Nice!", date: "2025-01-01" },
    { author: "Simran", rating: 4, body: "Loved it.", date: "2025-01-02" }
  ];

  const lists = document.querySelectorAll(".jm-list");

  lists.forEach(list => {
    const source = list.dataset.source;

    if (source !== "db") return;

    // Clear placeholder
    list.innerHTML = "";

    dbReviews.forEach(r => {
      list.innerHTML += `
        <article class="jm-item">
          <div class="jm-item-left">
            <div class="jm-avatar">${r.author.slice(0,1)}</div>
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

});
