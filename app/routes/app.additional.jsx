// import { Text } from "@shopify/polaris";
import { BlockStack, Box, Icon, InlineGrid, InlineStack, Text } from "@shopify/polaris";
import PublishingAndModeration from "./components/PublishingAndModeration";

export default function AdditionalPage() {


  // async function tryal() {
  //   try {
  //     const response = await fetch('/api/routes/reviewproduct/reviews', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (!response.ok) throw new Error("API offline");

  //     const data = await response.json();
  //     console.log("CardData fetch successfully", data);
  //     return data;

  //   } catch (error) {
  //     console.log("Error in Fetching data in Deshboard Cards", error);



  //     console.log("CardData", carddata);
  //     return carddata;
  //   }
  // }
  // tryal()
  return (
    <>
      <s-page heading="Additional page">
        <s-section heading="Multiple pages">
          <s-paragraph>
            The app template comes with an additional page which demonstrates
            how to create multiple pages within app navigation using{" "}
            <s-link
              href="https://shopify.dev/docs/apps/tools/app-bridge"
              target="_blank"
            >
              App Bridge
            </s-link>
            .
          </s-paragraph>
          <s-paragraph>
            To create your own page and have it show up in the app navigation,
            add a page inside <code>app/routes</code>, and a link to it in the{" "}
            <code>&lt;ui-nav-menu&gt;</code> component found in{" "}
            <code>app/routes/app.jsx</code>.
          </s-paragraph>



        </s-section>
        <s-section slot="aside" heading="Resources">
          <s-unordered-list>
            <s-list-item>
              <s-link
                href="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
                target="_blank"
              >
                App nav best practices
              </s-link>









            </s-list-item>
          </s-unordered-list>
        </s-section>
      </s-page>
    </>
  );
}
