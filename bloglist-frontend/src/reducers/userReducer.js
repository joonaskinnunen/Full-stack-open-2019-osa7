export const logIn = (user) => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      user
    })
  }
}


export const logOut = (user) => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
      user
    })
  }
}

const userReducer = (state = null, action) => {
  console.log(action)
  switch (action.type) {
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export default userReducer