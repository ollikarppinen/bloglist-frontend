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
  let removeBlog;
  let likeBlog;

  let component;

  beforeEach(() => {
    removeBlog = jest.fn();
    likeBlog = jest.fn();
    const params = { blog, removeBlog, likeBlog };
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

  test("calls likeBlog param function on blog like", () => {
    expect(likeBlog.mock.calls).toHaveLength(0);
    const showDetailsButton = component.container.querySelector(
      ".showDetailsButton"
    );
    fireEvent.click(showDetailsButton);
    const likeButton = component.container.querySelector(".likeButton");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(likeBlog.mock.calls).toHaveLength(2);
  });
});
