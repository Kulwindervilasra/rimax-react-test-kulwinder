import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import Profile from "./index";
import { act } from "react-dom/test-utils";

global.MutationObserver = class {
    constructor(callback) { }
    disconnect() { }
    observe(element, initObject) { }
};
test("Profile form test", () => {
    render(<Profile />);
    const submitButton = screen.getByText(/Update/i);
    const emailInput = screen.getByPlaceholderText('Email')
    const firstName = screen.getByPlaceholderText('First Name')
    const lastName = screen.getByPlaceholderText('Last Name')
    firstName.value = "cityslicka"
    lastName.value = "cityslicka"
    emailInput.value = "eve.holt@reqres.in"
    act(() => {
        fireEvent.click(submitButton)
    })

});

test("Profile fail case", () => {
    render(<Profile />);
    const submitButton = screen.getByText(/Update/i);
    act(() => {
        fireEvent.click(submitButton)
    })

});
