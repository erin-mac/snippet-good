import React, { useState } from 'react'
import { connect } from 'react-redux'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import useStyles from './styles'

const FrameworkHOC = (MainComponent, Sidebar) => {
  const Framework = props => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const {
      userDetails: { isAdmin },
      history
    } = props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={`${classes.appBar} ${
            open ? `${classes.appBarShift}` : ''
          }`}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={() => setOpen(true)}
              edge="start"
              className={`${classes.menuButton} ${
                open ? `${classes.hide}` : ''
              }`}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              onClick={() => history.push(`/${isAdmin ? 'admin' : 'student'}`)}
            >
              Modern Stretches
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={() => setOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Sidebar {...props} />
        </Drawer>
        <main
          className={`${classes.content} ${
            open ? `${classes.contentShift}` : ''
          }`}
        >
          <div className={classes.drawerHeader} />
          <MainComponent />
        </main>
      </div>
    )
  }

  const mapStateToProps = ({ userDetails }) => ({ userDetails })

  return connect(mapStateToProps)(Framework)
}

export default FrameworkHOC
