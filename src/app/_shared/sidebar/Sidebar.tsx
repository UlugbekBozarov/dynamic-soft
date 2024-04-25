import React, { FC, Fragment } from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListSubheader,
  Toolbar,
} from "@mui/material";
import { get } from "lodash";

import ListItem from "./ListItem";
import { Users } from "@/assets/icons";

const DrawerContend = () => {
  // const handleCloseUserMenu = (item: SettingsItemType) => () => {
  //   switch (get(item, "id")) {
  //     case "logout": {
  //       clearCookie();
  //       window.location.href = get(item, "link");
  //       break;
  //     }
  //     default: {
  //       navigate(get(item, "link"));
  //     }
  //   }
  //   setAnchorElUser(null);
  // };

  return (
    <Fragment>
      <Toolbar sx={{ height: "64px" }} />
      <Divider />
      <Box height="calc(100vh - 190px)" sx={{ overflowY: "auto" }}>
        <List subheader={<ListSubheader>Main menu</ListSubheader>}>
          {[
            {
              id: "users",
              link: "/users",
              // disabled: true,
              labelKey: "Users",
              icon: <Users />,
            },
          ].map((item) => (
            <ListItem item={item} key={get(item, "id")} />
          ))}
        </List>
      </Box>
      <Box height="152px">
        <List subheader={<ListSubheader>Preference</ListSubheader>}>
          {[
            {
              id: "settings",
              disabled: true,
              link: "/settings",
              labelKey: "Settings",
              //   icon: <Settings />,
            },
            {
              id: "logout",
              disabled: true,
              link: "/logout",
              labelKey: "Logout",
              //   icon: <Logout />,
            },
          ].map((item) => (
            <ListItem item={item} key={get(item, "id")} />
          ))}
        </List>
      </Box>
    </Fragment>
  );
};

interface SidebarProps {
  drawerWidth?: number;
  open?: boolean;
  onClose?: () => void;
}

const Sidebar: FC<SidebarProps> = ({ drawerWidth = 280, open, onClose }) => {
  return (
    <Fragment>
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <DrawerContend />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        <DrawerContend />
      </Drawer>
    </Fragment>
  );
};

export default Sidebar;
