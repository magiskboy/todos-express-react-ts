import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  it("renders without crashing", () => {
    const result = render(<Input />);
    expect(result).toMatchSnapshot();
  });

  it("renders with the correct placeholder", () => {
    const placeholder = "Enter your name";
    const { getByPlaceholderText } = render(
      <Input placeholder={placeholder} />
    );
    const inputElement = getByPlaceholderText(placeholder);
    expect(inputElement).toBeDefined();
  });

  it("calls the onChange callback when input value changes", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<Input onChange={onChange} />);
    const inputElement = getByTestId("input") as HTMLInputElement;
    const inputValue = "Test input value";
    fireEvent.change(inputElement, { target: { value: inputValue } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(inputElement.value).toBe(inputValue);
  });

  it("forwards the ref to the input element", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeDefined();
  });
});
