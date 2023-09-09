import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import adjustOptionsToSelectValue from "../../helpers/adjustOptionsToSelectValue";
import formatNameToCamelCase from "../helpers/formatNameToCamelCase ";

export default function MultiSelect({ name, options, onChange, data }) {
  const _name = formatNameToCamelCase(name);

  const currentData = data[_name];

  // const getNames = (value) => {
  //   let singleName;
  //   options
  //     .filter((item) => !currentData.includes(item._id))
  //     .map((currentDataItem) => {
  //       if (value._id === currentDataItem._id) {
  //         singleName = currentDataItem.fullName;
  //       }
  //     });
  //   return singleName;
  // };

  const [selectedValue, setSelectedValue] = useState([]);
  adjustOptionsToSelectValue(options);

  const checkingData = (value) => {
    if (handleChipDelete.length > 0) setSelectedValue(value);
  };

  const handleChipDelete = (value) => {
    const updatedSelectedValue = currentData.filter((item) => item !== value);
    setSelectedValue((prev) => updatedSelectedValue);
    onChange(createCustomTarget([value]));
  };

  const createCustomTarget = (value) => {
    const customTarget = {
      target: {
        name: name, // Use the name of the MultiSelect
        value: [{ fullName: value[0].fullName, _id: value[0]._id }],
      },
    };

    return customTarget;
  };
  useEffect(() => {
    checkingData(selectedValue);
  }, [data, onChange, handleChipDelete, _name, selectedValue]);
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
                {currentData?.map((value) => {
                  console.log(value);
                  // const nameValue = getNames(value);
                  // console.log(value, nameValue, "value");
                  return (
                    <Chip
                      key={value._id}
                      label={value.fullName}
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
          {options?.map((item) => {
            // console.log(item);
            return (
              <MenuItem
                value={item._id}
                key={item.key || item._id}
                sx={{ justifyContent: "space-between" }}
                onClick={() => {
                  setSelectedValue((prev) => {
                    console.log(prev, "prev");
                    prev.splice(0, 1, item);

                    return prev;
                  });

                  console.log(selectedValue, "selected");
                }}
              >
                {item.name || item.fullName}
                {/* {console.log(currentData, _name)} */}
                {/* {console.log(currentData, _name)} */}
                {currentData.map((obj) => {
                  if (obj._id === item._id) {
                    return <CheckIcon color="info" key={item.key} />;
                  } else {
                    return null;
                  }
                })}

                {/* {currentData?.includes(item._id) ? (
                 
                ) : null} */}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
}
