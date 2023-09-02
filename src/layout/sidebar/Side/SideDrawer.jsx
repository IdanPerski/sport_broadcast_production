import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { blue } from "@mui/material/colors";

import PropTypes from "prop-types";
import NavBarLink from "../../../routes/components/NavBarLink";
import ROUTES from "../../../routes/routesModel";
// import NavBarLink from "../../routes/components/NavBarLink";

export default function SideDrawer({ drawerWidth, sideBarTitle }) {
  const menuArray = ["Home", "Add Production", "Calender", "Members"];
  //   const drawerWidth = width;

  const setMenuListItemButton = (title, navigteTo, key) => {
    return (
      <ListItem key={key} disablePadding>
        <ListItemButton>
          {/* <ListItemText primary={title} /> */}
          <NavBarLink to={navigteTo}>{title}</NavBarLink>
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          [`& .MuiDrawer-paper`]: {
            boxSizing: "border-box",
            backgroundColor: blue[100],
            width: drawerWidth,
            flexShrink: 0,
          },
        }}
      >
        <List>
          <ListItemButton>
            <ListItemText primary={sideBarTitle} />
            {/* <NavBarLink></NavBarLink> */}
          </ListItemButton>

          <Divider />

          {menuArray.map((menuItem, i) => {
            switch (menuItem) {
              case "Add Production":
                return setMenuListItemButton(menuItem, ROUTES.ADD_PROD, i);
                break;

              default:
                return (
                  <ListItem key={menuItem} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={menuItem} />
                      {/* <NavBarLink to={ROUTES.ADD_PROD}>{menuItem}</NavBarLink> */}
                    </ListItemButton>
                  </ListItem>
                );
                break;
            }
          })}
        </List>
      </Drawer>
    </>
  );
}

SideDrawer.propTypes = {
  drawerWidth: PropTypes.string.isRequired,
};
