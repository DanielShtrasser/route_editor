import React from "react";
import "@testing-library/jest-dom" // почему setupTests.js не достаточно?
import { render, screen } from "@testing-library/react"
import Point from './Point'


test("Point render", () => {
  render(<Point point={{id: 1, title: "test"}} />)

  expect(screen.getByTestId('point')).toBeInTheDocument()
})
