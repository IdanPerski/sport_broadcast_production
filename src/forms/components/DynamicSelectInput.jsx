import React, { useEffect } from "react";
import { string, bool, object, func, array } from "prop-types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { makeFirstLetterCapital } from "../utils/algoMethods";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import adjustOptionsToSelectValue from "../../helpers/adjustOptionsToSelectValue";

const DynamicSelectInput = ({
  variant,
  name,
  data,
  label,
  required,
  error,
  onChange,
  options,
  ...rest
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  console.log(options);
  useEffect(() => {
    adjustOptionsToSelectValue(options);
  }, [selectedValue, options]);

  return (
    <Grid item xs={12} {...rest}>
      <FormControl fullWidth variant={variant}>
        <InputLabel>{makeFirstLetterCapital(label)}</InputLabel>

        <Select
          id={name}
          name={name}
          value={selectedValue}
          required={required}
          error={Boolean(error)}
          onChange={onChange}
        >
          {options?.map((item) => {
            return (
              <MenuItem
                value={item}
                key={item._id}
                onClick={() => setSelectedValue(item)}
              >
                {item.name || item.fullName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Grid>
  );
};

DynamicSelectInput.propTypes = {
  name: string.isRequired,
  required: bool.isRequired,
  variant: string,
  data: object,
  label: string,
  error: string,
  onChange: func.isRequired,
  options: array.isRequired,
};

DynamicSelectInput.defaultProps = {
  required: true,
  variant: "outlined",
};

export default DynamicSelectInput;
