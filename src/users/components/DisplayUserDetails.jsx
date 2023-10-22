import {
  Box,
  Card,
  CardHeader,
  ListItemText,
  Avatar,
  List,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { login } from "../services/usersApiService";
import camelCaseToRegular from "../../helpers/camelCaseToRegular";

export default function DisplayUserDetails({ displayData }) {
  return (
    <>
      <Card
        sx={{
          height: "100%",
        }}
      >
        <Box width={"100%"} display="flex" flexDirection="column">
          {/* <CardHeader
            sx={{ margin: "0 auto" }}
            avatar={
              <Avatar
                sx={{
                  height: "8rem",
                  width: "8rem",
                  display: "flex",
                  alignItems: "center",

                  fontSize: "3.5rem",
                }}
                // src="/assets/images/avatar.png"
              ></Avatar>
            }
          /> */}

          <List sx={{ textAlign: "center" }}>
            {Object.entries(displayData).map(([key, value]) => {
              if (key !== "password") {
                return (
                  <ListItemText
                    key={key}
                    primary={camelCaseToRegular(key)}
                    secondary={camelCaseToRegular(value)}
                  />
                );
              }
            })}
          </List>
        </Box>
      </Card>
    </>
  );
}

DisplayUserDetails.propTypes = {
  displayData: PropTypes.object.isRequired,
};
