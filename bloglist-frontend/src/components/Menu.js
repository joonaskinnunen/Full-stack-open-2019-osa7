import React from 'react'
import {
  Link
} from 'react-router-dom'
import { Menu as MenuUi } from 'semantic-ui-react'

const Menu = ({ user, handleLogOut }) => {
  return (
    <MenuUi tabular>
      <MenuUi.Item link>
        <Link to='/'>blogs</Link>
      </MenuUi.Item>
      <MenuUi.Item>
        <Link to='/users' data-cy='users'>users</Link>
      </MenuUi.Item>
      <MenuUi.Item>
        {user.name + ' logged in'}
        <button onClick={handleLogOut} data-cy='logout'>logout</button>
      </MenuUi.Item>
    </MenuUi>
  )
}

export default Menu