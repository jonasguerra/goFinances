import React from "react";
import { render } from "@testing-library/react-native";
import { Profile } from "../../screens/Profile";

describe("Profile tests", () => {
  it("Check if user placeholder name is shown correctly", () => {
    //capturar com o placeholder
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText("Nome");

    expect(inputName).toBeTruthy();
  });

  it("Check if user data has been loaded", () => {
    //utilizando o testID no componente
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId("input-name");
    const inputSurname = getByTestId("input-surname");

    expect(inputName.props.value).toEqual("Jonas");
    expect(inputSurname.props.value).toEqual("Guerra");
  });

  it("Checks if title render correctly", () => {
    const { debug, getByTestId } = render(<Profile />);

    const textTitle = getByTestId("text-title");
    expect(textTitle.props.children).toContain("Profile");
  });
});
