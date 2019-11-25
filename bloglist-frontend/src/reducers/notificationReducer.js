export const newNotification = (message, notificationType, time) => {
    return async dispatch => {
        dispatch({
            type: 'setNotification',
            notificationType,
            message,
            time
        })
        setTimeout(() => {
            dispatch({
                type: 'clearNotification'
            })
        }, time)
    }
}

const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'setNotification':
            return {
                message: action.message,
                notificationType: action.notificationType,
                time: action.time
            }
        case 'clearNotification':
            return null
        default: return state
    }
}

export default notificationReducer