import { render } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe("Spinner component", () => {
  it("renders without crashing", () => {
    const { container } = render(<Spinner />);
    expect(container).toMatchSnapshot();
  });

  it("renders the spinner element", () => {
    const { getByTestId } = render(<Spinner />);
    const spinnerElement = getByTestId("spinner");
    expect(spinnerElement).toBeDefined();
  });
});
