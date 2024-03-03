import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import layoutOptions from "./layoutOptions";
import { logout, verify } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../assets/logo.png";
import { Image } from "semantic-ui-react";
const drawerWidth = 240;

function Layout(props) {
  const { window } = props;
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [activeTab, setactiveTab] = useState(null);
  const auth = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dashboard, setdashboard] = useState(null);

  useEffect(() => {
    if (auth.data && !auth.data.data && localStorage.getItem("token")) {
      dispatch(verify());
    }
    if (auth.data && auth.data.data && auth.data.data.user) {
      const user = auth.data.data.user.role;
      let dashboardLocal = layoutOptions.filter(
        (option) => option.role === user
      );
      if (dashboardLocal && dashboardLocal.length > 0) {
        setdashboard(dashboardLocal[0]);
      }
      return;
    }
    setdashboard(layoutOptions[0]);
  }, [auth.data]);

  const handleChange = (event) => {};

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const drawer = (
    <div style={{ margin: "-30px auto" }}>
      <Toolbar />
      <List>
        {dashboard &&
          dashboard.actions &&
          dashboard.actions.map((option, index) => (
            <ListItem
            style={{padding:'10px'}}
              selected={activeTab === index}
              button
              key={index}
              onClick={() => {
                setactiveTab(index)
                history.push(option.route);
              }}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText primary={option.label} />
            </ListItem>
          ))}
      </List>
      <Divider />
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}>
            <Typography variant="h6" noWrap component="div">
              {dashboard && dashboard.title}
            </Typography>
            {auth.isSuccess ? (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit">
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}>
                  <MenuItem
                    onClick={() => {
                      dispatch(logout());
                      localStorage.removeItem("token");
                      history.push("/login");
                    }}>
                    <span style={{ display: "flex", verticalAlign: "middle" }}>
                      <LogoutIcon color="error" /> Log Out
                    </span>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button variant="contained">Login</Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}>
]
          <Image
            src={logo}
            alt="image"
            width="100px"
            style={{ margin: "0 auto", marginTop: "10px" }}
          />
          <strong style={{ margin: "2px auto" }}>Security Wire </strong>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open>
          <img
            src={logo}
            alt='logo'
            width="100px"
            style={{ margin: "0 auto", marginTop: "10px" }}
          />
          <strong style={{ margin: "2px auto" }}>Security Wire </strong>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          // background:'black',
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

export default Layout;
