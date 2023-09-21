import {
  Button,
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
export default function TableDataRow({ data, deleteRow }) {
  const [open, setOpen] = useState(false);
  /* ascending: "#",
    date: "Date",
    location: "Location",
    whether: "Whether", */
  //   useEffect(() => {}, []);

  const { handleDeleteProduction } = useProductions();
  const deletePorduction = (id) => {
    deleteRow();
    console.log(data._id);
    handleDeleteProduction(data._id);
  };

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
        <TableCell component="th" scope="row">
          {data.ascending}
        </TableCell>
        <TableCell align="center">
          <Typography variant="body1" color="initial">
            {data.date}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body1" color="initial">
            {data.locationName}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <div
            style={{ margin: "0 auto" }}
            dangerouslySetInnerHTML={{ __html: data.weatherData }}
          />
        </TableCell>
        <TableCell
          align="center"
          sx={
            {
              // display: "flex",
              // justifyContent: "space-around",
              // margin: "15px auto",
              // width: "60%",
            }
          }
        >
          <Button onClick={() => console.log("Edit")} sx={{ color: "black" }}>
            <EditIcon />
          </Button>

          <Button onClick={deletePorduction} sx={{ color: "red" }}>
            <DeleteForeverIcon />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
