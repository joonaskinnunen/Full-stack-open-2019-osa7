import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { Button, Form } from 'semantic-ui-react'

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
        <Form onSubmit={handleSubmit}>
          <input {...comment} />
          <Button type='submit'>add comment</Button>
        </Form>
        <ul>
          {comments.map(comment => <li key={comment.id}>{comment.comment}</li>)}
        </ul>
      </div>
    )
  }

  const style = {
    margin: '10px'
  }

  return (
    <div style={blogStyle}>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div className='details'>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes
        <Button style={style} onClick={() => like(blog)}>like</Button>
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