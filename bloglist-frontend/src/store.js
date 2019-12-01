import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import commentsReducer from './reducers/commentsReducer';

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer,
    comments: commentsReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store