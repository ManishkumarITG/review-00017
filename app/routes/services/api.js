import {
  DEFAULT_SECTION_SETTINGS,
  SETTINGS_TITLE,
} from "../data/widgetDefaults.js";

export const getColorSetting = async () => {
  try {
    const res = await fetch("/api/routes/app/setting/getByTitle", {
      method: "POST",
      body: JSON.stringify({
        title: SETTINGS_TITLE,
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
        title: SETTINGS_TITLE,
        sectionSettings: DEFAULT_SECTION_SETTINGS,
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

export const getSetupStatus = async () => {
  try {
    const res = await fetch("/api/routes/app/setup/status");
    const resData = await res.json();
    return resData.data;
  } catch (error) {
    console.log("setup status fetch error", error);
    return null;
  }
};

export const getAllReviews = async (page = 1, limit = 5, filterType) => {
  try {
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
    return data.data;
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
    console.log("my search data" , data.data)
    return data.data;
  } catch (error) {
    return [];
  }
};
