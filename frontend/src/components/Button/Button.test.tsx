import { fireEvent, render } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
    it("renders button with custom class", () => {
        const { getByText } = render(
            <Button className="custom-button">Click me</Button>
        );
        const button = getByText("Click me");
        expect(button.className).toContain("custom-button");
    });

    it("calls onClick when button is clicked", () => {
        const onClickMock = jest.fn();
        const { getByText } = render(
            <Button onClick={onClickMock}>Click me</Button>
        );
        const button = getByText("Click me");
        fireEvent.click(button);
        expect(onClickMock).toHaveBeenCalled();
    });

    it("matches snapshot", () => {
        const { container } = render(<Button>Click me</Button>);
        expect(container).toMatchSnapshot();
    });
});