import React, { useState } from "react";

import PropTypes from "prop-types";

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const onBlogCreate = async (event) => {
    event.preventDefault();
    createBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onBlogCreate}>
        <div>
          title
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id="url"
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="submit-new-blog" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default NewBlogForm;
