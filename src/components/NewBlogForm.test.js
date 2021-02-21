import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import NewBlogForm from "./NewBlogForm";

describe("render", () => {
  let createBlog;
  let component;

  beforeEach(() => {
    createBlog = jest.fn();
    const params = { createBlog };
    component = render(<NewBlogForm {...params} />);
  });

  test("renders title", () => {
    expect(component.container).toHaveTextContent("create new");
  });

  test("calls createBlog param function on submit with correct values", () => {
    const titleInput = component.container.querySelector('input[name="Title"]');
    const authorInput = component.container.querySelector(
      'input[name="Author"]'
    );
    const urlInput = component.container.querySelector('input[name="URL"]');
    const form = component.container.querySelector("form");

    fireEvent.change(titleInput, {
      target: { value: "new title" },
    });
    fireEvent.change(authorInput, {
      target: { value: "new author" },
    });
    fireEvent.change(urlInput, {
      target: { value: "new url" },
    });
    fireEvent.submit(form);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: "new title",
      author: "new author",
      url: "new url",
    });
  });
});
