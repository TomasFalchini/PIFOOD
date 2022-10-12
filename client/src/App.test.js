import { render, screen } from "@testing-library/react";
import App from "./App";
import NavBar from "./components/Nav Bar/NavBar.jsx";

test("renders learn react link", () => {
  render(<NavBar />);
  const linkElement = screen.getByText(/HOME/i);
  expect(linkElement).toBeInTheDocument();
});
