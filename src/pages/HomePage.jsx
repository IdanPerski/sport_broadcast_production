import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import PageHeader from "../components/PageHeader";
import useProductions from "../poductions/hooks/useProductions";

import Row from "../components/Table/Row";

export default function HomePage() {
  const { handleGetProductionsForMainTable, value } = useProductions();
  useEffect(() => {
    console.log("useEffect HomePage");
    handleGetProductionsForMainTable();
  }, []);
  // const { date, location, wheather } = value.productions;
  const productionsMainTableValues = value.productions;

  // const TextDate
  return (
    <Container>
      <PageHeader title="Home Page" subtitle="Next Productions" />
      <TableContainer component={Paper} sx={{ width: "85%", marginX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell sx={{ width: "5%", textAlign: "center" }}>#</TableCell>
              <TableCell align="center">
                <Typography>Date</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>Location</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>Whether</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>Operations</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productionsMainTableValues?.map((production) => {
              return <Row key={production._id} row={production} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
