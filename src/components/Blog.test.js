import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

describe("render", () => {
  const blog = {
    title: "title",
    author: "author",
    url: "url",
    likes: 1,
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
    const div = component.container.querySelector("div");
    expect(component.container).toHaveTextContent("author");
  });

  test("does not render url", () => {
    expect(component.container).not.toHaveTextContent("url");
  });

  test("does not render likes", () => {
    expect(component.container).not.toHaveTextContent(1);
  });
});
