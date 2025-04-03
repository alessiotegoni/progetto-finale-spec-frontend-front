import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme,
  Badge,
} from "@mui/material";
import {
  Home as HomeIcon,
  Favorite as FavoriteIcon,
  CompareArrows as CompareIcon,
  Menu as MenuIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { pathname } = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const favorites = useSelector((state) => state.favorites.items);

  const navItems = [
    { text: "Home", path: "/", icon: <HomeIcon /> },
    {
      text: "Preferiti",
      path: "/favorites",
      icon: <FavoriteIcon />,
      badge: favorites.length,
    },
    { text: "Confronta", path: "/comparison", icon: <CompareIcon /> },
    { text: "Crea smartphone", path: "/create", icon: <AddIcon /> },
  ];

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const isActive = (path) => pathname === path;

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            key={item.text}
            selected={isActive(item.path)}
            sx={
              isActive(item.path) && {
                backgroundColor: isActive(item.path)
                  ? theme.palette.primary.light + "50"
                  : "transparent",
                "&:hover": {
                  backgroundColor: isActive(item.path)
                    ? theme.palette.primary.light + "60"
                    : theme.palette.action.hover,
                },
              }
            }
          >
            <ListItemIcon>
              {item.badge ? (
                <Badge badgeContent={item.badge} color="secondary">
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" color="default" elevation={0}>
        <Toolbar>
          {isMobile ? (
            <>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  flexGrow: 1,
                  color: "text.primary",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                PhoneCompare
              </Typography>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  mr: 4,
                  color: "text.primary",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                PhoneCompare
              </Typography>
              <Box sx={{ flexGrow: 1, display: "flex" }}>
                {navItems.map((item) => (
                  <Button
                    key={item.text}
                    component={Link}
                    to={item.path}
                    color={isActive(item.path) ? "primary" : "inherit"}
                    sx={{
                      mx: 1,
                      borderRadius: "8px",
                      px: 2,
                      backgroundColor: isActive(item.path)
                        ? theme.palette.primary.light + "20"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isActive(item.path)
                          ? theme.palette.primary.light + "30"
                          : theme.palette.action.hover,
                      },
                    }}
                    startIcon={item.icon}
                  >
                    {item.badge ? (
                      <Badge
                        badgeContent={item.badge}
                        color="secondary"
                        sx={{ mr: 1 }}
                      >
                        {item.text}
                      </Badge>
                    ) : (
                      item.text
                    )}
                  </Button>
                ))}
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
