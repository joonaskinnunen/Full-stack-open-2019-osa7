import React from 'react'
import { useField } from '../hooks'
import { Form, Button } from 'semantic-ui-react'

const NewBlog = (props) => {
  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    props.createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    })
    titleReset()
    authorReset()
    urlReset()
  }

  return (
    <div>
      <h2>create new</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Field>
          title:
          <input {...title} />
        </Form.Field>
        <Form.Field>
          author:
          <input {...author} />
        </Form.Field>
        <Form.Field>
          url:
          <input {...url} />
        </Form.Field>
        <Button type='submit'>create</Button>
      </Form>
    </div>
  )
}

export default NewBlog