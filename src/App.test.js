import React from "react";
import { render } from "@testing-library/react"
import App from './App'

describe("App", () => {
  it("render App", () => {
    const { asFragment } = render(<App />)
    expect(asFragment(<App />)).toMatchSnapshot()
  })
})
