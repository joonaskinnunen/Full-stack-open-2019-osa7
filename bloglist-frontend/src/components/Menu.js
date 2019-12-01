import React from 'react'
import {
    Link
} from 'react-router-dom'

const Menu = ({ user, handleLogOut }) => {
    const style = {
        backgroundColor: 'lightgrey',
        padding: '5px',
        borderRadius: '4px'
    }
    return (
        <div style={style}>
            <Link to='/'>blogs</Link><span> </span>
            <Link to='/users'>users</Link><span> </span>
            {user.name + ' logged in'}<span> </span>
            <button onClick={handleLogOut}>logout</button>
        </div>
    )
}

export default Menu