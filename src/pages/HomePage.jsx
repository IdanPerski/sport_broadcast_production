import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import PageHeader from "../components/PageHeader";
import useProductions from "../poductions/hooks/useProductions";

// import Row from "../components/Table/Row";
import ProductionTableDataRow from "../poductions/components/ProductionTableDataRow";
import TableHeadRow from "../poductions/components/TableHeadRow";
import ROUTES from "../routes/routesModel";
import { Navigate } from "react-router-dom";
import { useUser } from "../users/providers/UserProvider";
// import DynamicTableDataRow from "../components/table/DynamicTableDataRow";

export default function HomePage() {
  const { handleGetProductionsForMainTable, value } = useProductions();
  useEffect(() => {
    console.log("useEffect HomePage");
    handleGetProductionsForMainTable();
  }, []);

  const handleDelete = (id) => {
    console.log("handeling delete from homePage,delete:", id);
    // handleGetProductionsForMainTable();
  };
  // const { date, location, wheather } = value.productions;
  const tableHeadArray = ["Date", "Location", "Weather", "Actions"];
  const productionsMainTableValues = value.productions;

  // const { user } = useUser();

  // if (!user) return <Navigate replace to={ROUTES.LOGIN_PAGE} />;
  return (
    <Container>
      <PageHeader title="Home Page" subtitle="Next Productions" />
      <TableContainer
        component={Paper}
        sx={{ width: "85%", margin: "auto" }}
        elevation={2}
      >
        <Table sx={{ bgcolor: "#B9B4C7" }}>
          <TableHeadRow tableHeadArray={tableHeadArray} />
          <TableBody>
            {!value.error ? (
              productionsMainTableValues?.map((production) => {
                return (
                  <ProductionTableDataRow
                    key={production._id}
                    dataProp={production}
                  />
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                  <Typography variant="body1" color="red">
                    No Connection to Productions API. Please contact
                    administrators.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
