import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import "./App.css"
import Togglable from "./components/Togglable"
import NewBlogForm from "./components/NewBlogForm"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setErrorMessage("Wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem("loggedBlogAppUser")
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification className="error" message={errorMessage} />
      <Notification className="success" message={message} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const createBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(createdBlog))
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => setMessage(null), 5000)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <Notification className="error" message={errorMessage} />
      <Notification className="success" message={message} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>log out</button>
      </p>
      <Togglable
        showButtonLabel="new note"
        hideButtonLabel="cancel"
        ref={blogFormRef}
      >
        <NewBlogForm createBlog={createBlog} />
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} />
        ))}
      </div>
    </div>
  )

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogList()}
    </div>
  )
}

const Notification = ({ message, ...props }) => {
  if (message === null) {
    return null
  }

  return <div {...props}>{message}</div>
}

export default App
