import { IconButton, TableCell, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getFakeData } from "../../poductions/services/productionsApiService";
import { Height } from "@mui/icons-material";
export default function Row(props) {
  // console.log(props);
  const { row } = props;
  const [open, setOpen] = useState(false);
  /* ascending: "#",
    date: "Date",
    location: "Location",
    whether: "Whether", */
  //   useEffect(() => {}, []);

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
          {row.ascending}
        </TableCell>
        {console.log(row)}
        <TableCell align="center">
          <Typography variant="body1" color="initial">
            {row.date}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body1" color="initial">
            {row.locationName}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <div
            style={{ margin: "0 auto" }}
            dangerouslySetInnerHTML={{ __html: row.weatherData }}
          />
        </TableCell>
        {/* <TableCell align="center">{}</TableCell> */}
      </TableRow>
    </>
  );
}
