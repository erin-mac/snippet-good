import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles(() => ({
  activeItemColor: {
    color: 'dodgerblue'
  }
}))

const sidebarLinks = [
  { text: 'Open Stretches', path: '/student/stretches/open' },
  { text: 'Submitted Stretches', path: '/student/stretches/submitted' }
]

const StudentSidebar = ({ history, location: { pathname } }) => {
  const { activeItemColor } = useStyles()

  return (
    <Fragment>
      <List>
        {sidebarLinks.map(link => (
          <ListItem
            button
            key={link.text}
            onClick={() => history.push(link.path)}
          >
            <ListItemText
              primary={link.text}
              className={pathname === link.path ? activeItemColor : ''}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Account Information'].map(text => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Fragment>
  )
}

export default StudentSidebar
