import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useUserProfile } from '../../../common/apiHooks';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const profile = useUserProfile();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  };


  return (
    <div className={classes.root}>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Rimax React Test
          </Typography>

          <div>
            <IconButton
              aria-label="User"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >

              <Avatar src={profile?.avatar} />

            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}> <Link
                to={"/profile"}
              >
                Profile
          </Link></MenuItem>
              <MenuItem onClick={handleClose}><Link
                to={"/users"}
              >
                List Users
          </Link></MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>

            </Menu>
          </div>

        </Toolbar>
      </AppBar>
    </div>
  );
}
