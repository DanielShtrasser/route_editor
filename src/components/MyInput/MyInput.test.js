import React from "react";
import "@testing-library/jest-dom" // почему setupTests.js не достаточно?
import { render, screen, fireEvent } from "@testing-library/react"
import MyInput from "./MyInput";

const fakeYmaps = {
  control: {
    SearchControl: function(opt = {}) {
      this.opt = opt;
    }}
}

describe("MyInput", () => {
  it("renders MyInput component", () => {
    render(<MyInput ymaps={fakeYmaps} />);

    expect(screen.getByPlaceholderText(/New point/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/Add point/i)).toBeInTheDocument();
  })

  it("change input", () => {
    render(<MyInput ymaps={fakeYmaps} />);

    expect(screen.getByPlaceholderText(/New point/i)).toBeEmptyDOMElement();

    fireEvent.change(screen.getByPlaceholderText(/New point/i), {
      target: {value: "test"}
    })

    expect(screen.getByDisplayValue("test")).toBeInTheDocument()
  })
})
