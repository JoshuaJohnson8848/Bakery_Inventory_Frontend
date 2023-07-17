import * as React from 'react';
import './TopBar.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import { grey } from '@mui/material/colors';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddIcon from '@mui/icons-material/Add';

function TopBar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div className="h-full sideBar-color">
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate('/users');
              }}
            >
              <ListItemIcon>
                <PeopleOutlineIcon sx={{ color: grey[50] }} />
              </ListItemIcon>
              <ListItemText primary={'Users'} className="white-bg" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate('/products');
              }}
            >
              <ListItemIcon>
                <ProductionQuantityLimitsOutlinedIcon
                  sx={{ color: grey[50] }}
                />
              </ListItemIcon>
              <ListItemText primary={'Products'} className="white-bg" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate('/admins');
              }}
            >
              <ListItemIcon>
                <AdminPanelSettingsOutlinedIcon sx={{ color: grey[50] }} />
              </ListItemIcon>
              <ListItemText primary={'Admins'} className="white-bg" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate('/advances');
              }}
            >
              <ListItemIcon>
                <AccountBalanceOutlinedIcon sx={{ color: grey[50] }} />
              </ListItemIcon>
              <ListItemText primary={'Advances'} className="white-bg" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate('/add-user');
              }}
            >
              <ListItemIcon>
                <PersonAddIcon sx={{ color: grey[50] }} />
              </ListItemIcon>
              <ListItemText primary={'Add User'} className="white-bg" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate('/add-product');
              }}
            >
              <ListItemIcon>
                <AddIcon sx={{ color: grey[50] }} />
              </ListItemIcon>
              <ListItemText primary={'Add Product'} className="white-bg" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Box>
    </div>
  );

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                setState({ ...state, ['left']: open });
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Bakery
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </Box>

      <div>
        {['left', 'right', 'top', 'bottom'].map((anchor) => (
          <React.Fragment key={anchor}>
            {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default TopBar;
