import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("render", () => {
  const blog = {
    title: "title",
    author: "author",
    url: "url",
    likes: 123,
    id: "id",
  };
  const removeBlog = () => {};
  const likeBlog = () => {};
  const params = { blog, removeBlog, likeBlog };

  let component;

  beforeEach(() => {
    component = render(<Blog {...params} />);
  });

  test("renders title", () => {
    expect(component.container).toHaveTextContent("title");
  });

  test("renders author", () => {
    expect(component.container).toHaveTextContent("author");
  });

  test("does not render url", () => {
    expect(component.container).not.toHaveTextContent("url");
  });

  test("does not render likes", () => {
    expect(component.container).not.toHaveTextContent(1);
  });

  test("after clicking the button, url and likes are displayed", () => {
    const button = component.container.querySelector(".showDetailsButton");
    fireEvent.click(button);

    expect(component.container).toHaveTextContent("url");
    expect(component.container).toHaveTextContent(123);
  });
});
