"use client";

import { Menu } from "@/assets/icons";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import React, { FC } from "react";

interface NavbarProps {
  drawerWidth?: number;
  onOpen?: () => void;
}

const Navbar: FC<NavbarProps> = ({ drawerWidth = 240 }) => {
  return (
    <AppBar
      component="nav"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center">
          <IconButton
            color="inherit"
            sx={{
              display: { md: "none" },
              mr: 2,
            }}
          >
            <Menu />
          </IconButton>
        </Box>
        <Box width="100%" display="flex" justifyContent="flex-end">
          {/* <Language /> */}
          {/* <Fullscreen /> */}
          {/* <Mode /> */}
          {/* <Users /> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
