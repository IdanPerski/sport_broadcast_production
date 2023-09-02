import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemovableSelectInput from "./RemovableSelectInput";
import { useEffect } from "react";
import formatNameToCamelCase from "../helpers/formatNameToCamelCase ";

export default function AddField({
  inputName,
  error,
  onInputChange,
  data,
  options,
}) {
  const [removableInputs, setRemovableInputs] = useState([]);
  const [nextInputKey, setNextInputKey] = useState(0);

  const removeInput = (keyToRemove, inputName) => {
    const dataKey = formatNameToCamelCase(inputName);
    // console.log(data[dataKey]);
    console.log(removableInputs);
    // onInputChange(null, removableInputs[nextInputKey]);
    setRemovableInputs((prev) => {
      return prev.filter((input) => input.key !== keyToRemove + "");
    });
  };

  const addInput = () => {
    let newInputKey = nextInputKey;
    console.log(newInputKey);
    setNextInputKey((prevKey) => prevKey + 1);
    const newInput = (
      <RemovableSelectInput
        sx={{ width: "100%" }}
        name={inputName}
        label={inputName}
        error={error}
        onChange={onInputChange}
        data={data[inputName]}
        sm={6}
        index={newInputKey}
        key={newInputKey}
        options={options}
        removeInput={removeInput}
      />
    );
    console.log(newInput.key);
    console.log(nextInputKey);

    setRemovableInputs((prevInputs) => [...prevInputs, newInput]);
  };

  useEffect(() => {
    console.log(data, "checking data updates");
    console.log(removableInputs);
  }, [data, removableInputs]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Button onClick={addInput} sx={{ maxWidth: "15%", maxHeight: "30px" }}>
        <AddCircleOutlineIcon />
      </Button>

      <Box sx={{ width: "70%" }}>
        {removableInputs?.map((input, i) => {
          return <Box key={input.key}>{input}</Box>;
        })}
      </Box>
    </Box>
  );
}
