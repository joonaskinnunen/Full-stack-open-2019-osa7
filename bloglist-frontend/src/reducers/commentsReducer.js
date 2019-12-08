import commentsService from '../services/comments'

export const initializeComments = () => {
  return async dispatch => {
    const comments = await commentsService.getAll()
    dispatch({
      type: 'INIT_COMMENTS',
      comments
    })
  }
}

export const newComment = (commentObj) => {
  console.log(commentObj)
  return async dispatch => {
    const addedComment = await commentsService.create(commentObj)
    console.log(addedComment)
    dispatch({
      type: 'NEW_COMMENT',
      addedComment
    })
  }
}

const commentsReducer = (state = [], action) => {
  console.log(action)
  switch (action.type) {
  case 'INIT_COMMENTS':
    return action.comments
  case 'NEW_COMMENT':
    return [...state, action.addedComment]
  default: return state
  }
}

export default commentsReducer