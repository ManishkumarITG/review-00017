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
          ],
        },
      }),
    });

    const resData = await res.json();
    const data = resData;
    return data;
  } catch (error) {
    console.log("color setting fetch error", error);
  }
};
