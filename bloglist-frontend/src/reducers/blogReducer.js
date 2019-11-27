import blogService from '.././services/blogs'

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            blogs
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const likedBlog = { ...blog, likes: blog.likes + 1 }
        const updatedBlog = await blogService.update(likedBlog)
        dispatch({
            type: 'LIKE_BLOG',
            updatedBlog
        })
        console.log(updatedBlog)

    }
}

export const addBlog = (blog) => {
    return async dispatch => {
        const addedBlog = await blogService.create(blog)
        dispatch({
            type: 'ADD_BLOG',
            addedBlog
        })
    }
}

export const deleteBlog = (blog) => {
    return async dispatch => {
        await blogService.remove(blog)
        dispatch({
            type: 'DELETE_BLOG',
            blog
        })
    }
}

const blogReducer = (state = [], action) => {
    console.log(action)
    switch (action.type) {
        case 'ADD_BLOG':
            return [...state, action.addedBlog]
        case 'LIKE_BLOG':
            return state.map(b => b.id === action.updatedBlog.id ? action.updatedBlog : b)
        case 'INIT_BLOGS':
            return action.blogs
        case 'DELETE_BLOG':
            return state.filter(b => b.id !== action.blog.id)
        default: return state
    }
}

export default blogReducer