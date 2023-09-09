import React, { useEffect } from "react";
import AddProductionForm from "../components/AddProductionForm";
import initialProductionForm from "../helpers/initialForms/initialProductionForm";
import productionSchema from "../models/joi-schema/productionSchema";
import normalizeProduction from "../helpers/normalization/normalizeProduction";
import useProductions from "../hooks/useProductions";
import useForm from "../../forms/hooks/useForm";
// import testCallServer from "../hooks/useProductions";
// import ROUTES from "../../routes/routesModel";

export default function AddProduction() {
  const { handleSetProductionCrew } = useProductions();

  const { value, ...rest } = useForm(
    initialProductionForm,
    productionSchema,
    () => {
      const newProduction = {
        ...normalizeProduction(value.data),
        user_id: "admin", //TODO- bring user details to the relevant page and send them to the server
      };

      handleSetProductionCrew(newProduction);
    },
  );

  useEffect(() => {
    // testCallServer();
    return console.log(value);
  }, [value]);
  return (
    <AddProductionForm
      title={"add production"}
      onSubmit={rest.onSubmit}
      onReset={rest.handleReset}
      errors={value.errors}
      onFormChange={rest.validateForm}
      onInputChange={rest.handleChange}
      date={rest.handleDateInput}
      data={value.data}
    />
  );
}
