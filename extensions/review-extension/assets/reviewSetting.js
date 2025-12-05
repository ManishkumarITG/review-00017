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

  const reviewSetting = getColorSetting();

  const stars = document.getElementsByClassName("jm-heading");
  console.log(stars, "heading of the page");
  console.log(reviewSetting.color[0], "color");

  Array.from(stars).forEach((element) => {
    console.log(element, "➖➖➖➖");
    element.style.color = reviewSetting.color[0];
  });
});
