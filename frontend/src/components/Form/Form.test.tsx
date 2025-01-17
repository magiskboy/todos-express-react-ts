import { render, fireEvent } from "@testing-library/react";
import { Form } from "./Form";
import { Input } from "./Input";
import { Button } from "../Button";

describe("Form", () => {
  it("renders without crashing", () => {
    const result = render(<Form />);
    expect(result).toMatchSnapshot();
  });

  it("calls the onSubmit function when the form is submitted", () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<Form onSubmit={onSubmit} />);
    const form = getByTestId("form");
    fireEvent.submit(form);
    expect(onSubmit).toHaveBeenCalled();
  });

  it("updates the input value when the user types", () => {
    const { getByTestId } = render(
      <Form>
        <Input type="text" />
        <Button type="submit">Submit</Button>
      </Form>
    );
    const input = getByTestId("input") as HTMLInputElement;
    const submitBtn = getByTestId("button") as HTMLButtonElement;
    fireEvent.change(input, { target: { value: "New todo" } });
    fireEvent.click(submitBtn);
    expect(input.value).toBe("New todo");
  });
});
