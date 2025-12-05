document.addEventListener("DOMContentLoaded", async () => {
  const getColorSetting = async () => {
    try {
      const baseUrl = window.location.origin;

      const res = await fetch(
        `${baseUrl}/apps/review//api/routes/app/setting/getByTitle`,
        {
          method: "POST",
          body: JSON.stringify({
            title: "Review Widget Setting",
          }),
        },
      );
      //   console.log(res, "response");/

      const resData = await res.json();
      //   console.log(resData, "resdata");
      const data = resData.data.sectionSettings;
      //   console.log("data", data);

      return data;
    } catch (error) {
      console.log("color setting fetch error", error);
      return { messeage: error.messeage, data: null };
    }
  };

  const reviewSetting = await getColorSetting();
  console.log(reviewSetting);

  // Apply colors
  reviewSetting.color.forEach((item) => {
    document.querySelectorAll(`.${item.type}`).forEach((el) => {
      if (item.type === "button") el.style.backgroundColor = item.isvalue;
      else el.style.color = item.isvalue;
    });
  });

  reviewSetting.color.forEach((item) => {
    document.querySelectorAll(`.${item.type}`).forEach((el) => {
      if (item.type === "star") el.style.color = item.isvalue;
      else el.style.color = item.isvalue;
    });
  });

  // Apply text
  reviewSetting.text.forEach((item) => {
    document
      .querySelectorAll(`[data-setting="${item.settingName}"]`)
      .forEach((el) => (el.textContent = item.isvalue));
  });

  // Apply theme
  reviewSetting.theme.forEach((item) => {
    document
      .querySelectorAll(`[data-setting="${item.settingName}"]`)
      .forEach((el) => {
        el.style.display = item.isChecked ? "block" : "none";
      });
  });
});
