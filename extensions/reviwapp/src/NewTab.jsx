import "@shopify/ui-extensions/preact";
import { render } from "preact";

export default async () => {
    render(<NewTab />, document.body)
}


function NewTab() {
    return (
        <>
            <s-stack direction="block">
                <s-image src="https://www.shutterstock.com/image-photo/traveler-woman-arms-raised-triumph-260nw-2457990309.jpg" />
                <s-stack>
                    <s-heading>Heading</s-heading>
                    <s-text type="small">Description</s-text>
                </s-stack>
                <s-button
                    onClick={() => {
                        console.log('button was pressed');
                    }}
                >
                    Button
                </s-button>
            </s-stack>
            <s-section>
                <s-box>
                    <s-text>
                        WelCome to Judge.me
                    </s-text>
                </s-box>
                <s-box>
                    <s-button>
                        Last 30 Days
                    </s-button>
                    <s-button>
                        Last 30 Days
                    </s-button>
                </s-box>
            </s-section>
        </>
    );
}
