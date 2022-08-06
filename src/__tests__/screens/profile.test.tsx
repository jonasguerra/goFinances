import React from "react";
import { render } from "@testing-library/react-native";
import { Profile } from "../../screens/Profile";

test("Check if user placeholder name is shown correctly", () => {
  const { getByPlaceholderText } = render(<Profile />);

  const inputName = getByPlaceholderText("Nome");

  expect(inputName.props.placeholder).toBeTruthy();
});
