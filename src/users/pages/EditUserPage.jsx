import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Box, Container, TextField } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import { useUser } from "../providers/UserProvider";
import useUsers from "../hooks/useUsers";
import DisplayUserDetails from "../components/DisplayUserDetails";
import camelCaseToRegular from "../../helpers/camelCaseToRegular";

export default function EditUserPage() {
  const { userId } = useParams();
  const { handleGetMember, value } = useUsers();
  const [userToEdit, setUserToEdit] = useState();

  const { member } = value;

  useEffect(() => {
    handleGetMember(userId);
  }, []);

  const { user } = useUser();

  if (member.name) {
    const { firstName, lastName } = member.name;
    const { name, contact } = member;

    const { email, phoneNumber } = member.contact;
    const memberContact = {
      email: email,
      phoneNumber: phoneNumber,
    };

    return (
      <Container>
        <PageHeader
          title="User Details"
          subtitle={`${firstName} ${lastName}`}
        />
        <DisplayUserDetails displayData={name} />
        <DisplayUserDetails displayData={contact.address} />
        <DisplayUserDetails displayData={memberContact} />
        <Typography variant="body1" color="initial">
          Roles:
        </Typography>
        {member.roles.map((role, i) => {
          return (
            <Box key={i}>
              {camelCaseToRegular(role.role)}
              <Typography variant="body1" color="initial">
                Rate:
              </Typography>
              <TextField value={role.rate} />
            </Box>
          );
        })}
      </Container>
    );
  }
}
