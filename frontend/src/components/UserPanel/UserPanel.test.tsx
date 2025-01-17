import { render, fireEvent } from "@testing-library/react";
import { UserPanel } from "./UserPanel";
import type { User } from "../../types";

describe("UserPanel", () => {
  let user: User;

  beforeEach(() => {
    user = {
      id: "1",
      profile: "https://example.com/profile",
      name: "John Doe",
      email: "user@test.com",
    };
  });

  it("renders user name", () => {
    const { getByText } = render(<UserPanel user={user} />);
    expect(getByText(user.name)).toBeDefined();
  });

  it("renders default profile image when profile is not provided", () => {
    const { getByAltText } = render(<UserPanel user={{ name: "Jane Doe" }} />);
    expect(getByAltText("Default Profile")).toBeDefined();
  });

  it("renders custom profile image when profile is provided", () => {
    const { getByAltText } = render(<UserPanel user={user} />);
    expect(getByAltText("User Profile")).toBeDefined();
  });

  it("calls onClickProfile when profile is clicked", () => {
    const onClickProfile = jest.fn();
    const { getByAltText } = render(
      <UserPanel user={user} onClickProfile={onClickProfile} />
    );
    fireEvent.click(getByAltText("User Profile"));
    expect(onClickProfile).toHaveBeenCalled();
  });
});
