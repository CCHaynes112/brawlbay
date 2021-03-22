import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'

import ToggleOffIcon from '@material-ui/icons/ToggleOff'
import SettingsIcon from '@material-ui/icons/Settings'

import { Link as RouterLink } from 'react-router-dom'

import PlayerSearchBar from './PlayerSearchBar'

import logo from './assets/img/Logo-Black.png'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end'
  },

  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    minHeight: '100vh',
    width: '100vw'
    // padding: theme.spacing(3),
  },
  logoContainer: {
    textAlign: 'center'
  },

  logo: {
    lineHeight: '80px',
    '& img': {
      width: '95%',
      margin: 'auto',
      verticalAlign: 'middle',
      display: 'inline-block'
    }
  },
  drawerList: {
    paddingLeft: theme.spacing(2)
  },

  nested: {
    paddingLeft: theme.spacing(4)
  },

  iconWhite: {
    color: theme.palette.text.secondary
  }
}))

function Header (props) {
  const { container } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className={classes.logoContainer}>
        <RouterLink to='/' className={classes.logo}><img src={logo} alt='Logo' /></RouterLink>
      </div>
      <Divider />
      <List className={classes.drawerList}>
        <ListItem button component={RouterLink} to='/'>
          <ListItemText primary='Home' />
        </ListItem>
        {/* <ListItem button component={RouterLink} to="/items">
                    <ListItemText primary="Items" />
                </ListItem>
                <ListItem button component={RouterLink} to="/legends">
                    <ListItemText primary="Legends" />
                </ListItem> */}
        <ListItem>
          <ListItemText primary='Rankings' />
        </ListItem>
        <ListItem button className={classes.nested} component={RouterLink} to='/1v1leaderboard'>
          <ListItemText primary='1v1 Leaderboard' />
        </ListItem>
        <ListItem button className={classes.nested} component={RouterLink} to='/2v2leaderboard'>
          <ListItemText primary='2v2 Leaderboard' />
        </ListItem>
        {/* <ListItem button className={classes.nested} component={RouterLink} to="/clanleaderboard">
                    <ListItemText primary="Clan Leaderboard" />
                </ListItem>
                <ListItem button className={classes.nested} component={RouterLink} to="/ratings">
                    <ListItemText primary="Rating Distribution" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Community" />
                </ListItem>
                <ListItem button className={classes.nested} component={RouterLink} to="/streams">
                    <ListItemText primary="Streams" />
                </ListItem>
                <ListItem button className={classes.nested} component={RouterLink} to="/tournaments">
                    <ListItemText primary="Tournaments" />
                </ListItem>
                <ListItem button className={classes.nested} component={RouterLink} to="/videos">
                    <ListItemText primary="Videos" />
                </ListItem>
                <ListItem button className={classes.nested} component={RouterLink} to="/gifs">
                    <ListItemText primary="Gifs" />
                </ListItem> */}
        <ListItem button component={RouterLink} to='/contact'>
          <ListItemText primary='Contact' />
        </ListItem>
      </List>
    </div>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar className={classes.flexEnd}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <PlayerSearchBar filled />
          <IconButton className={classes.iconWhite}><ToggleOffIcon fontSize='large' /></IconButton>
          <IconButton className={classes.iconWhite}><SettingsIcon /></IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden mdUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        {props.children}
      </main>
    </div>
  )
}

Header.propTypes = {
  children: PropTypes.element,
  container: PropTypes.any
}

export default Header
