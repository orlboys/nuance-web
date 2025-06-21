"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Tooltip,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  Home,
  Login,
  PersonAdd,
  Dashboard,
  Settings,
  Logout,
} from "@mui/icons-material";
import { useUser } from "@/lib/hooks/useUser";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

interface NavigationBarProps {
  userName?: string;
  userAvatar?: string;
}

export default function NavigationBar({
  userName = "",
  userAvatar = "",
}: NavigationBarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading } = useUser(); // useUser hook to get user info.
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });
  const router = useRouter();

  const onLogin = () => {
    router.push("/login");
  };

  const onSignup = () => {
    router.push("/signup");
  };

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
    }
    setAnchorEl(null); // Close the menu after logout
    router.push("/"); // Redirect to dashboard or home after logout
  };

  const isLoggedIn = !loading && !!user; // Determine logged-in state based on user hook

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigationItems = !isLoggedIn
    ? [{ label: "Home", href: "/", icon: <Home /> }]
    : [
        { label: "Home", href: "/", icon: <Home /> },
        { label: "Dashboard", href: "/dashboard", icon: <Dashboard /> },
      ];

  const MobileMenu = () => (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
      sx={{
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          Nuance
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Ethical Bias Detection
        </Typography>
      </Box>
      <Divider />
      <List>
        {navigationItems.map((item) => (
          <ListItem
            key={item.label}
            component={Link}
            href={item.href}
            onClick={handleMobileMenuToggle}
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemIcon sx={{ color: theme.palette.primary.main }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {!isLoggedIn ? (
          <>
            <ListItem
              onClick={() => {
                handleMobileMenuToggle();
                onLogin?.();
              }}
              sx={{ cursor: "pointer" }}
            >
              <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                <Login />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem
              onClick={() => {
                handleMobileMenuToggle();
                onSignup?.();
              }}
              sx={{ cursor: "pointer" }}
            >
              <ListItemIcon sx={{ color: theme.palette.secondary.main }}>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="Sign Up" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              component={Link}
              href="/dashboard"
              onClick={handleMobileMenuToggle}
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              component={Link}
              href="/settings"
              onClick={handleMobileMenuToggle}
            >
              <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem
              onClick={() => {
                onLogout?.();
              }}
              sx={{ cursor: "pointer" }}
            >
              <ListItemIcon sx={{ color: theme.palette.error.main }}>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: isMobile ? 1 : 0,
              fontWeight: "bold",
              mr: 4,
              cursor: "pointer",
            }}
          >
            <Box
              component={Link}
              href="/"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              Nuance
            </Box>
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  component={Link}
                  href={item.href}
                  startIcon={item.icon}
                  sx={{
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "rgba(144, 202, 249, 0.08)",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Account Section */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {!isLoggedIn ? (
                <>
                  <Button
                    color="primary"
                    onClick={onLogin}
                    startIcon={<Login />}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onSignup}
                    startIcon={<PersonAdd />}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Tooltip title="Account settings">
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      {userAvatar ? (
                        <Avatar
                          src={userAvatar}
                          sx={{ width: 32, height: 32 }}
                        />
                      ) : (
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: theme.palette.primary.main,
                          }}
                        >
                          {userName ? (
                            userName.charAt(0).toUpperCase()
                          ) : (
                            <AccountCircle />
                          )}
                        </Avatar>
                      )}
                    </IconButton>
                  </Tooltip>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                      sx: {
                        backgroundColor: theme.palette.background.paper,
                        backgroundImage: "none",
                      },
                    }}
                  >
                    {userName && (
                      <MenuItem disabled>
                        <Typography variant="body2" color="text.secondary">
                          Signed in as {userName}
                        </Typography>
                      </MenuItem>
                    )}
                    {userName && <Divider />}
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      href="/dashboard"
                      sx={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Dashboard
                        sx={{ mr: 1, color: theme.palette.primary.main }}
                      />
                      Dashboard
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      href="/settings"
                      sx={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Settings
                        sx={{ mr: 1, color: theme.palette.primary.main }}
                      />
                      Settings
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        onLogout?.();
                      }}
                    >
                      <Logout sx={{ mr: 1, color: theme.palette.error.main }} />
                      Logout
                    </MenuItem>
                  </Menu>
                </Box>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <MobileMenu />
    </>
  );
}
