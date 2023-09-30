import React from "react";
import { func, object, string } from "prop-types";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import ROUTES from "../../routes/routesModel";
import MultiSelect from "../../forms/components/MultiSelect";
import { Box, Typography } from "@mui/material";
import DynamicSelectInput from "../../forms/components/DynamicSelectInput";

const RegisterForm = ({
  onSubmit,
  onReset,
  onFormChange,
  title,
  errors,
  data,
  onInputChange,
  setData,
}) => {
  const RolesArray = [
    "Audio Engineer",
    "Director",
    "Editor",
    "VTR",
    "CG",
    "Camera Operator",
    "Technician",
    "Producer",
    "Talent",
  ];
  return (
    <Form
      onSubmit={onSubmit}
      onReset={onReset}
      onChange={onFormChange}
      styles={{ maxWidth: "800px" }}
      title={title}
      to={ROUTES.ROOT}
    >
      <Grid container>
        <Grid
          container
          spacing={1}
          sx={{ border: "solid 2px", m: 1, p: 1, pb: 2 }}
        >
          <Typography sx={{ m: 1, fontSize: "1.3em", width: "100%" }}>
            Personal Details:
          </Typography>

          <Input
            name="first"
            label="First name"
            error={errors.first}
            onChange={onInputChange}
            data={data}
            sm={6}
          />

          <Input
            name="last"
            label="Last name"
            error={errors.last}
            onChange={onInputChange}
            data={data}
            sm={6}
          />
        </Grid>

        <Grid
          container
          spacing={1}
          sx={{ border: "solid 2px", m: 1, p: 1, pb: 2 }}
        >
          <Typography sx={{ m: 1, fontSize: "1.3em", width: "100%" }}>
            Contact:
          </Typography>

          <Input
            label="Country"
            name="country"
            error={errors.country}
            onChange={onInputChange}
            data={data}
            sm={6}
          />
          <Input
            name="city"
            label="City"
            error={errors.city}
            onChange={onInputChange}
            data={data}
            sm={6}
          />

          <Input
            name="street"
            label="Street"
            error={errors.street}
            onChange={onInputChange}
            data={data}
            sm={8}
          />
          <Input
            name="streetNumber"
            label="Street Number"
            type="number"
            error={errors.houseNumber}
            onChange={onInputChange}
            data={data}
            sm={4}
          />

          <Input
            name="phone"
            label="Phone"
            type="phone"
            error={errors.phone}
            onChange={onInputChange}
            data={data}
            sm={8}
          />
          <Input
            name="email"
            label="Email"
            type="email"
            error={errors.email}
            onChange={onInputChange}
            data={data}
            sm={8}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        sx={{ border: "solid 2px", m: 1, p: 1, pb: 2 }}
      >
        <Typography sx={{ m: 1, fontSize: "1.3em", width: "100%" }}>
          Roles:
        </Typography>
        <DynamicSelectInput
          name="role"
          label="Role"
          error={errors.role}
          onChange={onInputChange}
          data={data}
          sm={8}
          options={RolesArray}
        />
        <Input
          name="rate"
          label="Rate"
          type="number"
          error={errors.rate}
          onChange={onInputChange}
          data={data}
          sm={4}
        />
      </Grid>

      {/*      <Input
        name="zip"
        label="zip"
        error={errors.zip}
        onChange={onInputChange}
        data={data}
        sm={6}
        required={false}
      /> */}
      {/* <Grid item> */}
      {/* <FormControlLabel
          onChange={(e) => {
            setData({ ...data, isBusiness: !!e.target.checked });
          }}
          name="isBusiness"
          control={<Checkbox value={data.isBusiness} color="primary" />}
          label="Signup as business"
        /> */}
      {/* </Grid> */}
    </Form>
  );
};

RegisterForm.propTypes = {
  onSubmit: func.isRequired,
  onReset: func.isRequired,
  onFormChange: func.isRequired,
  title: string.isRequired,
  errors: object.isRequired,
  data: object.isRequired,
  onInputChange: func.isRequired,
  setData: func.isRequired,
};

export default React.memo(RegisterForm);
