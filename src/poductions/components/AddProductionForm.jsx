import React, { useCallback, useEffect } from "react";
import DynamicSelectInput from "../../forms/components/DynamicSelectInput";
import Form from "../../forms/components/Form";
import { func, object, string } from "prop-types";
import DateInput from "../../forms/components/DateInput";
import { Grid, Typography } from "@mui/material";
// import AddField from "../../forms/components/AddField";
import MultiSelect from "../../forms/components/MultiSelect";
import useFakeData from "../../hooks/useFakeData";
import formatNameToCamelCase from "../../forms/helpers/formatNameToCamelCase ";

const AddProductionForm = ({
  onSubmit,
  onReset,
  errors,
  onInputChange,
  onFormChange,
  data,
  title,
  date,
}) => {
  const { callFakeData, fakeValue } = useFakeData();

  const { isLoading, fakeUsers, fakeProdType, fakeLocations } = fakeValue;

  const fitRolesToName = (optionsArray, roleName) => {
    let personRoleArray = [];
    optionsArray.map((person) => {
      const { roles } = person;
      roles.map((role) => {
        if (role.role === formatNameToCamelCase(roleName)) {
          const personFitsToRole = {
            fullName: `${person.firstName} ${person.lastName}`,
            _id: person._id,
            key: role._id + " " + person._id,
          };

          personRoleArray.push(personFitsToRole);
        }
      });
    });

    return !personRoleArray ? null : personRoleArray;
  };

  useEffect(() => {
    callFakeData();
  }, []);

  //   {
  //     name: "Football",
  //     _id: "11",
  //   },
  //   { name: "Basketball", _id: "22" },
  // ];

  // const fakeUsers = [
  //   {
  //     firstName: "John",
  //     lastName: "Doe",
  //     _id: "1Abc",
  //   },
  //   {
  //     firstName: "Jane",
  //     lastName: "Smith",
  //     _id: "21Abc",
  //   },
  //   {
  //     firstName: "Mike",
  //     lastName: "Johnson",
  //     _id: "33Abc",
  //   },
  //   {
  //     firstName: "Emily",
  //     lastName: "Williams",
  //     _id: "44Abc",
  //   },
  //   {
  //     firstName: "David",
  //     lastName: "Brown",
  //     _id: "5Abc",
  //   },
  //   {
  //     firstName: "Sophia",
  //     lastName: "Miller",
  //     _id: "61Abc",
  //   },
  //   {
  //     firstName: "William",
  //     lastName: "Taylor",
  //     _id: "7Abc",
  //   },
  //   {
  //     firstName: "Olivia",
  //     lastName: "Davis",
  //     _id: "82Abc",
  //   },
  //   {
  //     firstName: "James",
  //     lastName: "Anderson",
  //     _id: "9Abc",
  //   },
  //   {
  //     firstName: "Emma",
  //     lastName: "Martinez",
  //     _id: "10Abc",
  //   },
  // ];

  // const location = [
  //   {
  //     _id: "e4t",
  //     city: "Tel Aviv",
  //     name: "Menora Mivtachim Arena",
  //   },
  //   {
  //     _id: "a1p",
  //     city: "Jerusalem",
  //     name: "Payis Arena",
  //   },
  //   {
  //     _id: "a6r",
  //     city: "Haifa",
  //     name: "Ramat Gan Stadium",
  //   },
  //   {
  //     _id: "t7t",
  //     city: "Beersheba",
  //     name: "Turner Stadium",
  //   },
  //   {
  //     _id: "i6e",
  //     city: "Eilat",
  //     name: "Eilat Municipal Stadium",
  //   },
  //   {
  //     _id: "n8n",
  //     city: "Netanya",
  //     name: "Netanya Stadium",
  //   },
  //   {
  //     _id: "h1y",
  //     city: "Ashdod",
  //     name: "Yud-Alef Stadium",
  //   },
  //   {
  //     _id: "e7r",
  //     city: "Rishon LeZion",
  //     name: "Maccabi Electra Tel Aviv Arena",
  //   },
  //   {
  //     _id: "o2t",
  //     city: "Holon",
  //     name: "Toto Holon Arena",
  //   },
  //   {
  //     _id: "t5h",
  //     city: "Petah Tikva",
  //     name: "HaMoshava Stadium",
  //   },
  // ];

  return (
    <Form
      onSubmit={onSubmit}
      onReset={onReset}
      errors={errors}
      onChange={onFormChange}
      styles={{ maxWidth: "800px" }}
      formTitle={title}
    >
      <DateInput
        error={errors.date}
        onSubmit={onSubmit}
        onChange={date}
        data={data}
        name="date"
      />

      <DynamicSelectInput
        name="type"
        label="type"
        error={errors.type}
        onChange={onInputChange}
        data={data}
        sm={6}
        options={fakeProdType}
      />
      <DynamicSelectInput
        name="location"
        label="location"
        error={errors.location}
        onChange={onInputChange}
        data={data}
        sm={6}
        options={fakeLocations}
      />

      <Typography
        variant="body1"
        color="initial"
        sx={{ textAlign: "center", width: "100%", mt: 1 }}
      >
        Field crew:
      </Typography>

      <Grid container spacing={0} sx={{ mt: 5 }}>
        <Grid item xs={12}>
          <MultiSelect
            options={fitRolesToName(fakeUsers, "Producer")}
            onChange={onInputChange}
            name={"Producer"}
            data={data}
          />
        </Grid>
      </Grid>

      <Grid container spacing={0} sx={{ mt: 5 }}>
        <Grid item xs={12}>
          <MultiSelect
            options={fitRolesToName(fakeUsers, "Technician")}
            onChange={onInputChange}
            name={"Technician"}
            data={data}
          />
        </Grid>
      </Grid>

      <Grid container spacing={0} sx={{ mt: 5 }}>
        <Grid item xs={12}>
          <MultiSelect
            options={fitRolesToName(fakeUsers, "Camera Operators")}
            onChange={onInputChange}
            name={"Camera Operators"}
            data={data}
          />
        </Grid>
      </Grid>

      <Typography
        variant="body1"
        color="initial"
        sx={{ textAlign: "center", width: "100%", mt: 1 }}
      >
        Control crew:
      </Typography>

      <DynamicSelectInput
        name="director"
        label="director"
        error={errors.type}
        onChange={onInputChange}
        data={data}
        sm={6}
        options={fitRolesToName(fakeUsers, "Director")}
      />

      <DynamicSelectInput
        name="Vision Mixer Operator"
        label="Vision Mixer Operator"
        error={errors.type}
        onChange={onInputChange}
        data={data}
        sm={6}
        options={fitRolesToName(fakeUsers, "Vision Mixer Operator")}
      />

      <DynamicSelectInput
        name="cg"
        label="CG"
        error={errors.type}
        onChange={onInputChange}
        data={data}
        sm={6}
        options={fitRolesToName(fakeUsers, "cg")}
      />
      <DynamicSelectInput
        name="Editor"
        label="Editor"
        error={errors.type}
        onChange={onInputChange}
        data={data}
        sm={6}
        options={fitRolesToName(fakeUsers, "Editor")}
      />

      <DynamicSelectInput
        name="Audio Engineer"
        label="Audio Engineer"
        error={errors.type}
        onChange={onInputChange}
        data={data}
        sm={6}
        options={fitRolesToName(fakeUsers, "Audio Engineer")}
      />

      <Grid container spacing={0} sx={{ mt: 3 }}>
        <Grid item xs={9}>
          <MultiSelect
            options={fitRolesToName(fakeUsers, "vtr")}
            onChange={onInputChange}
            name={"vtr"}
            data={data}
          />
        </Grid>
      </Grid>

      <Typography
        variant="body1"
        color="initial"
        sx={{ textAlign: "center", width: "100%", mt: 1 }}
      >
        Talents:
      </Typography>

      <Grid container spacing={0} sx={{ mt: 1 }}>
        <Grid item xs={10}>
          <MultiSelect
            options={fitRolesToName(fakeUsers, "Talent")}
            onChange={onInputChange}
            name={"Talents"}
            data={data}
          />
        </Grid>
      </Grid>
    </Form>
  );
};

AddProductionForm.propTypes = {
  onSubmit: func.isRequired,
  onReset: func.isRequired,
  errors: object.isRequired,
  onFormChange: func.isRequired,
  onInputChange: func.isRequired,
  data: object.isRequired,
  title: string.isRequired,
};

export default React.memo(AddProductionForm);
