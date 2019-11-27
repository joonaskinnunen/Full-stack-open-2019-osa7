import React, { useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { newNotification } from './reducers/notificationReducer'
import { addBlog, initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import { logIn, logOut } from './reducers/userReducer'
import { connect } from 'react-redux'

const App = (props) => {
  const [username] = useField('text')
  const [password] = useField('password')

  useEffect(() => {
    const initializeBlogs = props.initializeBlogs
    initializeBlogs()
  }, [props.initializeBlogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    const logIn = props.logIn
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      logIn(user)
      blogService.setToken(user.token)
    }
  }, [props.logIn])

  const notify = (message, notificationType, time) => {
    props.newNotification(message, notificationType, time)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      props.logIn(user)
    } catch (exception) {
      notify('wrong username of password', 'error', 5000)
    }
  }

  const handleLogout = () => {
    props.logOut()
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const createBlog = async (blog) => {
    props.addBlog(blog)
    notify(`a new blog ${blog.title} by ${blog.author} added`, 'success', 5000)
  }

  const likeBlog = async (blog) => {
    props.likeBlog(blog)
    notify(`blog ${blog.title} by ${blog.author} liked!`, 'success', 5000)
  }

  const removeBlog = async (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      props.deleteBlog(blog)
      notify(`blog ${blog.title} by ${blog.author} removed!`, 'success', 5000)
    }
  }

  if (props.user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
            <input {...username} />
          </div>
          <div>
            salasana
            <input {...password} />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
  }

  const newBlogRef = React.createRef()

  const byLikes = (b1, b2) => b2.likes - b1.likes
  console.log(props.blogs)
  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>{props.user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel='create new' ref={newBlogRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      {props.blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          like={likeBlog}
          remove={removeBlog}
          user={props.user}
          creator={blog.user.username === props.user.username}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  newNotification,
  addBlog,
  initializeBlogs,
  likeBlog,
  deleteBlog,
  logIn,
  logOut
}

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default connectedApp