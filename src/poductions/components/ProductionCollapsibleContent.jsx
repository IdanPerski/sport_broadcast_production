import React, { useState } from "react";
import { Tabs, Tab, Paper, TableContainer } from "@mui/material";

function ProductionCollapsibleContent({ data }) {
  console.log(data.production);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const tableBackgroundColor = "#B9B4C7"; // Replace with your desired table background color
  data.production ? (
    <TableContainer component={Paper} sx={{ bgcolor: tableBackgroundColor }}>
      {data.production.type}
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Crew Members" />
        <Tab label="Equipment" />
        <Tab label="Schedule" />
      </Tabs>
      {activeTab === 0 && <div>{/* Display crew members in a table */}</div>}
      {activeTab === 1 && <div>{/* Display equipment details */}</div>}
      {activeTab === 2 && <div>{/* Display production schedule */}</div>}
    </TableContainer>
  ) : (
    console.log("?")
  );
}

export default ProductionCollapsibleContent;
