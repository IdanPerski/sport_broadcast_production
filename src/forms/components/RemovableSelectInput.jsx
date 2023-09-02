import React, { useEffect } from "react";
import { string, bool, object, func, array } from "prop-types";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { makeFirstLetterCapital } from "../utils/algoMethods";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import adjustOptionsToSelectValue from "../../helpers/adjustOptionsToSelectValue";
import formatNameToCamelCase from "../helpers/formatNameToCamelCase ";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";

const RemovableSelectInput = ({
  variant,
  name,
  data,
  label,
  required,
  error,
  onChange,
  options,
  index,
  removeInput,
  ...rest
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  adjustOptionsToSelectValue(options);

  useEffect(() => {
    adjustOptionsToSelectValue(options);
    console.log("remove effect");
  }, [data, selectedValue]);

  return (
    <Grid container>
      <Grid item xs={8} {...rest}>
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
                  value={item._id}
                  key={item._id}
                  onClick={() => setSelectedValue(item._id)}
                >
                  {item.name || item.fullName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={4}>
        <Button
          onClick={() => {
            removeInput(index, name);
          }}
        >
          <GroupRemoveIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

RemovableSelectInput.propTypes = {
  name: string.isRequired,
  required: bool.isRequired,
  variant: string,
  data: array,
  label: string,
  error: string,
  onChange: func.isRequired,
  options: array.isRequired,
};

RemovableSelectInput.defaultProps = {
  required: true,
  variant: "outlined",
};

export default RemovableSelectInput;
