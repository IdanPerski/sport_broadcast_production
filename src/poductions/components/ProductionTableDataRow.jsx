import {
  Button,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useProductions from "../hooks/useProductions";
import ProductionCollapsibleContent from "./ProductionCollapsibleContent";
export default function TableDataRow({ dataProp, actions = [] }) {
  const [open, setOpen] = useState(false);
  const [collapseDetails, setCollapseDetails] = useState(null);

  const {
    handleDeleteProduction,
    handleGetProduction_ForTableCollapsableContent,
    value: production,
  } = useProductions();

  const defaultActions = [
    {
      label: "",
      icon: <EditIcon />,
      onClick: () => {
        // Default edit action
        console.log(`Editing row with ID: ${dataProp._id}`);
      },
    },
    {
      label: "",
      icon: <DeleteForeverIcon />,
      onClick: () => {
        // Default delete action
        console.log(`Deleting row with ID: ${dataProp._id}`);
        // handleDeleteProduction(dataProp._id);
      },
      color: "red",
    },
  ];

  const allActions = [...defaultActions, ...actions];

  useEffect(() => {
    console.log("Production Details:", collapseDetails);
    console.log("Production :", production);
  }, [collapseDetails]);
  //
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={async () => {
              setOpen(!open);

              if (!open) {
                try {
                  await handleGetProduction_ForTableCollapsableContent(
                    dataProp._id,
                  );
                  setCollapseDetails(production.production);
                  // console.log(value.production);
                } catch (error) {
                  console.log(error);
                }
              }
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {dataProp.ascending}
        </TableCell>
        <TableCell align="center">
          <Typography variant="body1" color="initial">
            {dataProp.date}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body1" color="initial">
            {dataProp.locationName}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <div
            style={{ margin: "0 auto" }}
            dangerouslySetInnerHTML={{ __html: dataProp.weatherData }}
          />
        </TableCell>
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
            Collapsible content goes here
            <ProductionCollapsibleContent data={production} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
