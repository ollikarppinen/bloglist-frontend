import React, { useState } from "react"

const Blog = ({ blog }) => {
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
        <button>like</button>
      </div>
      <div>{author}</div>
    </div>
  )

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
