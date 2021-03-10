import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import Login from "./index";
import { act } from "react-dom/test-utils";

global.MutationObserver = class {
    constructor(callback) { }
    disconnect() { }
    observe(element, initObject) { }
};
test("Login form test", () => {
    render(<Login />);
    const loginButton = screen.getByText(/Signin/i);
    const usernameInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    passwordInput.value = "cityslicka"
    usernameInput.value = "eve.holt@reqres.in"
    act(() => {
        fireEvent.click(loginButton)

    })

});
