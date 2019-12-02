import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

const Blog = ({ blog, like, remove, user, comments, createComment }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  }
  if (blog === undefined) {
    return null
  }

  const creator = blog.user.username === user.username

  const Comments = () => {
    const [comment, commentReset] = useField('text')

    const handleSubmit = (event) => {
      event.preventDefault()
      createComment({
        comment: comment.value,
        blogId: blog.id
      })
      commentReset()

    }

    return (
      <div>
        <h3>comments</h3>
        <form onSubmit={handleSubmit}>
          <input {...comment} />
          <button type='submit'>add comment</button>
        </form>
        <ul>
          {comments.map(comment => <li key={comment.id}>{comment.comment}</li>)}
        </ul>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div className='details'>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes
        <button onClick={() => like(blog)}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
        {creator && (<button onClick={() => remove(blog)}>remove </button>)}
        <Comments />
      </div>
    </div>
  )
}


Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

export default Blog