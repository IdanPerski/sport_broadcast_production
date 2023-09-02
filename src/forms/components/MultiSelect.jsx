import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import adjustOptionsToSelectValue from "../../helpers/adjustOptionsToSelectValue";
import formatNameToCamelCase from "../helpers/formatNameToCamelCase ";

export default function MultiSelect({ name, options, onChange, data }) {
  const _name = formatNameToCamelCase(name);
  const currentDataForThisKeyValue = data[_name];

  const getNames = (value) => {
    let singleName;
    options
      .filter((item) => currentDataForThisKeyValue.includes(item._id))
      .map((item) => {
        if (value === item._id) {
          singleName = item.fullName;
        }
      });
    return singleName;
  };

  const [selectedValue, setSelectedValue] = useState([]);
  adjustOptionsToSelectValue(options);

  const checkingData = (value) => {
    if (handleChipDelete.length > 0) setSelectedValue(value);
  };

  const handleChipDelete = (value) => {
    const updatedSelectedValue = currentDataForThisKeyValue.filter(
      (item) => item !== value,
    );
    setSelectedValue((prev) => updatedSelectedValue);
    onChange(createCustomTarget([value]));
  };

  const createCustomTarget = (customValue) => {
    console.log(customValue);
    const customTarget = {
      target: {
        name: name, // Use the name of the MultiSelect
        value: customValue, // Use the filtered IDs
      },
    };

    return customTarget;
  };
  useEffect(() => {
    checkingData(selectedValue);
  }, [data, onChange, handleChipDelete]);
  return (
    <>
      <FormControl sx={{ m: 1, width: "70%" }}>
        <InputLabel>{name}</InputLabel>
        <Select
          multiple
          value={selectedValue}
          name={name}
          onChange={() => onChange(createCustomTarget(selectedValue))}
          input={<OutlinedInput label={name} />}
          renderValue={() => {
            return (
              <Stack gap={1} direction="row" flexWrap="wrap">
                {currentDataForThisKeyValue?.map((value, i, arr) => {
                  const nameValue = getNames(value);
                  return (
                    <Chip
                      key={value}
                      label={nameValue}
                      onDelete={() => handleChipDelete(value)}
                      deleteIcon={
                        <CancelIcon
                          onMouseDown={(event) => event.stopPropagation()}
                        />
                      }
                    />
                  );
                })}
              </Stack>
            );
          }}
        >
          {options?.map((item) => (
            <MenuItem
              value={item._id}
              key={item._id}
              sx={{ justifyContent: "space-between" }}
              onClick={() => {
                setSelectedValue((prev) => {
                  prev.splice(0, 1, item);

                  return prev;
                });
              }}
            >
              {item.name || item.fullName}
              {currentDataForThisKeyValue?.includes(item) ? (
                <CheckIcon color="info" />
              ) : null}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
