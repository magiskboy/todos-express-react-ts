import { render, fireEvent } from "@testing-library/react";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders without errors", () => {
    const checkbox = render(
      <Checkbox>
        <div>Hi!</div>
      </Checkbox>
    );
    expect(checkbox).toMatchSnapshot();
  });

  it("renders children correctly", () => {
    const { getByText } = render(
      <Checkbox>
        <div>Checkbox Label</div>
      </Checkbox>
    );
    expect(getByText("Checkbox Label")).toBeDefined();
  });

  it("renders unchecked by default", () => {
    const { container } = render(<Checkbox />);
    expect(container.className).not.toContain("checked");
  });

  it("renders checked when 'checked' prop is true", () => {
    const { getByTestId } = render(<Checkbox checked />);
    const checkbox = getByTestId("checkbox");
    expect(checkbox.className).toContain("checked");
  });

  it("calls onChange callback when clicked", () => {
    const onChange = jest.fn();
    const { container } = render(<Checkbox onChange={onChange} />);
    fireEvent.click(container.firstElementChild!);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
