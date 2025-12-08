export const getColorSetting = async () => {
  try {
    const res = await fetch("/api/routes/app/setting/getByTitle", {
      method: "POST",
      body: JSON.stringify({
        title: "Review Widget Setting",
      }),
    });

    const resData = await res.json();
    const data = resData;
    return data;
  } catch (error) {
    console.log("color setting fetch error", error);
    return { messeage: error.messeage, data: null };
  }
};

export const createSettings = async () => {
  try {
    const res = await fetch("/api/routes/app/setting/create", {
      method: "POST",
      body: JSON.stringify({
        title: "Review Widget Setting",
        sectionSettings: {
          color: [
            {
              type: "star",
              settingName: "Star Color",
              isvalue: "#108474",
            },
            {
              type: "text",
              settingName: "Text Color",
              isvalue: "#000000",
            },
            {
              type: "button",
              settingName: "Button Color",
              isvalue: "#108474",
            },
            {
              type: "buttonTextColor",
              settingName: " Button Text Color",
              isvalue: "#ffffff",
            },
          ],
          theme: [
            {
              type: "checkbox",
              settingName: "show date",
              isChecked: true,
              isvalue: "",
            },
          ],
          text: [
            {
              type: "text",
              settingName: "Widget title",
              isvalue: "Customer Reviews",
            },
            {
              type: "text",
              settingName: "Average rating text",
              isvalue: "4.7",
            },
            {
              type: "text",
              settingName: "Button Text",
              isvalue: "Write a review",
            },
            {
              type: "ChoiceList",
              settingName: "Show text and stars",
              isvalue: "hidden",
              isChecked: true,
            },
            {
              type: "text",
              settingName: "Screen title",
              isvalue: "How would you rate this product?",
              isChecked: false,
            },
            {
              type: "text",
              settingName: "Introduction",
              isvalue:
                "We would love it if you would share a bit about your experience.",
              isChecked: false,
            },
            {
              type: "text",
              settingName: "display name",
              isvalue: "Yellow Snowboard",
              isChecked: false,
            },
          ],
        },
      }),
    });

    const resData = await res.json();
    const data = resData;
    return data;
  } catch (error) {
    console.log("color setting fetch error", error);
    return { messeage: error.messeage, data: null };
  }
};

export const getAllReviews = async (page = 1, limit = 5, filterType) => {
  try {
    console.log("-----------------------------------------------", filterType);
    const res = await fetch(
      `/api/routes/app/reviewproduct/getAllReviews?limit=${limit}&page=${page}&filterType=${filterType}`,
    );
    const resData = await res.json();
    const data = resData;
    return data;
  } catch (error) {
    console.log("========================getAllRev======", error);

    return [];
  }
};

export const getReviewsByType = async (type, limit, page) => {
  try {
    const res = await fetch(
      `/api/routes/app/reviewproduct/reviews?idType=${type}&limit=${limit}&page=${page}`,
    );
    const resData = await res.json();
    const data = resData;
    return data.data.items;
  } catch (error) {
    console.log("get reviews error", error);
    return [];
  }
};

export const updatedReview = async (data) => {
  try {
    const res = await fetch(`/api/routes/app/reviewproduct/updatereview`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    return resData.data;
  } catch (error) {
    return [];
  }
};

export const ratingSummary = async () => {
  try {
    const res = await fetch("/api/routes/app/reviewproduct/ratingSummary");
    const resData = await res.json();
    const data = resData;
    return data;
  } catch (error) {
    return [];
  }
};

export const getSearchResult = async (query) => {
  try {
    const res = await fetch(
      `/api/routes/app/reviewproduct/queryChange?query=${query}`,
    );
    const resData = await res.json();
    const data = resData;
    return data.data;
  } catch (error) {
    return [];
  }
};
