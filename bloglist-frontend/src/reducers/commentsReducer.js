import commentsService from '.././services/comments'

export const initializeComments = () => {
    return async dispatch => {
        const comments = await commentsService.getAll()
        dispatch({
            type: 'INIT_COMMENTS',
            comments
        })
    }
}

const commentsReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_COMMENTS':
            return action.comments
        default: return state
    }
}

export default commentsReducer