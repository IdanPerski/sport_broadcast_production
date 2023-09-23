import { Box, Grid } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import useForm from "../../forms/hooks/useForm";
import ROUTES from "../../routes/routesModel";
import UserForm from "../components/UserForm";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import useUsers from "../hooks/useUsers";
import signupSchema from "../models/joi-schema/signupSchema";
import { useUser } from "../providers/UserProvider";

export default function SignupPage() {
  // const user = true;

  const { handleSignup } = useUsers();

  const { value, ...rest } = useForm(
    initialSignupForm,
    signupSchema,
    handleSignup,
  );

  const { user } = useUser();
  if (user) return <Navigate replace to={ROUTES.CARDS} />;
  return (
    <>
      <Box
        sx={{
          margin: "0 auto",
          width: "75%",
        }}
      >
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <UserForm
            onSubmit={rest.onSubmit}
            onReset={rest.handleReset}
            onFormChange={rest.validateForm}
            title={"Signup Form"}
            errors={value.errors}
            onInputChange={rest.handleChange}
            setData={rest.setData}
            data={value.data}
          />
        </Grid>
      </Box>
    </>
  );
}

/*   import { Container } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import useForm from "../../forms/hooks/useForm";
import ROUTES from "../../routes/routesModel";
import UserForm from "../components/UserForm";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import signupSchema from "../models/joi-schema/signupSchema";

export default function SignupPage() {
  // const user = true;

  // if (user) return <Navigate replace to={ROUTES.CARDS} />;
  const handleSignup = () => {
    console.log("signup successful");
  };

  const { value, ...rest } = useForm(
    initialSignupForm,
    signupSchema,
    handleSignup
  );

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UserForm
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        onFormChange={rest.validateForm}
        title="register form"
        errors={value.errors}
        data={value.data}
        onInputChange={rest.handleChange}
        setData={rest.setData}
      />
    </Container>
  );
} */
