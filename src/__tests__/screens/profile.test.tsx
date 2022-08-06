import React from "react";
import { render } from "@testing-library/react-native";
import { Profile } from "../../screens/Profile";

test("Check if user placeholder name is shown correctly", () => {
  const { debug } = render(<Profile />);

  debug();
});
