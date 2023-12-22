import React, { useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { Divider, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { blue } from "@mui/material/colors";

import PropTypes from "prop-types";
import NavBarLink from "../../../routes/components/NavBarLink";
import ROUTES from "../../../routes/routesModel";
import { useUser } from "../../../users/providers/UserProvider";
import { useNavigate } from "react-router-dom";
import useUsers from "../../../users/hooks/useUsers";

export default function SideDrawer({ drawerWidth, sideBarTitle }) {
  const { user } = useUser();

  const { handleLogout } = useUsers();
  const menuArray = ["Home", "Add Production", "Add Member", "Login"];
  const navigate = useNavigate();
  const setMenuListItemButton = (title, navigteTo, key) => {
    if (title === "Logout")
      return (
        <ListItem key={key} disablePadding>
          <ListItemButton onClick={onLogout}>
            <NavBarLink to={ROUTES.LOGIN_PAGE}>{title}</NavBarLink>
          </ListItemButton>
        </ListItem>
      );

    return (
      <ListItem key={key} disablePadding>
        <ListItemButton>
          <NavBarLink to={navigteTo}>{title}</NavBarLink>
        </ListItemButton>
      </ListItem>
    );
  };

  const onLogout = () => {
    console.log("onLogout");
    handleLogout();

    // navigate(ROUTES.LOGIN_PAGE);
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
              case "Home":
                return user
                  ? setMenuListItemButton(menuItem, ROUTES.ROOT, i)
                  : null;
              case "Add Member":
                return user && user.isAdmin
                  ? setMenuListItemButton(menuItem, ROUTES.REGISTER, i)
                  : null;

              case "Add Production":
                return user && user.isAdmin
                  ? setMenuListItemButton(menuItem, ROUTES.ADD_PROD, i)
                  : null;
              case "Members":
                return setMenuListItemButton(menuItem, ROUTES.MEMBERS, i);

              case "Login":
                return !user
                  ? setMenuListItemButton(menuItem, ROUTES.LOGIN_PAGE, i)
                  : setMenuListItemButton("Logout", ROUTES.LOGIN_PAGE, i);

              default:
                return (
                  <ListItem key={menuItem} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={menuItem} />
                    </ListItemButton>
                  </ListItem>
                );
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
