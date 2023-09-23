import React, { useState } from "react";
import {
  Button,
  IconButton,
  TableCell,
  TableRow,
  Typography,
  Collapse,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function DynamicTableDataRow({
  data,
  actions = [], // An array of custom action objects
}) {
  const [open, setOpen] = useState(false);

  const defaultActions = [
    {
      label: "Edit",
      icon: <EditIcon />,
      onClick: () => {
        // Default edit action
        console.log(`Editing row with ID: ${data._id}`);
      },
    },
    {
      label: "Delete",
      icon: <DeleteForeverIcon />,
      onClick: () => {
        // Default delete action
        console.log(`Deleting row with ID: ${data._id}`);
      },
      color: "red",
    },
  ];

  const allActions = [...defaultActions, ...actions]; // Combine default and custom actions

  const sanitizedData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      key === "_id" ? "" : value,
    ]),
  );

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        {Object.values(sanitizedData).map((value, index) => {
          console.log(value);
          return (
            <TableCell key={index} align="center">
              <Typography variant="body1" color="initial">
                {value}
              </Typography>
            </TableCell>
          );
        })}
        <TableCell align="center">
          {allActions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              sx={{ color: action.color || "black" }}
            >
              {action.icon} {action.label}
            </Button>
          ))}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {/* Content for collapsible row */}
            <Typography variant="body1">
              Collapsible content goes here
            </Typography>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
