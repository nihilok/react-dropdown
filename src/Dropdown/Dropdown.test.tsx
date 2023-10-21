import React from "react";
import {render, within} from "@testing-library/react";

import Dropdown from "./Dropdown";
import {Props} from "./Dropdown.types";


describe("TestComponent", () => {
    global.ResizeObserver = require('resize-observer-polyfill');
    const renderComponent = ({toggle, children}: Partial<Props>) =>
        render(
            <Dropdown
                isOpen={true}
                onClose={() => {
                }}
                toggle={toggle || "Default heading text"}
                children={children || <div>Default content</div>}
            />
        );

    it("should render heading text correctly", () => {
        const headingText = "Some test heading";

        const {getByTestId} = renderComponent({toggle: headingText});

        // @ts-ignore
        const testComponent = getByTestId("dropdown-wrapper");

        expect(testComponent).toHaveTextContent(headingText);
    });

    it("should render content correctly", () => {
        const {getByTestId} = renderComponent({
            children: <div data-testid="some-test-content">I am test content</div>
        });

        expect(
            // @ts-ignore
            within(getByTestId("dropdown-wrapper")).queryByTestId(
            // @ts-ignore
                "some-test-content"
            )
        ).toBeInTheDocument();
    });
});
