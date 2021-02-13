import React, { useState } from "react"

import blogsService from "./../services/blogs"

const Blog = ({ blog, setBlogs, blogs }) => {
  const { title, author, url, likes } = blog
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const blogDetails = () => (
    <div>
      <div>{url}</div>
      <div>
        {likes}
        <button onClick={onLike}>like</button>
      </div>
      <div>{author}</div>
    </div>
  )

  const onLike = async () => {
    const updatedBlog = await blogsService.put({
      ...blog,
      likes: blog.likes + 1,
    })
    setBlogs(
      blogs
        .map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
        .sort((a, b) => b.likes - a.likes)
    )
  }

  return (
    <div style={blogStyle}>
      {title} {author}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide" : "view"}
      </button>
      {showDetails && blogDetails()}
    </div>
  )
}

export default Blog
