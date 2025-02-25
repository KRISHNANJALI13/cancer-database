import React from "react";
import { useLocation } from "react-router-dom";
import { Typography, Container, Card, CardContent } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Result() {
  const location = useLocation();
  const reportData = location.state || {};

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            AI Report Result
          </Typography>
          {Object.keys(reportData).length > 0 ? (
            Object.entries(reportData).map(([key, value]) => (
              <Typography key={key} variant="body1">
                <strong>{key}:</strong> {value}
              </Typography>
            ))
          ) : (
            <Typography variant="body1">No data available.</Typography>
          )}
        </CardContent>
      </Card>
    </Container>
    </DashboardLayout>
    
  );
}

export default Result;
